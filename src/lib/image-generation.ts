/**
 * 阿里百炼Flux-schnell模型文生图服务
 * 使用官方API异步调用方式
 */

// 环境变量
const API_KEY = process.env.DASHSCOPE_API_KEY;
// 阿里百炼API基础URL
const API_URL = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text2image/image-synthesis';
const TASK_URL = 'https://dashscope.aliyuncs.com/api/v1/tasks/';

export interface ImageGenerationParams {
  prompt: string;
  size?: string;
  negativePrompt?: string;
}

export interface GeneratedImage {
  url: string;
  width: number;
  height: number;
  id?: string;
}

export interface GenerationResult {
  success: boolean;
  images: GeneratedImage[];
  error?: string;
  taskId?: string;
}

// 定义API返回的结果类型
interface TaskResult {
  url: string;
  // 添加其他可能的字段
}

/**
 * 转换尺寸格式，从"1024x1024"转换为"1024*1024"
 * 如果已经是正确格式则直接返回
 */
function formatSize(size: string | undefined): string {
  if (!size) return '1024*1024';
  
  // 如果已经包含*，则直接返回
  if (size.includes('*')) {
    return size;
  }
  
  // 否则将x替换为*
  return size.replace(/x/g, '*');
}

/**
 * 提交图像生成任务
 */
export async function submitImageTask(params: ImageGenerationParams): Promise<{ success: boolean, taskId?: string, error?: string }> {
  if (!API_KEY) {
    return {
      success: false,
      error: 'API密钥未配置'
    };
  }

  // 添加系统提示词，生成适合儿童的黑白涂色页
  const systemPrompt = "Black and White, coloring page for child, thick lines, low detail, no shading, Sketching, Simplify content, Leave important structures behind, Minimalist style";
  
  // 组合提示词 - 用户输入在前，系统提示词在后，用逗号连接
  const userPromptTrimmed = params.prompt.trim();
  const enhancedPrompt = `${userPromptTrimmed}, ${systemPrompt}`;
  
  try {
    // 格式化尺寸
    const formattedSize = formatSize(params.size);
    
    // 根据文档构建请求体
    const requestBody = {
      model: 'flux-dev',
      input: {
        prompt: enhancedPrompt
      },
      parameters: {
        size: formattedSize
        // 完全移除steps和guidance参数，让API使用默认值
      }
    };

    console.log('提交生成任务, 参数:', { 
      原始尺寸: params.size, 
      格式化尺寸: formattedSize,
      系统提示词: systemPrompt,
      用户提示词: params.prompt,
      组合提示词: enhancedPrompt,
      完整请求参数: requestBody 
    });

    // 发送异步任务请求
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'X-DashScope-Async': 'enable' // 启用异步模式
      },
      body: JSON.stringify(requestBody)
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error('API请求失败:', responseData);
      throw new Error(responseData.message || responseData.error || '提交图片生成任务失败');
    }
    
    console.log('API响应成功:', responseData);
    
    // 返回任务ID
    return {
      success: true,
      taskId: responseData.output?.task_id
    };
  } catch (error) {
    console.error('提交图片生成任务出错:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : '未知错误'
    };
  }
}

/**
 * 查询图像生成任务状态
 */
export async function checkTaskStatus(taskId: string): Promise<GenerationResult> {
  if (!API_KEY) {
    return {
      success: false,
      images: [],
      error: 'API密钥未配置'
    };
  }

  try {
    const response = await fetch(`${TASK_URL}${taskId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${API_KEY}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || '查询任务状态失败');
    }

    const data = await response.json();
    const taskStatus = data.output?.task_status;

    // 根据任务状态返回不同结果
    if (taskStatus === 'SUCCEEDED') {
      // 任务成功完成，处理结果
      const images = (data.output?.results || []).map((result: TaskResult) => {
        // 从URL中提取尺寸
        const size = data.output?.parameters?.size || '1024*1024';
        const [width, height] = size.split('*').map(Number);
        
        // 增加URL调试信息
        console.log('处理图片URL:', result.url);
        
        return {
          url: result.url,
          width,
          height,
          id: taskId
        };
      });

      // 如果没有图片结果，记录详细信息
      if (images.length === 0) {
        console.log('警告：任务成功但没有图片结果:', data);
      } else {
        console.log('成功获取图片结果:', images.length, '张图片');
      }

      return {
        success: true,
        images,
        taskId
      };
    } else if (taskStatus === 'FAILED') {
      // 任务失败
      return {
        success: false,
        images: [],
        error: data.output?.message || '图片生成任务失败',
        taskId
      };
    } else {
      // 任务仍在进行中
      return {
        success: false,
        images: [],
        error: '任务仍在处理中',
        taskId
      };
    }
  } catch (error) {
    console.error('查询任务状态出错:', error);
    return {
      success: false,
      images: [],
      error: error instanceof Error ? error.message : '未知错误',
      taskId
    };
  }
}

/**
 * 轮询任务状态直到完成或出错
 * @param taskId 任务ID
 * @param maxAttempts 最大尝试次数
 * @param interval 轮询间隔(毫秒)
 */
export async function pollTaskUntilComplete(
  taskId: string, 
  maxAttempts: number = 30, 
  interval: number = 2000
): Promise<GenerationResult> {
  let attempts = 0;

  while (attempts < maxAttempts) {
    const result = await checkTaskStatus(taskId);
    
    // 如果任务完成或失败，返回结果
    if (result.success || (result.error && result.error !== '任务仍在处理中')) {
      return result;
    }

    // 等待指定时间再次查询
    await new Promise(resolve => setTimeout(resolve, interval));
    attempts++;
  }

  // 超过最大尝试次数
  return {
    success: false,
    images: [],
    error: '任务查询超时',
    taskId
  };
} 
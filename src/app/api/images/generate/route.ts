import { NextResponse } from 'next/server';
import { submitImageTask, checkTaskStatus } from '@/lib/image-generation';

export async function POST(request: Request) {
  try {
    const { prompt, size, negativePrompt } = await request.json();
    
    if (!prompt) {
      return NextResponse.json(
        { error: '提示词是必须的' },
        { status: 400 }
      );
    }
    
    // 判断环境变量是否已配置
    if (!process.env.DASHSCOPE_API_KEY) {
      console.warn('DASHSCOPE_API_KEY环境变量未配置，返回模拟数据');
      
      // 如果API密钥未配置，返回模拟数据
      return NextResponse.json({
        success: true,
        message: '这是一个占位符。实际图像生成将在API配置后实现。',
        mockImageUrl: 'https://placehold.co/600x600/png?text=Coloring+Page',
        prompt
      });
    }
    
    // 提交图像生成任务
    const taskResult = await submitImageTask({
      prompt,
      size,
      negativePrompt
    });
    
    if (!taskResult.success || !taskResult.taskId) {
      return NextResponse.json(
        { error: taskResult.error || '提交图片生成任务失败' },
        { status: 500 }
      );
    }
    
    // 返回任务ID，由前端进行轮询
    return NextResponse.json({
      success: true,
      taskId: taskResult.taskId,
      message: '任务已提交，请使用任务ID查询结果',
      prompt
    });
  } catch (error) {
    console.error('提交图片生成任务时出错:', error);
    return NextResponse.json(
      { error: '提交图片生成任务失败' },
      { status: 500 }
    );
  }
}

// 添加任务状态查询API
export async function GET(request: Request) {
  try {
    // 从URL获取任务ID
    const url = new URL(request.url);
    const taskId = url.searchParams.get('taskId');
    
    if (!taskId) {
      return NextResponse.json(
        { error: '任务ID是必须的' },
        { status: 400 }
      );
    }
    
    // 查询任务状态
    const result = await checkTaskStatus(taskId);
    
    // 添加详细日志输出
    if (result.success && result.images && result.images.length > 0) {
      console.log('任务完成成功！返回图片信息:', {
        图片URL: result.images[0].url,
        宽度: result.images[0].width,
        高度: result.images[0].height
      });
    } else if (result.error) {
      console.log('任务查询返回错误:', result.error);
    } else {
      console.log('任务仍在进行中，当前状态:', JSON.stringify(result, null, 2));
    }
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('查询任务状态时出错:', error);
    return NextResponse.json(
      { error: '查询任务状态失败' },
      { status: 500 }
    );
  }
} 
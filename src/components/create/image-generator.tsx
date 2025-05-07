'use client';

import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/language-context';
import Image from 'next/image';

// 从API响应定义类型
interface GeneratedImage {
  url: string;
  width: number;
  height: number;
  id?: string;
}

interface GenerateResponse {
  success: boolean;
  images?: GeneratedImage[];
  mockImageUrl?: string;
  error?: string;
  message?: string;
}

export function ImageGenerator() {
  const { t } = useLanguage();
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [mockImageUrl, setMockImageUrl] = useState<string | null>(null);
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  // 处理表单提交
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      setError('请输入描述内容');
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      setShowPlaceholder(false);
      
      const response = await fetch('/api/images/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt,
          size: '1024*1024',
          n: 1,
        }),
      });
      
      const data: GenerateResponse = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || '生成图片时出错');
      }
      
      if (!data.success) {
        throw new Error(data.error || '生成图片失败');
      }
      
      // 处理模拟响应
      if (data.mockImageUrl) {
        setMockImageUrl(data.mockImageUrl);
        setGeneratedImages([]);
      } else if (data.images && data.images.length > 0) {
        setGeneratedImages(data.images);
        setMockImageUrl(null);
      } else {
        throw new Error('未收到图片数据');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '生成图片时出错');
      console.error('生成图片出错:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // 处理下载图片
  const handleDownload = (url: string, format: string) => {
    // 创建临时链接
    const link = document.createElement('a');
    link.href = url;
    link.download = `coloring-page-${Date.now()}.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="space-y-8">
      {/* 输入表单 */}
      <div className="bg-card rounded-lg p-6 shadow-sm">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="prompt" className="block text-sm font-medium mb-1">
              {t('create.prompt')}
            </label>
            <textarea
              id="prompt"
              className="w-full min-h-[100px] p-3 border rounded-md bg-background resize-y"
              placeholder={t('create.placeholder')}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={isLoading}
            ></textarea>
          </div>
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading || !prompt.trim()}
          >
            {isLoading ? t('create.loading') : t('create.button')}
          </Button>
        </form>
      </div>
      
      {/* 结果预览 */}
      <div className="bg-card rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">预览</h2>
        
        {/* 错误信息 */}
        {error && (
          <div className="mb-4 p-4 bg-destructive/10 text-destructive rounded-md">
            {error}
          </div>
        )}
        
        {/* 加载状态 */}
        {isLoading && (
          <div className="aspect-square bg-muted rounded-md flex items-center justify-center text-muted-foreground/50 mb-4">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
              <p>{t('create.loading')}</p>
            </div>
          </div>
        )}
        
        {/* 占位符 */}
        {!isLoading && showPlaceholder && !generatedImages.length && !mockImageUrl && (
          <div className="aspect-square bg-muted rounded-md flex items-center justify-center text-muted-foreground/50 mb-4">
            您生成的着色页将显示在这里
          </div>
        )}
        
        {/* 模拟图片 */}
        {!isLoading && mockImageUrl && (
          <div className="mb-4">
            <div className="relative aspect-square overflow-hidden rounded-md">
              <Image 
                src={mockImageUrl} 
                alt="模拟生成的着色页"
                fill
                className="object-contain"
              />
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              这是一个模拟示例。要生成真实图片，请配置API密钥。
            </p>
          </div>
        )}
        
        {/* 真实生成的图片 */}
        {!isLoading && generatedImages.length > 0 && (
          <div className="mb-4">
            <div className="relative aspect-square overflow-hidden rounded-md">
              <Image 
                src={generatedImages[0].url} 
                alt="生成的着色页"
                fill
                className="object-contain"
              />
            </div>
          </div>
        )}
        
        {/* 下载按钮 */}
        <div className="flex flex-wrap gap-4">
          <Button 
            disabled={isLoading || (!generatedImages.length && !mockImageUrl)} 
            onClick={() => {
              const url = generatedImages.length > 0 
                ? generatedImages[0].url 
                : mockImageUrl as string;
              handleDownload(url, 'png');
            }}
          >
            {t('image.download.png')}
          </Button>
          <Button 
            variant="outline" 
            disabled={true}
          >
            {t('image.download.pdf')}
          </Button>
        </div>
        
        {/* 如果没有真实生成图片 */}
        {!generatedImages.length && !isLoading && (
          <p className="mt-4 text-sm text-muted-foreground">
            注意：实际图片生成功能将在API密钥配置后实现。
          </p>
        )}
      </div>
    </div>
  );
} 
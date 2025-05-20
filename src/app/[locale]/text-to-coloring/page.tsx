'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Loader2, Download, X } from 'lucide-react';
import { LayoutContainer } from '@/components/layout/layout-container';
import Image from 'next/image';

// 注意：这是一个客户端组件，不能使用unstable_setRequestLocale
// 客户端组件会自动从上下文中获取locale参数

export default function CreatePage() {
  const t = useTranslations();
  const [prompt, setPrompt] = useState('');
  const [size, setSize] = useState('1024*1024');
  
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPolling, setIsPolling] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [_taskId, setTaskId] = useState<string | null>(null);
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // 清除轮询定时器
  const clearPollingInterval = () => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
  };

  // 开始轮询任务状态
  const startPolling = (taskId: string) => {
    setIsPolling(true);
    
    // 清除已有的轮询定时器
    clearPollingInterval();
    
    // 设置新的轮询定时器，每3秒检查一次任务状态
    pollingIntervalRef.current = setInterval(async () => {
      try {
        const response = await fetch(`/api/images/generate?taskId=${taskId}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to check task status');
        }
        
        // 任务已完成
        if (data.success && data.images && data.images.length > 0) {
          clearPollingInterval();
          setIsPolling(false);
          setIsLoading(false);
          setImageUrl(data.images[0].url);
        } 
        // 任务失败
        else if (data.error && data.error !== '任务仍在处理中') {
          clearPollingInterval();
          setIsPolling(false);
          setIsLoading(false);
          setError(data.error || 'Image generation failed');
        }
        // 其他状态继续等待
      } catch (error) {
        console.error('Error polling task status:', error);
        clearPollingInterval();
        setIsPolling(false);
        setIsLoading(false);
        setError('Failed to check task status');
      }
    }, 3000); // 每3秒查询一次
  };

  useEffect(() => {
    // 组件卸载时清除轮询
    return () => {
      clearPollingInterval();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      setError(null);
      setImageUrl(null);
      setTaskId(null);
      clearPollingInterval();

      const response = await fetch('/api/images/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          size
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate image');
      }

      // 检查是否是模拟数据
      if (data.mockImageUrl) {
        setImageUrl(data.mockImageUrl);
        setIsLoading(false);
        return;
      }

      // 获取任务ID并开始轮询
      if (data.taskId) {
        setTaskId(data.taskId);
        startPolling(data.taskId);
      } else {
        throw new Error('No valid task ID returned');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsLoading(false);
      setError(error instanceof Error ? error.message : 'Failed to submit generation request');
    }
  };

  const handleDownload = () => {
    if (imageUrl) {
      const a = document.createElement('a');
      a.href = imageUrl;
      a.download = `coloring-page-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const openPreview = () => {
    if (imageUrl) {
      setIsPreviewOpen(true);
    }
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
  };

  return (
    <LayoutContainer>
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8">{t('create.title')}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border rounded-lg p-6 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="prompt" className="block text-sm font-medium mb-1">
                      {t('create.prompt.label')}
                    </label>
                    <textarea
                      id="prompt"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder={t('create.prompt.placeholder')}
                      className="w-full p-2 border rounded-md"
                      rows={4}
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {t('create.prompt.helper')}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="flex items-center gap-1 text-sm font-medium mb-2">
                        {t('create.size.label')} <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        <div 
                          className={`border rounded-md p-2 px-3 flex items-center gap-2 cursor-pointer ${size === '768*1024' ? 'bg-indigo-100 border-indigo-300' : 'bg-white'}`}
                          onClick={() => setSize('768*1024')}
                        >
                          <div className="flex gap-2 items-center">
                            <div className="h-5 w-4 border border-gray-400"></div>
                            <span>{t('create.size.option1')}</span>
                          </div>
                        </div>
                        
                        <div 
                          className={`border rounded-md p-2 px-3 flex items-center gap-2 cursor-pointer ${size === '1024*1024' ? 'bg-indigo-100 border-indigo-300' : 'bg-white'}`}
                          onClick={() => setSize('1024*1024')}
                        >
                          <div className="flex gap-2 items-center">
                            <div className="h-4 w-4 border border-gray-400"></div>
                            <span>{t('create.size.option2')}</span>
                          </div>
                        </div>
                        
                        <div 
                          className={`border rounded-md p-2 px-3 flex items-center gap-2 cursor-pointer ${size === '1024*768' ? 'bg-indigo-100 border-indigo-300' : 'bg-white'}`}
                          onClick={() => setSize('1024*768')}
                        >
                          <div className="flex gap-2 items-center">
                            <div className="h-4 w-5 border border-gray-400"></div>
                            <span>{t('create.size.option3')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button type="submit" disabled={isLoading || prompt.trim().length === 0} className="w-full">
                    {isLoading ? (
                      <>
                        {isPolling ? t('create.generating') : t('create.submitting')} <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                      </>
                    ) : (
                      t('create.generateButton')
                    )}
                  </Button>
                </form>
              </div>

              <div className="border rounded-lg p-6 shadow-sm">
                <h2 className="text-lg font-medium mb-2">{t('create.preview.title')}</h2>
                <p className="text-sm text-gray-500 mb-4">{t('create.preview.subtitle')}</p>
                
                <div className="aspect-square bg-gray-100 rounded-lg relative overflow-hidden">
                  {isLoading ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
                      <Loader2 className="h-8 w-8 animate-spin mb-2" />
                      <p>{t('create.preview.loading')}</p>
                    </div>
                  ) : error ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-red-500 p-4 text-center">
                      <p className="font-medium mb-1">{t('create.preview.error')}</p>
                      <p className="text-sm">{error}</p>
                      <Button variant="outline" size="sm" className="mt-4" onClick={() => setError(null)}>
                        {t('create.preview.tryAgainButton')}
                      </Button>
                    </div>
                  ) : imageUrl ? (
                    <>
                      <Image 
                        src={imageUrl}
                        alt="Generated coloring page"
                        fill
                        className="object-contain cursor-pointer"
                        onClick={openPreview}
                      />
                      <Button 
                        variant="secondary" 
                        size="icon" 
                        className="absolute bottom-3 right-3"
                        onClick={handleDownload}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </>
                  ) : null}
                </div>
                
                {imageUrl && (
                  <div className="mt-4 flex justify-center">
                    <Button onClick={handleDownload} className="w-full">
                      {t('create.preview.downloadButton')} <Download className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 全屏预览 */}
      {isPreviewOpen && imageUrl && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-4 right-4 text-white"
            onClick={closePreview}
          >
            <X className="h-6 w-6" />
          </Button>
          
          <div className="relative max-w-4xl max-h-screen w-full h-auto">
            <Image 
              src={imageUrl}
              alt="Generated coloring page preview"
              width={1024}
              height={1024}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      )}
    </LayoutContainer>
  );
}

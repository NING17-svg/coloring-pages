'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Loader2, Download, X, Sparkles, Wand2 } from 'lucide-react';
import { LayoutContainer } from '@/components/layout/layout-container';
import Image from 'next/image';

// 注意：这是一个客户端组件，不能使用unstable_setRequestLocale
// 客户端组件会自动从上下文中获取locale参数

export default function TextToColoringPage() {
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
        else if (data.error && data.error !== 'Task is still processing') {
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
      a.download = `text-to-coloring-page-${Date.now()}.png`;
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
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
              Text to Coloring Page Generator
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Transform your imagination into beautiful coloring pages. Simply describe what you want, and our AI will convert your text to stunning line art in seconds.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div className="border rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <Wand2 className="mr-2 h-5 w-5 text-primary" />
                  Text to Coloring Converter
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="prompt" className="block text-sm font-medium mb-1">
                      {t('create.prompt.label')}
                    </label>
                    <textarea
                      id="prompt"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Describe what you want to color (e.g., 'A butterfly with beautiful detailed wings')"
                      className="w-full p-2 border rounded-md"
                      rows={4}
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Be descriptive for better results. Add details about style, theme, and elements.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="flex items-center gap-1 text-sm font-medium mb-2">
                        Page Size <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        <div 
                          className={`border rounded-md p-2 px-3 flex items-center gap-2 cursor-pointer ${size === '768*1024' ? 'bg-indigo-100 border-indigo-300' : 'bg-white'}`}
                          onClick={() => setSize('768*1024')}
                        >
                          <div className="flex gap-2 items-center">
                            <div className="h-5 w-4 border border-gray-400"></div>
                            <span>Portrait</span>
                          </div>
                        </div>
                        
                        <div 
                          className={`border rounded-md p-2 px-3 flex items-center gap-2 cursor-pointer ${size === '1024*1024' ? 'bg-indigo-100 border-indigo-300' : 'bg-white'}`}
                          onClick={() => setSize('1024*1024')}
                        >
                          <div className="flex gap-2 items-center">
                            <div className="h-4 w-4 border border-gray-400"></div>
                            <span>Square</span>
                          </div>
                        </div>
                        
                        <div 
                          className={`border rounded-md p-2 px-3 flex items-center gap-2 cursor-pointer ${size === '1024*768' ? 'bg-indigo-100 border-indigo-300' : 'bg-white'}`}
                          onClick={() => setSize('1024*768')}
                        >
                          <div className="flex gap-2 items-center">
                            <div className="h-4 w-5 border border-gray-400"></div>
                            <span>Landscape</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button type="submit" disabled={isLoading || prompt.trim().length === 0} className="w-full">
                    {isLoading ? (
                      <>
                        {isPolling ? 'Converting Text to Coloring Page...' : 'Processing...'} <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                      </>
                    ) : (
                      <>Convert Text to Coloring Page <Sparkles className="ml-2 h-4 w-4" /></>
                    )}
                  </Button>
                </form>

                <div className="mt-6 pt-4 border-t border-gray-100">
                  <h3 className="text-md font-semibold mb-2">How Text to Coloring Works:</h3>
                  <ol className="list-decimal pl-5 text-sm text-gray-600 space-y-1">
                    <li>Enter a detailed description of what you want to color</li>
                    <li>Select your preferred page size</li>
                    <li>Our AI transforms your text into a beautiful line drawing</li>
                    <li>Download your custom coloring page instantly</li>
                  </ol>
                </div>
              </div>

              <div className="border rounded-lg p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-4 flex items-center">
                  <Sparkles className="mr-2 h-5 w-5 text-primary" />
                  Your Text to Coloring Creation
                </h2>
                <p className="text-sm text-gray-500 mb-4">Your custom coloring page will appear here after generation.</p>
                
                <div className="aspect-square bg-gray-100 rounded-lg relative overflow-hidden">
                  {isLoading ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
                      <Loader2 className="h-8 w-8 animate-spin mb-2" />
                      <p>Converting your text to a coloring page...</p>
                    </div>
                  ) : error ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-red-500 p-4 text-center">
                      <p className="font-medium mb-1">Generation Error</p>
                      <p className="text-sm">{error}</p>
                      <Button variant="outline" size="sm" className="mt-4" onClick={() => setError(null)}>
                        Try Again
                      </Button>
                    </div>
                  ) : imageUrl ? (
                    <>
                      <Image 
                        src={imageUrl}
                        alt="Generated text to coloring page"
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
                      Download Your Coloring Page <Download className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-12 text-left">
              <h2 className="text-2xl font-bold mb-4">Why Use Our Text to Coloring Tool?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-50 p-5 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Free & Unlimited</h3>
                  <p>Create as many custom coloring pages as you want - absolutely free! No hidden costs or premium features.</p>
                </div>
                <div className="bg-gray-50 p-5 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Instant Generation</h3>
                  <p>Our AI converts your text descriptions to beautiful coloring pages in seconds - no waiting, no delays.</p>
                </div>
                <div className="bg-gray-50 p-5 rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Endless Possibilities</h3>
                  <p>From butterflies to dragons, landscapes to portraits - if you can describe it, our text to coloring converter can create it.</p>
                </div>
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
              alt="Text to coloring page preview"
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

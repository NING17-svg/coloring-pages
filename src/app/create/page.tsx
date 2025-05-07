'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Download, X } from 'lucide-react';
import { LayoutContainer } from '@/components/layout/layout-container';

export default function CreatePage() {
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
            <h1 className="text-3xl font-bold text-center mb-8">Create Coloring Page</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border rounded-lg p-6 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="prompt" className="block text-sm font-medium mb-1">
                      Prompt
                    </label>
                    <textarea
                      id="prompt"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Enter a prompt describing the image you want to generate..."
                      className="w-full p-2 border rounded-md"
                      rows={4}
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Describe in detail the coloring page you want to generate.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="flex items-center gap-1 text-sm font-medium mb-2">
                        Size <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        <div 
                          className={`border rounded-md p-2 px-3 flex items-center gap-2 cursor-pointer ${size === '768*1024' ? 'bg-indigo-100 border-indigo-300' : 'bg-white'}`}
                          onClick={() => setSize('768*1024')}
                        >
                          <div className="flex gap-2 items-center">
                            <div className="h-5 w-4 border border-gray-400"></div>
                            <span>768*1024</span>
                          </div>
                        </div>
                        
                        <div 
                          className={`border rounded-md p-2 px-3 flex items-center gap-2 cursor-pointer ${size === '1024*1024' ? 'bg-indigo-100 border-indigo-300' : 'bg-white'}`}
                          onClick={() => setSize('1024*1024')}
                        >
                          <div className="flex gap-2 items-center">
                            <div className="h-4 w-4 border border-gray-400"></div>
                            <span>1024*1024</span>
                          </div>
                        </div>
                        
                        <div 
                          className={`border rounded-md p-2 px-3 flex items-center gap-2 cursor-pointer ${size === '1024*768' ? 'bg-indigo-100 border-indigo-300' : 'bg-white'}`}
                          onClick={() => setSize('1024*768')}
                        >
                          <div className="flex gap-2 items-center">
                            <div className="h-3 w-5 border border-gray-400"></div>
                            <span>1024*768</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading || isPolling}
                  >
                    {(isLoading || isPolling) && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    {isPolling ? 'Generating Image...' : isLoading ? 'Submitting...' : 'Generate Coloring Page'}
                  </Button>
                </form>
              </div>

              <div className="border rounded-lg overflow-hidden shadow-sm flex flex-col">
                <div className="p-4 border-b">
                  <h2 className="text-xl font-semibold">Image Preview</h2>
                  <p className="text-sm text-gray-500">
                    Your generated coloring page will appear here
                  </p>
                </div>
                
                <div className="flex-grow flex items-center justify-center bg-gray-100 p-4 relative min-h-[400px]">
                  {(isLoading || isPolling) && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
                      <Loader2 className="h-8 w-8 animate-spin mb-2" />
                      <p>{isPolling ? 'Generating image, please wait...' : 'Submitting...'}</p>
                    </div>
                  )}
                  
                  {error && !isLoading && !isPolling && (
                    <div className="text-center text-red-500 p-4">
                      <p className="font-semibold">Error</p>
                      <p className="text-sm mt-2">{error}</p>
                    </div>
                  )}
                  
                  {imageUrl && !isLoading && !isPolling && (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <img
                        src={imageUrl}
                        alt="Generated coloring page"
                        width={500}
                        height={500}
                        className="max-w-full max-h-[400px] object-contain cursor-pointer"
                        onClick={openPreview}
                      />
                    </div>
                  )}
                  
                  {!imageUrl && !error && !isLoading && !isPolling && (
                    <div className="text-center text-gray-500">
                      <p>Use the form on the left to generate a coloring page</p>
                    </div>
                  )}
                </div>
                
                {imageUrl && !isLoading && !isPolling && (
                  <div className="p-4 border-t">
                    <Button
                      onClick={handleDownload}
                      className="w-full"
                      variant="outline"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Image
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {isPreviewOpen && imageUrl && (
        <div 
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={closePreview}
        >
          <div className="relative">
            <button 
              className="absolute -top-12 right-0 bg-white rounded-full p-1 z-10"
              onClick={closePreview}
            >
              <X className="h-6 w-6" />
            </button>
            <div className="bg-white rounded-md overflow-hidden">
              <img
                src={imageUrl}
                alt="Generated coloring page (enlarged)"
                className="max-h-[85vh] max-w-[85vw]"
                style={{ objectFit: 'contain' }}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        </div>
      )}
    </LayoutContainer>
  );
}

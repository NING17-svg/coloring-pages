import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();
    
    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }
    
    // 暂时返回模拟数据，后续将集成OpenAI或Stability AI
    return NextResponse.json({
      success: true,
      message: 'This is a placeholder. Actual image generation will be implemented in the next phase.',
      mockImageUrl: 'https://placehold.co/600x600/png?text=Coloring+Page',
      prompt
    });
  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    );
  }
} 
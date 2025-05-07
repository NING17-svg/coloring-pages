import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getImageData } from '@/lib/coloring-data';

// 定义路由参数类型
interface RouteParams {
  category: string;
  imageId: string;
}

// Handle image download request
export function GET(
  request: NextRequest,
  { params }: { params: RouteParams }
) {
  try {
    const { category, imageId } = params;
    
    // Get image data
    const imageData = getImageData(category, imageId);
    
    if (!imageData) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      );
    }
    
    // Get image path (extracted from image URL)
    const imagePath = path.join(process.cwd(), 'public', imageData.imageUrl);
    
    // Check if file exists
    if (!fs.existsSync(imagePath)) {
      return NextResponse.json(
        { error: 'Image file not found' },
        { status: 404 }
      );
    }
    
    // Read image file
    const fileBuffer = fs.readFileSync(imagePath);
    
    // Update download count (in a real project, would update JSON or database)
    // Since this is an example, we only log but don't actually update
    console.log(`Download count for ${imageId} incremented`);
    
    // Set response headers
    const headers = new Headers();
    headers.set('Content-Type', 'image/webp');
    headers.set('Content-Disposition', `attachment; filename="${imageId}.webp"`);
    
    // Return file
    return new NextResponse(fileBuffer, {
      status: 200,
      headers
    });
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json(
      { error: 'Failed to process download' },
      { status: 500 }
    );
  }
} 
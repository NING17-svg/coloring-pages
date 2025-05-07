import fs from 'fs';
import path from 'path';

// 数据类型定义
export interface ColoringImage {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  difficulty: 'easy' | 'medium' | 'hard';
  ageGroup: 'children' | 'teen' | 'adult' | 'all';
  downloadCount: number;
  tags: string[];
}

export interface CategoryData {
  title: string;
  description: string;
  count: number;
  images: ColoringImage[];
}

export interface ColoringData {
  [key: string]: CategoryData;
}

// 获取数据文件夹路径
const dataFolderPath = path.join(process.cwd(), 'data');

// 可用的分类列表
const CATEGORIES = [
  'butterfly-coloring-pages',
  'flower-coloring-pages',
  'dragon-coloring-pages',
  'unicorn-coloring-pages'
];

// 从JSON文件加载分类数据
function loadCategoryData(category: string): CategoryData | null {
  try {
    const filePath = path.join(dataFolderPath, `${category}.json`);
    if (!fs.existsSync(filePath)) {
      console.error(`Category file not found: ${filePath}`);
      return null;
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error(`Error loading category data for ${category}:`, error);
    return null;
  }
}

// 加载所有涂色页数据
export function getAllColoringData(): ColoringData {
  const data: ColoringData = {};
  
  CATEGORIES.forEach(category => {
    const categoryData = loadCategoryData(category);
    if (categoryData) {
      data[category] = categoryData;
    }
  });
  
  return data;
}

// 获取所有分类
export function getAllCategories() {
  return CATEGORIES.map(slug => {
    const data = loadCategoryData(slug);
    return {
      slug,
      title: data?.title || slug,
      description: data?.description || '',
      count: data?.count || 0
    };
  }).filter(category => category.title); // 只返回成功加载的分类
}

// 获取特定分类数据
export function getCategoryData(slug: string): CategoryData | null {
  return loadCategoryData(slug);
}

// 获取特定图片数据
export function getImageData(category: string, imageId: string): ColoringImage | null {
  const categoryData = getCategoryData(category);
  if (!categoryData) return null;
  
  // 直接查找图片ID，不需要额外处理
  return categoryData.images.find(img => img.id === imageId) || null;
}

// 获取所有可能的图片路径 (用于generateStaticParams)
export function getAllImagePaths() {
  const paths: { category: string; imageId: string }[] = [];
  
  CATEGORIES.forEach(category => {
    const categoryData = loadCategoryData(category);
    if (categoryData && categoryData.images) {
      categoryData.images.forEach(image => {
        paths.push({
          category,
          imageId: image.id
        });
      });
    }
  });
  
  return paths;
}

// 获取相关图片 (同一分类下的其他图片)
export function getRelatedImages(category: string, currentImageId: string, limit = 4) {
  const categoryData = getCategoryData(category);
  if (!categoryData) return [];
  
  return categoryData.images
    .filter(img => img.id !== currentImageId)
    .slice(0, limit);
} 
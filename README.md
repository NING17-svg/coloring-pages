# 黑白着色页下载平台

一个使用Next.js 14开发的黑白着色页下载平台。用户可以通过文字描述生成黑白着色图，浏览分类整理的着色页，并下载使用。网站支持简单的多语言功能，默认语言为英文。

## 功能特点

- **文本生成图像**：通过AI大模型API直接生成黑白线稿着色页
- **分类系统**：按关键词/主题分类整理着色页
- **下载功能**：提供高质量PDF和PNG格式下载
- **多语言支持**：默认英文，后续根据流量添加其他语言

## 技术栈

- **前端框架**：Next.js 14（App Router）
- **样式方案**：Tailwind CSS
- **UI组件库**：Shadcn/UI
- **状态管理**：React Context API / Zustand
- **多语言支持**：简化版多语言实现
- **AI 文生图**：OpenAI API / Stability AI（直接生成黑白线稿）
- **数据存储**：Supabase
- **图片存储**：Cloudflare R2对象存储

## 开发指南

### 安装

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 项目结构

```
src/
├── app/              # Next.js App Router页面
├── components/       # 可重用组件
├── lib/              # 工具函数和服务
├── contexts/         # React上下文（包括多语言支持）
└── i18n/             # 多语言翻译文件
```

### 环境变量

创建一个`.env.local`文件，包含以下变量：

```
OPENAI_API_KEY=your_openai_api_key
```

## 贡献指南

1. Fork仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建Pull Request

## 系统架构

```
├── 前端层（Next.js）
│   ├── 页面组件
│   │   ├── 首页
│   │   ├── 分类页面
│   │   ├── 单张图片页面
│   │   └── 图片生成页面
│   ├── 共享组件
│   └── 简化多语言模块
├── 服务层（Next.js API Routes）
│   ├── 文生图API
│   ├── 图片管理API
│   ├── 分类管理API
│   ├── 用户API（预留）
│   └── 支付API（预留）
└── 数据层
    ├── Cloudflare R2对象存储
    └── Supabase数据库
```

## 图片存储方案

**推荐方案**：Cloudflare R2对象存储

- **主要优势**：
  - 无出口带宽费用（对下载服务至关重要）
  - 每月10GB免费存储空间
  - 每月100万次免费API操作
  - 全球CDN自动分发，确保快速访问
  - S3兼容API，便于集成和可能的未来迁移

这个方案比其他云存储服务更经济实惠，特别适合我们的下载服务。无出口带宽费用意味着即使用户下载大量图片，也不会产生额外费用。

## 数据模型设计

### ColoringPage
```
- id: UUID (主键)
- title: String
- description: Text
- originalPrompt: Text
- imageUrl: String
- thumbnailUrl: String
- downloadCount: Integer
- difficulty: Enum ['easy', 'medium', 'hard']
- ageGroup: Enum ['children', 'teen', 'adult', 'all']
- isPublic: Boolean
- createdAt: DateTime
- updatedAt: DateTime
```

### Category (关键词/标签)
```
- id: UUID (主键)
- name: String
- slug: String (唯一)
- description: Text
- imageUrl: String (分类展示图)
- count: Integer (该分类下的图片数量)
- createdAt: DateTime
- updatedAt: DateTime
```

### PageTag (图片-标签关联表)
```
- pageId: UUID (外键 -> ColoringPage)
- categoryId: UUID (外键 -> Category)
```

### 预留数据模型（前期不实现）
```
# User Model
- id: UUID (主键)
- email: String (唯一)
- password: String (加密)
- name: String
- role: Enum ['user', 'admin']
- subscription: Enum ['free', 'premium']

# Payment Model
- id: UUID (主键)
- userId: UUID (关联用户)
- amount: Decimal
- currency: String
- status: Enum ['pending', 'completed', 'failed']
- planType: Enum ['monthly', 'yearly']
```

## 页面路由设计（静态路由）

```
/                             # 首页
/create                       # 创建新着色页
/coloring-pages                   # 所有分类列表
/category/:slug               # 特定分类页面
/image/:id                    # 单张图片详情页
/download/:id                 # 图片下载处理

# 预留路由（不实现功能，返回敬请期待）
/account                      # 用户账户（预留）
/pricing                      # 订阅价格（预留）
```

## API设计

### 初期实现API
```
GET  /api/images                  # 获取图片列表 (分页、筛选)
GET  /api/images/[id]             # 获取单个图片详情
POST /api/images/generate         # 生成新图片
GET  /api/coloring-pages              # 获取分类列表
GET  /api/coloring-pages/[slug]       # 获取特定分类及其图片
GET  /api/trending                # 获取热门图片
POST /api/download/[id]           # 下载图片（记录统计）
```

### 预留API（设计但不实现）
```
POST   /api/auth/login            # 用户登录
POST   /api/auth/register         # 用户注册
GET    /api/user/profile          # 获取用户信息
POST   /api/payment/create        # 创建支付
GET    /api/payment/plans         # 获取套餐计划
```

## 多语言支持方案

简化的多语言实现，通过语言切换按钮实现界面文本切换，不改变URL结构：

1. **目录结构**：
   ```
   /i18n/
     translations/
       en.json
       zh.json
   ```

2. **实现方式**：使用Context API存储当前语言状态，组件内部根据语言状态渲染对应文本

## 首页UI设计

首页采用现代化、清晰的布局，类似苹果官网的设计，包含以下部分：

### 1. 导航栏
- 网站Logo
- 主导航链接（首页、分类、创建）
- 语言切换按钮
- 预留登录/注册入口

### 2. 英雄区域
- 大型标题和副标题介绍网站功能
- 简短的网站价值说明
- 主要行动按钮（开始使用、浏览图片）
- 精选黑白着色页展示

### 3. 分类展示区
- 网格布局展示主要分类
- 每个分类卡片包含代表性图片和名称
- "查看全部"按钮链接到分类页面

### 4. 文生图介绍及进入按钮
- 功能说明及优势
- 示例展示（输入文本→生成图片）
- 明显的"开始创建"按钮

### 5. 特点介绍
- 图标+文字布局
- 突出平台主要优势和特色
- 简洁明了的描述

### 6. 用户评价
- 用户头像、名称和评价内容
- 星级评分
- 轮播展示多个评价

### 7. 底部导航栏
- 版权信息
- 辅助导航链接（关于我们、条款等）
- 社交媒体链接
- 简单的新闻订阅功能

## 实施计划

### 第一阶段：MVP核心功能（2周）
- 搭建Next.js项目基础结构
- 实现文生图功能（接入AI API）
- 实现基本图片存储和展示
- 开发分类系统和浏览功能

### 第二阶段：功能完善（2周）
- 完善图片详情页面
- 实现下载功能
- 优化生成图片质量
- 添加基本SEO优化

### 第三阶段：预留接口和UI优化（1周）
- 设计用户系统和支付接口（不实现）
- 优化UI/UX设计
- 添加简单的数据统计
- 实现基本的多语言支持

## 技术实现细节

### 文生图实现
1. 接收用户文本描述
2. 使用特定系统提示(system prompt)调用AI API直接生成黑白线稿
3. 将生成的线稿存储到Cloudflare R2
4. 生成缩略图用于网站展示
5. 保存图片元数据（描述、标签等）

### 分类系统实现
- 使用标签系统实现动态分类
- 自动提取生成图片时的关键词作为标签
- 通过slug实现SEO友好的URL

### 文件下载实现
- 生成优化的PDF和高质量PNG格式
- 使用流式下载减少服务器负载
- 记录下载统计数据

## 动态路由设计

着色页面的路由结构如下：

```
/coloring-pages/[category]/[imageId]
```

例如：
- `/coloring-pages/butterfly/0001-butterfly-coloring-pages`
- `/coloring-pages/dragon/0001-dragon-coloring-pages`

### 图片ID命名规范

图片ID使用以下格式：四位数字编号 + 短横线 + 类别名称 + 短横线 + "coloring-pages"

例如：`0001-butterfly-coloring-pages`

### 数据管理

每个类别有自己的JSON文件，存放在`/data/`目录下：

- `/data/butterfly-coloring-pages.json`
- `/data/flower-coloring-pages.json`
- `/data/dragon-coloring-pages.json`
- `/data/unicorn-coloring-pages.json`

### JSON结构

```json
{
  "title": "蝴蝶着色页",
  "description": "精美的蝴蝶着色页集合，适合儿童和成人",
  "count": 4,
  "images": [
    {
      "id": "0001-butterfly-coloring-pages",
      "title": "简单蝴蝶着色页",
      "description": "适合初学者的简单蝴蝶着色页",
      "tags": ["蝴蝶", "简单", "初学者"],
      "imageUrl": "/images/coloring/butterfly/0001-butterfly.webp"
    },
    // 更多图片...
  ]
}
```

### 技术实现

1. **动态路由页面**：
   - `/coloring-pages/[category]/page.tsx` - 类别页面
   - `/coloring-pages/[category]/[imageId]/page.tsx` - 图片详情页面

2. **数据获取**：
   - 从对应的JSON文件中读取数据
   - 使用类别名称和图片ID进行数据过滤

3. **URL处理**：
   - 所有ID均使用短横线格式，保证URL的一致性和可读性

4. **元数据生成**：
   - 为每个页面生成SEO友好的元数据，包括标题、描述和OpenGraph数据

5. **静态路径生成**：
   - 使用`generateStaticParams()`预生成所有静态路径，提高性能

### 优势

1. **可扩展性**：轻松添加新类别和图片
2. **SEO友好**：动态生成元数据和遵循最佳URL实践
3. **数据管理有序**：每个类别独立管理自己的数据
4. **性能优化**：通过静态路径生成提高加载速度

后期随着图片数量增加，可考虑迁移至数据库存储，但基本组织方式保持不变。

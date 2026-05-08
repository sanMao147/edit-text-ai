---
name: refont-edit-text-ai
overview: 基于 Next.js + TailwindCSS + next-intl 全栈重构一个类似 Refont.ai 的在线 AI 图片文字编辑工具（中英双语 + IP 地理位置自动语言检测 + 手动切换），第一期使用 Mock 数据搭建完整 UI 流程，部署到 Vercel。
design:
  architecture:
    component: shadcn
  styleKeywords:
    - Minimalist Tech
    - Dark Mode First
    - Glassmorphism
    - Gradient Purple
    - Clean Typography
  fontSystem:
    fontFamily: Inter
    heading:
      size: 48px
      weight: 700
    subheading:
      size: 24px
      weight: 600
    body:
      size: 16px
      weight: 400
  colorSystem:
    primary:
      - "#6366F1"
      - "#4F46E5"
      - "#818CF8"
      - "#A5B4FC"
    background:
      - "#0F0F1A"
      - "#1A1A2E"
      - "#1E1E3A"
      - "#FFFFFF"
      - "#F8FAFC"
    text:
      - "#FFFFFF"
      - "#E2E8F0"
      - "#94A3B8"
      - "#1E293B"
      - "#64748B"
    functional:
      - "#10B981"
      - "#EF4444"
      - "#F59E0B"
      - "#3B82F6"
todos:
  - id: init-project
    content: 使用 create-next-app 初始化 Next.js 14 + TypeScript 项目，安装 next-intl、TailwindCSS、shadcn/ui、Zustand、react-dropzone 等依赖
    status: completed
  - id: setup-i18n
    content: 配置 next-intl：创建 i18n.ts、middleware.ts（Cookie+IP Geo 检测）、messages/en.json、messages/zh.json
    status: completed
    dependencies:
      - init-project
  - id: setup-types-stores
    content: 使用 [skill:coding-standards] 创建类型定义、Zustand Store 和 AI 引擎抽象接口
    status: completed
    dependencies:
      - init-project
  - id: create-landing-page
    content: 使用 [skill:frontend-patterns] 和 [skill:microcopy] 构建 Landing Page（Header+LanguageSwitcher+Hero+FeatureCards+HowToUse+WhyChooseUs+FAQ+Footer），所有文案通过 useTranslations() 获取
    status: completed
    dependencies:
      - setup-i18n
  - id: create-editor-page
    content: 使用 [skill:frontend-patterns] 构建编辑器页面（ImageUploader+EditorCanvas+EditToolbar+EditPanel+ProcessButton+CompareView+DownloadButton），文案全部国际化
    status: completed
    dependencies:
      - setup-types-stores
      - setup-i18n
  - id: implement-mock-ai
    content: 实现 Mock AI 引擎（mock-ai-engine.ts）和 API 路由（api/edit-text），模拟延迟、进度和编辑效果
    status: completed
    dependencies:
      - setup-types-stores
  - id: wire-workflow
    content: 串联完整工作流：上传→编辑参数→Mock 处理→结果展示→对比→下载，处理边界情况和错误状态
    status: completed
    dependencies:
      - create-editor-page
      - implement-mock-ai
  - id: polish-deploy
    content: 使用 [skill:microcopy] 优化双语文案，使用 [skill:security-review] 安全审查，使用 [skill:deployment-patterns] 配置 Vercel 部署
    status: completed
    dependencies:
      - create-landing-page
      - wire-workflow
---

## 产品概述

基于 Refont.ai 的 "Edit Text in Image" 产品理念，重构一个在线 AI 图片文字编辑工具。核心定位为面向非专业用户的极致易用的图片文字编辑工具，将复杂操作简化为"上传-描述-下载"三步流程。第一期使用 Mock 数据搭建完整 UI 流程，后续接入真实 AI API。

## 核心功能

- **图片上传**：支持点击上传和拖拽上传，接受 JPG、PNG、WebP 格式
- **替换图片文字**：选择图片中的文字区域，输入新文字，AI 替换并保持原风格
- **添加新文字**：在图片上添加自定义文字，支持自定义内容、位置和样式
- **删除文字/Logo**：擦除图片中的水印、Logo 或标签文字（AI Inpainting）
- **更改文字颜色**：修改图片中文字的颜色，自动适配光照和纹理
- **Before/After 对比**：编辑前后的拖拽滑动对比效果
- **编辑结果下载**：下载编辑后的图片
- **中英双语**：根据 IP 地理位置自动检测语言，支持手动切换并持久化
- **产品 Landing Page**：包含 Hero 区域、功能卡片、使用教程、产品优势、FAQ 等营销内容

## 第一期范围

- 搭建完整 UI 界面和交互流程
- 所有 AI 编辑功能使用 Mock 数据模拟效果
- 后端预留 AI API 接口，后续可替换为真实 AI 模型
- 完整的"上传→编辑→下载"用户流程
- 完整的中英双语国际化支持（IP 自动检测 + 手动切换）

## 技术栈

- **前端框架**: Next.js 14 (App Router) + TypeScript
- **样式方案**: Tailwind CSS + shadcn/ui 组件库
- **国际化**: next-intl（中英双语，路由前缀 `/en`, `/zh`）
- **状态管理**: Zustand
- **文件上传**: react-dropzone（拖拽上传）
- **图片处理**: Canvas API（预览、对比展示）
- **语言检测**: Vercel Edge `request.geo` + Cookie 持久化 + next-intl middleware
- **前后端通信**: Next.js API Routes
- **部署**: Vercel

## 实现方案

### 整体架构

采用 Next.js App Router 全栈架构 + next-intl 国际化路由，分为以下核心模块：

1. **国际化中间件模块**: 基于 next-intl middleware 处理 locale 检测（Cookie 优先级 > Vercel Geo IP > Accept-Language > 默认 en）
2. **Landing Page 模块**（SSR）：产品营销首页，所有文案通过 `useTranslations()` 获取
3. **编辑器工作流模块**（CSR）：上传 → 编辑 → 下载核心流程
4. **Mock AI 引擎**: 模拟 AI 编辑的隔离层，实现与真实 AI 引擎相同的接口
5. **API 层**: Next.js API Routes，预留 AI 模型调用接口

### 国际化方案详解

#### 路由结构

```
/en             - 英文首页
/zh             - 中文首页
/en/editor      - 英文编辑器
/zh/editor      - 中文编辑器
```

#### 语言检测链

```
1. 检查请求中的 NEXT_LOCALE cookie（用户手动选择）
2. 若无 cookie，检查 Vercel Edge 的 request.geo.country === 'CN'
3. 若无法获取 geo，检查 Accept-Language header
4. 以上都无匹配，默认 'en'
```

#### 持久化策略

- 用户手动切换语言后，通过 next-intl 的 `setRequestLocale` 和 cookie 写入
- 使用 `NEXT_LOCALE` cookie 名称（next-intl 默认支持）

#### 翻译文件结构

```
src/messages/
├── en.json    # 英文翻译（Landing Page + 编辑器 + 错误提示 + FAQ）
└── zh.json    # 中文翻译
```

### 多语言对目录结构的影响

相比于原计划，新增/变更的文件：

**新增文件**:

- `src/messages/en.json` - 英文翻译 JSON
- `src/messages/zh.json` - 中文翻译 JSON
- `src/i18n.ts` - next-intl 请求配置（加载翻译文件）
- `src/middleware.ts` - locale 检测中间件（Cookie > IP Geo > Accept-Language > 默认）
- `src/components/LanguageSwitcher.tsx` - 语言切换下拉组件

**变更为 locale 路由的文件**:

- `src/app/[locale]/layout.tsx` - 原 `src/app/layout.tsx`
- `src/app/[locale]/page.tsx` - 原 `src/app/page.tsx`
- `src/app/[locale]/editor/page.tsx` - 原 `src/app/editor/page.tsx`

**不变的文件**:

- `src/app/globals.css` - 保持原位置
- 所有 components/ 下的组件代码逻辑不变，但文案使用 `useTranslations()` 替代硬编码

### IP 地理位置检测方案

```typescript
// src/middleware.ts 核心逻辑
import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(request: NextRequest) {
  // 1. 检查 cookie 中是否已有手动选择的语言
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  
  if (!cookieLocale && request.geo) {
    // 2. 无手动选择时，通过 IP 地理位置判断
    const country = request.geo.country;
    const detectedLocale = country === 'CN' ? 'zh' : 'en';
    // 将检测结果写入 cookie 供 next-intl 使用
    const response = NextResponse.redirect(request.url);
    response.cookies.set('NEXT_LOCALE', detectedLocale);
    return response;
  }
  
  // 使用 next-intl 的 middleware
  const handleI18nRouting = createMiddleware({
    locales: ['en', 'zh'],
    defaultLocale: 'en',
    localeDetection: true
  });
  
  return handleI18nRouting(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
```

### 编辑器核心流程

```
Landing Page → [Get Started] → 编辑器页面 → 上传图片 → 选择编辑功能
→ 输入参数 → Mock AI 处理（延迟+进度模拟） → 显示结果 → Before/After对比 → 下载
```

### 状态管理设计

使用 Zustand Store 管理编辑器核心状态：

```typescript
interface EditorState {
  // 图片状态
  originalImage: File | null;
  originalImageUrl: string | null;
  editedImageUrl: string | null;
  
  // 编辑模式
  editMode: 'replace' | 'add' | 'delete' | 'recolor';
  
  // 区域选择
  selectionBox: { x: number; y: number; width: number; height: number } | null;
  
  // 处理状态
  isProcessing: boolean;
  progress: number;
  
  // 对比模式
  showCompare: boolean;
  
  // 操作
  setOriginalImage: (file: File) => void;
  setEditedImage: (url: string) => void;
  setEditMode: (mode: EditMode) => void;
  setSelectionBox: (box: SelectionBox | null) => void;
  setProcessing: (processing: boolean) => void;
  setProgress: (progress: number) => void;
  reset: () => void;
}
```

### Mock AI 引擎

搭建 Mock 引擎模拟真实处理，与真实 AI 引擎实现同一接口：

- **延迟模拟**: 随机 1-3 秒等待
- **进度模拟**: 生成 10%-100% 脉冲进度条动画
- **效果模拟**: Canvas 绘制叠加层模拟编辑效果
- **接口抽象**: `AiEngine` 接口 + `MockAiEngine` 实现 + `RealAiEngine`（后续实现）

### API 接口设计（预留）

```
POST /api/edit-text
Request: { imageBase64: string, editType: 'replace'|'add'|'delete'|'recolor', params: {...} }
Response: { editedImageBase64: string, success: boolean, error?: string }
```

### 性能与安全

- **性能**: Landing Page 使用 SSR 优化 SEO；编辑器组件隔离为 'use client'；Zustand 按需订阅避免不必要重渲染；图片上传前压缩（Max 4MB）
- **安全**: 文件类型校验（仅接受 image/jpeg, image/png, image/webp）；文件大小限制；用户输入转义防 XSS；CSP 配置；Cookie 设置 SameSite 和 HttpOnly（语言 cookie 除外）

## 目录结构

```
edit-text-ai/
├── .env.local                        # 环境变量
├── next.config.ts                    # Next.js 配置（含 next-intl 插件）
├── tailwind.config.ts                # Tailwind 配置
├── tsconfig.json                     # TypeScript 配置
├── package.json                      # 依赖管理
├── public/
│   └── images/
│       ├── hero-before.png           # Hero Before 示例图
│       └── hero-after.png            # Hero After 示例图
├── src/
│   ├── app/
│   │   ├── globals.css               # [NEW] 全局样式
│   │   ├── [locale]/
│   │   │   ├── layout.tsx            # [NEW] 本地化根布局（组件 + 字体）
│   │   │   ├── page.tsx              # [NEW] Landing Page（首页）
│   │   │   └── editor/
│   │   │       └── page.tsx          # [NEW] 编辑器页面
│   │   └── api/
│   │       └── edit-text/
│   │           └── route.ts          # [NEW] 编辑文字 API（Mock 实现）
│   ├── components/
│   │   ├── LanguageSwitcher.tsx      # [NEW] 语言切换组件
│   │   ├── landing/
│   │   │   ├── Header.tsx            # [NEW] 顶部导航栏（含语言切换）
│   │   │   ├── Hero.tsx              # [NEW] Hero 区域
│   │   │   ├── FeatureCards.tsx      # [NEW] 功能卡片区域
│   │   │   ├── HowToUse.tsx          # [NEW] 使用指南
│   │   │   ├── WhyChooseUs.tsx       # [NEW] 产品优势
│   │   │   ├── FAQ.tsx               # [NEW] FAQ 区域
│   │   │   └── Footer.tsx            # [NEW] 底部 Footer
│   │   ├── editor/
│   │   │   ├── ImageUploader.tsx     # [NEW] 图片上传组件（拖拽/点击）
│   │   │   ├── EditorCanvas.tsx      # [NEW] 编辑画布（显示图片+区域选择）
│   │   │   ├── EditToolbar.tsx       # [NEW] 编辑工具栏（功能切换标签）
│   │   │   ├── EditPanel.tsx         # [NEW] 编辑参数面板（表单+颜色选择）
│   │   │   ├── ProcessButton.tsx     # [NEW] 处理按钮+进度条
│   │   │   ├── CompareView.tsx       # [NEW] Before/After 对比组件
│   │   │   └── DownloadButton.tsx    # [NEW] 下载按钮
│   │   └── ui/                       # [NEW] shadcn/ui 基础组件
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── tabs.tsx
│   │       ├── slider.tsx
│   │       ├── progress.tsx
│   │       ├── accordion.tsx
│   │       └── input.tsx
│   ├── messages/
│   │   ├── en.json                   # [NEW] 英文翻译文件
│   │   └── zh.json                   # [NEW] 中文翻译文件
│   ├── stores/
│   │   └── editor-store.ts           # [NEW] Zustand 编辑器状态管理
│   ├── services/
│   │   ├── ai-engine.ts              # [NEW] AI 引擎接口定义（抽象接口）
│   │   └── mock-ai-engine.ts         # [NEW] Mock AI 引擎实现
│   ├── lib/
│   │   ├── image-utils.ts            # [NEW] 图片处理工具函数
│   │   └── constants.ts              # [NEW] 常量定义和配置
│   ├── types/
│   │   └── editor.ts                 # [NEW] 编辑器类型定义
│   ├── i18n.ts                       # [NEW] next-intl 请求配置
│   └── middleware.ts                 # [NEW] Locale 检测中间件（Cookie > IP Geo > 默认）
└── .gitignore
```

## 设计风格（不变）

采用**简洁现代 + 科技感**的设计语言，参考 Refont.ai 的极简美学，整体使用深色主题（Dark Mode First），搭配亮紫色品牌色（#6366F1）和毛玻璃效果。

## 设计风格

采用简洁现代 + 科技感的设计语言，深色主题（Dark Mode First），搭配亮紫色品牌色和毛玻璃效果。整体界面干净、清晰、有层次感，营造专业可信赖的产品形象。

### 页面规划（共 2 个核心页面）

#### 1. Landing Page（产品首页）

从上到下的页面块设计：

1. **顶部导航栏（Header）**：Logo + 导航链接（Features / How to Use / FAQ）+ 语言切换器 + "Get Started" CTA 按钮。固定顶部，背景半透明毛玻璃效果（backdrop-blur），滚动时添加底部阴影。语言切换器使用下拉选择器，展示中英文国旗/语言名称。

2. **Hero 区域**：全宽深色渐变背景（#0F0F1A → #1A1A2E）。左侧主标题（48px，粗体，白色），副标题描述 AI 如何在数秒内完成图片文字编辑（18px，浅灰色）。左侧下方 CTA 按钮"Upload Your Image"（紫色渐变背景）。右侧嵌入 Before/After 滑动对比组件，展示编辑前后效果。

3. **使用场景标签区域**：浅色文字标签展示使用场景（电商产品图、社交媒体海报、广告横幅、证件文档等），水平居中排列，带有小型图标。

4. **功能卡片区域（FeatureCards）**：4 个卡片网格布局（2x2），分别展示替换文字、添加文字、删除文字/Logo、更改颜色。每个卡片包含 SVG 图标（紫色渐变色）、功能标题（20px，粗体）、简短描述（14px，灰色）、"Try Now" 按钮。悬停时卡片上浮 4px 并增强阴影。

5. **使用指南区域（HowToUse）**：3 个步骤水平排列（Step 1: 上传图片 → Step 2: 描述更改 → Step 3: 下载结果）。圆形编号（紫色背景）+ 标题（18px）+ 描述（14px）。步骤间虚线连接线。移入时从下方淡入动画。

6. **Why Choose Us 区域**：4 个优势点网格布局（2x2）。AI-Powered、Easy to Use、Fast & Efficient、Free Online。包含小图标 + 标题 + 说明。

7. **FAQ 区域**：使用 Accordion 折叠组件，点击问题标题展开答案，平滑高度动画。

8. **Footer**：深色背景，版权信息 + 联系邮箱 + 社交图标。

#### 2. 编辑器页面（/editor）

1. **顶部导航栏**：精简版 Logo + "Back to Home" + 语言切换器（左），当前操作状态提示（右）。
2. **上传阶段（ImageUploader）**：虚线边框区域（圆角 16px），中心上传图标 + 拖拽提示文字。拖入文件时边框变紫色实线高亮。
3. **编辑阶段（双栏布局）**：左栏深色背景显示图片+可拖拽矩形选择框；右栏 320px 侧边面板含功能切换标签（替换/添加/删除/改色）+ 动态参数区域 + 全宽紫色渐变 Process 按钮。
4. **结果展示阶段**：双栏并排对比 + 拖拽滑动比较器 + 下载/重编按钮。

### 交互细节

- 所有按钮 hover/active 状态反馈（背景色变化 + 缩放微动效）
- 功能卡片悬停上浮动画：translateY(-4px) + box-shadow 增强，transition 0.3s ease
- 步骤切换有 opacity + translateY 淡入动画
- 图片拖拽上传悬停时边框变色、背景色微变
- AI 处理时脉冲进度条动画 + "AI is editing..." 逐字动画
- 编辑器功能切换 Tabs 有底部滑动指示器动画
- Before/After 对比拖拽时显示跟随分割线的引导线

### 响应式设计

- 桌面端 (>1024px)：全宽布局，多列展示，编辑器双栏
- 平板端 (768-1024px)：适当缩小间距，功能卡片 2x2，编辑器单栏
- 移动端 (<768px)：功能卡片单列，编辑器单栏（画布在上，控制面板在下），导航折叠汉堡菜单

## Agent Extensions

### Skill

- **frontend-patterns**: 用于指导 React/Next.js 组件设计模式、Zustand Store 设计、UI 最佳实践和性能优化。在编辑器和 Landing Page 组件实现阶段使用。
- **coding-standards**: 用于确保 TypeScript 代码风格统一、类型安全、命名规范。在整个开发过程中持续使用。
- **microcopy**: 用于撰写中英文双语 UI 文案、按钮文字、错误提示、空状态说明、FAQ 内容。生成 `messages/en.json` 和 `messages/zh.json` 翻译文件内容时使用。
- **deployment-patterns**: 用于 Vercel 部署的最后阶段，配置 next-intl（next.config.ts 插件）、环境变量管理、生产就绪检查。
- **security-review**: 在项目收尾阶段用于全面安全检查，包括文件上传验证（类型/MIME/大小）、XSS 防护、CSP 配置、Cookie 安全设置、API 路由安全等。
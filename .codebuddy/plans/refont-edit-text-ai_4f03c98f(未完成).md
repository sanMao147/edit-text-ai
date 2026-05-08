---
name: refont-edit-text-ai
overview: 基于 Next.js + TailwindCSS 全栈重构一个类似 Refont.ai 的在线 AI 图片文字编辑工具，第一期用 mock 数据搭建完整 UI 流程，后续接入 AI API，部署到 Vercel。
design:
  architecture:
    component: shadcn
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
    content: 使用 create-next-app 初始化 Next.js 14 + TypeScript 项目，安装 TailwindCSS、shadcn/ui、Zustand、react-dropzone 等依赖
    status: pending
  - id: setup-types-stores
    content: 使用 [skill:coding-standards] 创建类型定义、Zustand Store 和 AI 引擎抽象接口；使用 [skill:microcopy] 定义 UI 文案常量和 FAQ 数据
    status: pending
    dependencies:
      - init-project
  - id: create-landing-page
    content: 使用 [skill:frontend-patterns] 构建 Landing Page：Header、Hero、FeatureCards、HowToUse、WhyChooseUs、FAQ、Footer 完整页面
    status: pending
    dependencies:
      - init-project
  - id: create-editor-page
    content: 使用 [skill:frontend-patterns] 构建编辑器页面：ImageUploader、EditorCanvas、EditToolbar、EditPanel、ProcessButton、CompareView、DownloadButton
    status: pending
    dependencies:
      - setup-types-stores
  - id: implement-mock-ai
    content: 实现 Mock AI 引擎（mock-ai-engine.ts）和 API 路由（api/edit-text），模拟延迟、进度和编辑效果
    status: pending
    dependencies:
      - setup-types-stores
  - id: wire-workflow
    content: 串联完整工作流：上传→编辑参数→Mock 处理→结果展示→对比→下载，处理边界情况和错误状态
    status: pending
    dependencies:
      - create-editor-page
      - implement-mock-ai
  - id: polish-deploy
    content: 使用 [skill:microcopy] 优化文案，使用 [skill:security-review] 安全审查，使用 [skill:deployment-patterns] 配置 Vercel 部署
    status: pending
    dependencies:
      - create-landing-page
      - wire-workflow
---

## 产品概述

基于 Refont.ai 的 "Edit Text in Image" 产品理念，完整重构一个在线 AI 图片文字编辑工具。产品定位为一款面向非专业用户的、强调极致易用性的在线图片文字编辑工具，核心亮点是用自然语言驱动编辑操作，将复杂的 PS 操作简化为"上传-描述-下载"三个步骤。

## 核心功能

- **图片上传**：支持点击上传和拖拽上传，接受常见图片格式（JPG、PNG、WebP）
- **替换图片文字**：用户选择图片中的文字区域，输入新文字内容，AI 替换并保持原风格
- **添加新文字**：在图片上添加自定义文字，支持自定义内容、位置和样式
- **删除文字/Logo**：擦除图片中的水印、Logo 或标签文字
- **更改文字颜色**：修改图片中文字的颜色
- **Before/After 对比**：编辑前后的效果对比展示
- **编辑结果下载**：下载编辑后的图片
- **使用指南展示**：清晰的"三步使用教程"(上传→描述→下载)
- **产品 Landing Page**：包含 Hero 区域、功能卡片、使用教程、产品优势等营销内容

## 第一期范围

- 搭建完整 UI 界面和交互流程
- 所有 AI 编辑功能使用 Mock 数据模拟效果
- 后端预留 AI API 接口，后续可替换为真实的 AI 模型
- 完整的"上传→编辑→下载"用户流程

## 技术栈

- **前端框架**：Next.js 14 (App Router) + TypeScript
- **样式方案**：Tailwind CSS + shadcn/ui 组件库
- **状态管理**：Zustand（轻量级，适合图片编辑场景）
- **文件上传**：原生 File API + react-dropzone（拖拽上传）
- **图片处理**：Canvas API（预览、裁剪、对比展示）+ html-to-image（截图下载）
- **前后端通信**：Next.js API Routes
- **部署**：Vercel

---

## 实现方案

### 整体架构

项目采用 Next.js App Router 全栈架构，分两大模块：

1. **Landing Page 模块**（SSR）：产品营销首页
2. **编辑器工作流模块**（CSR）：上传 → 编辑 → 下载核心流程
3. **Mock AI 引擎**：模拟 AI 编辑的隔离层，实现与真实 AI 引擎相同的接口
4. **API 层**：Next.js API Routes，预留 AI 模型调用接口

### 页面路由

```
/              - Landing Page（首页）
/editor        - 编辑器页面（上传 + 编辑 + 下载）
/api/edit-text - AI 编辑接口（第一期 Mock，后续替换）
```

### 编辑器核心流程

```
Landing Page → [Get Started] → 编辑器页面 → 上传图片 → 选择编辑功能
→ 输入参数 → Mock AI 处理（延迟+进度模拟） → 显示结果 → Before/After对比 → 下载
```

### 状态管理设计

使用 Zustand Store 管理编辑器核心状态：

- 图片状态（原图、编辑后结果图）
- 编辑模式（替换/添加/删除/改色）
- 区域选择（选中文字框坐标）
- 处理状态（是否处理中、进度百分比）
- 对比模式（是否开启 Before/After）

### Mock AI 引擎

第一期搭建 Mock 引擎模拟真实处理：

- **延迟模拟**：随机 1-3 秒等待
- **进度模拟**：生成 10%-100% 脉冲进度条动画
- **效果模拟**：Canvas 绘制叠加层模拟编辑效果（替换文字绘制新文字覆盖、删除用相邻色填充、改色做色调调整）
- **关键设计**：Mock 引擎和真实 AI 引擎实现同一接口，后续无缝替换

### API 接口设计（预留）

```
POST /api/edit-text
Request: { image: File, editType: 'replace'|'add'|'delete'|'recolor', params: {...} }
Response: { editedImage: Base64, success: boolean, error?: string }
```

### 性能与安全

- **性能**：Landing Page 使用 SSR 优化 SEO 和首屏加载；编辑器组件隔离为 'use client'；Zustand 按需订阅避免不必要的重渲染；图片上传前压缩（Max 4MB）
- **安全**：文件类型校验（仅接受 image/jpeg, image/png, image/webp）；文件大小限制；用户输入转义防 XSS；CSP 配置；AI API Key 存储在 .env.local，不提交 Git

---

## 目录结构

```
edit-text-ai/
├── .env.local                     # 环境变量
├── next.config.ts                 # Next.js 配置
├── tailwind.config.ts             # Tailwind 配置
├── tsconfig.json                  # TypeScript 配置
├── package.json                   # 依赖管理
├── public/
│   └── images/
│       ├── hero-before.png        # Hero Before 示例图
│       └── hero-after.png         # Hero After 示例图
├── src/
│   ├── app/
│   │   ├── layout.tsx             # [NEW] 根布局（Header + Footer + 字体）
│   │   ├── page.tsx               # [NEW] Landing Page（首页）
│   │   ├── globals.css            # [NEW] 全局样式
│   │   ├── editor/
│   │   │   └── page.tsx           # [NEW] 编辑器页面
│   │   └── api/
│   │       └── edit-text/
│   │           └── route.ts       # [NEW] 编辑文字 API（Mock 实现）
│   ├── components/
│   │   ├── landing/
│   │   │   ├── Header.tsx         # [NEW] 顶部导航栏
│   │   │   ├── Hero.tsx           # [NEW] Hero 区域
│   │   │   ├── FeatureCards.tsx    # [NEW] 功能卡片区域
│   │   │   ├── HowToUse.tsx       # [NEW] 使用指南
│   │   │   ├── WhyChooseUs.tsx    # [NEW] 产品优势
│   │   │   ├── FAQ.tsx            # [NEW] FAQ 区域
│   │   │   └── Footer.tsx         # [NEW] 底部 Footer
│   │   ├── editor/
│   │   │   ├── ImageUploader.tsx  # [NEW] 图片上传组件（拖拽/点击）
│   │   │   ├── EditorCanvas.tsx   # [NEW] 编辑画布（显示图片+区域选择）
│   │   │   ├── EditToolbar.tsx    # [NEW] 编辑工具栏（功能切换标签）
│   │   │   ├── EditPanel.tsx      # [NEW] 编辑参数面板（表单+颜色选择）
│   │   │   ├── ProcessButton.tsx  # [NEW] 处理按钮+进度条
│   │   │   ├── CompareView.tsx    # [NEW] Before/After 对比组件
│   │   │   └── DownloadButton.tsx # [NEW] 下载按钮
│   │   └── ui/                    # [NEW] shadcn/ui 基础组件
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── tabs.tsx
│   │       ├── slider.tsx
│   │       ├── progress.tsx
│   │       ├── accordion.tsx
│   │       └── input.tsx
│   ├── stores/
│   │   └── editor-store.ts        # [NEW] Zustand 编辑器状态管理
│   ├── services/
│   │   ├── ai-engine.ts           # [NEW] AI 引擎接口定义（抽象接口）
│   │   └── mock-ai-engine.ts      # [NEW] Mock AI 引擎实现
│   ├── lib/
│   │   ├── image-utils.ts         # [NEW] 图片处理工具函数
│   │   └── constants.ts           # [NEW] 常量定义和配置
│   └── types/
│       └── editor.ts              # [NEW] 编辑器类型定义
├── skills/                        # Skill 配置文件
└── .gitignore
```

## 设计风格

采用**简洁现代 + 科技感**的设计语言，参考 Refont.ai 的极简美学，营造专业、可信赖的产品形象。整体使用深色主题（Dark Mode First），搭配亮紫色品牌色和毛玻璃效果，打造科技感视觉体验。

---

### 页面规划（共 2 个核心页面）

#### 1. Landing Page（产品首页）

从上到下的页面块设计：

1. **顶部导航栏（Header）**：Logo + 导航链接（Features / How to Use / FAQ）+ "Get Started" CTA 按钮。固定顶部，背景半透明毛玻璃效果（backdrop-blur），滚动时添加底部阴影。

2. **Hero 区域**：全宽深色渐变背景（#0F0F1A → #1A1A2E）。左侧主标题 "Edit Text in Image Online"（48px，粗体，白色），副标题描述 AI 如何在数秒内完成图片文字编辑（18px，浅灰色）。左侧下方 CTA 按钮 "Upload Your Image"（紫色渐变背景）。右侧嵌入 Before/After 滑动对比组件，展示编辑前后效果。

3. **信任标识/使用场景区域**：浅色文字标签展示使用场景（电商产品图、社交媒体海报、广告横幅、证件文档等），水平居中排列，带有小型图标。

4. **功能卡片区域（FeatureCards）**：4 个卡片网格布局（2x2），分别展示：替换文字（Replace Text）、添加文字（Add Text）、删除文字（Remove Text/Logo）、更改颜色（Change Color）。每个卡片包含：SVG 图标（顶部，紫色系渐变色）、功能标题（20px，粗体）、简短描述（14px，灰色）、"Try Now" 按钮。悬停时卡片上浮 4px 并增强阴影，带有 transition 动画。

5. **使用指南区域（HowToUse）**：3 个步骤水平排列（Step 1: 上传图片 → Step 2: 描述更改 → Step 3: 下载结果）。每个步骤包含圆形编号（紫色背景）、标题（18px）、描述文字（14px）。步骤间用虚线连接线。每个步骤卡片带微动效（移入时从下方淡入）。

6. **Why Choose Us 区域**：4 个优势点网格布局（2x2）。AI-Powered、Easy to Use、Fast & Efficient、Free Online。每个优势包含小图标 + 标题 + 简要说明。

7. **FAQ 区域**：使用 Accordion 折叠组件展示常见问题列表。点击问题标题展开答案，切换时带平滑高度动画。

8. **Footer**：深色背景，版权信息 + 联系邮箱 email@refont.ai + 社交图标。

---

#### 2. 编辑器页面（/editor）

1. **顶部导航栏**：精简版 Logo + "Back to Home" 链接（左），当前操作状态提示（右，如 "Step 1: Upload Image"）。

2. **上传阶段（ImageUploader）**：全屏居中虚线边框区域（dashed border，圆角 16px），中心上传图标 + "Drag & Drop your image here" + "or click to browse" 文字。拖拽文件到区域时边框变为紫色实线并高亮。下方提示支持的格式（JPG, PNG, WebP）和大小限制。

3. **编辑阶段（双栏布局）**：

- **左栏（EditorCanvas）**：深色背景，显示原始图片自适应居中。用户可在图片上拖拽生成矩形选择框（选中文字区域），选中后有半透明紫色遮罩（#6366F1 30%透明度）+ 四角拖拽手柄（resize handles）。支持缩放和平移。
- **右栏（EditPanel）**：宽度约 320px 的侧边面板。
    - 顶部：4 个功能切换标签按钮（替换/添加/删除/改色），选中标签有下划线滑动指示器动画。
    - 中间参数区域（根据所选功能动态切换）：
    - 替换模式：输入框 "Original Text" + "New Text"，文字颜色预览
    - 添加模式：输入框 "Enter Text" + 位置选择（预设 9 宫格位置）+ 颜色选择器
    - 删除模式：提示 "Click on the text area you want to remove" + 确认按钮
    - 改色模式：颜色选择器（预设 8 色 + 自定义取色器）
    - 底部："Process" 按钮（紫色渐变，全宽），处理时显示脉冲进度条和 "AI is processing..." 动画文字。

4. **结果展示阶段**：

- 双栏并排：左图（Original）右图（Edited），上方有标签标识
- Before/After 滑动对比组件（CompareView）：中间可拖拽的分割线，左右滑动对比效果
- 操作按钮组："Download Image"（主要按钮）+ "Edit Again"（次要按钮）
- "Download Image" 点击触发下载，显示短暂成功提示

---

### 交互细节

- 所有按钮有 hover 和 active 状态反馈（背景色变化 + 缩放微动效）
- 功能卡片悬停上浮动画：transform: translateY(-4px) + box-shadow 增强，transition 0.3s ease
- 步骤切换有 opacity + translateY 淡入动画
- 图片拖拽上传 hover 时区域边框变色、背景色微变
- AI 处理时脉冲进度条动画 + "AI is editing..." 逐字动画
- 编辑器功能切换 Tabs 有底部滑动指示器动画
- Before/After 对比拖拽时显示跟随分割线的引导线

### 响应式设计

- **桌面端 (>1024px)**：全宽布局，Landing Page 多列展示，编辑器双栏布局
- **平板端 (768-1024px)**：适当缩小间距和字体，功能卡片 2x2 布局保持，编辑器改为单栏滚动
- **移动端 (<768px)**：功能卡片单列堆叠，编辑器单栏布局（画布在上，控制面板在下），导航折叠为汉堡菜单

## Agent Extensions

### Skill

- **frontend-patterns**: 用于指导 React/Next.js 组件设计模式、状态管理策略（Zustand Store 设计）、UI 最佳实践和性能优化。在编辑器组件实现阶段使用，确保代码符合现代 React 最佳实践。
- **coding-standards**: 用于确保 TypeScript 代码风格统一、类型安全（interface vs type 选择、严格模式配置）、命名规范。在整个开发过程中持续使用。
- **microcopy**: 用于撰写 Landing Page 和编辑器的 UI 文案、按钮文字、错误提示、空状态说明、FAQ 内容等。中英文双语支持，确保文案风格一致、专业清晰。
- **deployment-patterns**: 用于 Vercel 部署的最后阶段，包括 next.config.ts 配置优化、环境变量管理、CI/CD 流程配置、健康检查和生产就绪检查。
- **security-review**: 在项目收尾阶段用于全面安全检查，包括文件上传验证（类型/MIME/大小）、XSS 防护、CSP 内容安全策略配置、环境变量保护、API 路由安全等。
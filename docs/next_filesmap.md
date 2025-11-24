# 🗂️ 项目文件夹结构深度解析图 (Project Folder Structure Map)

本文档旨在提供一份“像素级”的文件夹结构说明，帮助开发者彻底理解 Next.js 项目构建产物 `.next` 文件夹的每一个细节。

> **注意**：`.next` 文件夹是 Next.js 执行 `next build` 或 `next dev` 后生成的构建产物目录。它包含了运行应用所需的所有代码（服务端与客户端）、静态资源、缓存以及构建清单。**永远不要手动修改此文件夹中的内容**，因为它们会被下一次构建覆盖。

## 📦 `.next/` (根构建目录)

这是 Next.js 的心脏，包含了从源码编译而来的所有可执行文件和资源。

### 📄 核心清单文件 (Manifests)
这些 JSON 文件是 Next.js 运行时的“导航图”，告诉服务器和客户端如何加载资源。

- **`build-manifest.json`**
    - **作用**：这是 Pages Router (传统的 `pages/` 目录) 的资源映射表。它列出了每个页面路由（如 `/about`）在客户端加载时所需的特定 JavaScript chunk 文件（JS 块）。即使你主要使用 App Router，这个文件通常也会存在以保持兼容性或处理默认错误页面。
- **`app-build-manifest.json`**
    - **作用**：**App Router 专用**。它是 App Router (`app/` 目录) 的资源映射表。它告诉 Next.js 当用户访问某个 App 路由时，客户端需要下载哪些 JS 和 CSS 文件。
- **`react-loadable-manifest.json`**
    - **作用**：支持 `next/dynamic`（动态导入）。它记录了所有被动态导入组件的 ID 和对应的物理文件路径，确保服务端渲染（SSR）时能预加载正确的代码块，防止客户端水合（Hydration）不匹配。
- **`package.json`**
    - **作用**：在构建输出中生成的简化版 `package.json`，主要用于指示该构建产物是 module 类型（`"type": "commonjs"` 或 `"module"`），这影响 Node.js 如何加载 `server` 目录下的 `.js` 文件。
- **`trace`**
    - **作用**：构建性能追踪文件。用于分析构建过程中的耗时瓶颈，通常用于调试构建速度问题。

---

## 🏗️ `.next/server/` (服务端运行时)

**这是“后端”的大脑。** 这里存放的是经过编译、专门在 Node.js 环境中运行的代码。当请求到达服务器时，Next.js 执行这里的代码来生成 HTML 或 API 响应。

### 📂 子目录
- **`app/`**
    - **重要性**：⭐⭐⭐⭐⭐ (App Router 核心)
    - **作用**：包含 App Router (`app/` 目录) 下所有路由的编译后文件。
    - **细节**：
        - 每个路由（如 `app/page.tsx`）会被编译成 `.js` 文件（服务端逻辑）和 `.html` 文件（预渲染内容，如果是静态生成的）。
        - 包含 React Server Components (RSC) 的渲染逻辑。
- **`static/`** (注意：这是 `server/static`)
    - **作用**：存放构建时生成的静态资源，这些资源需要在服务端渲染期间被访问。
- **`vendor-chunks/`**
    - **作用**：存放被打包到服务端的第三方依赖库（node_modules）。Next.js 会将常用的库提取出来，避免每个页面重复打包，减小体积。

### 📄 关键服务端文件
- **`middleware.js`**
    - **作用**：编译后的中间件代码。这是请求进入应用的第一道关卡，用于处理重定向、重写或修改 headers。
- **`middleware-manifest.json`**
    - **作用**：中间件的配置清单，定义了中间件的匹配路径（matchers）和运行时行为。
- **`pages-manifest.json`**
    - **作用**：Pages Router 的路由表。映射 URL 路径（如 `/api/hello`）到具体的服务端文件（如 `pages/api/hello.js`）。
- **`app-paths-manifest.json`**
    - **作用**：**App Router 的路由表**。映射 URL 路径到 `server/app/` 下的具体文件路径。
- **`next-font-manifest.json`** / **`.js`**
    - **作用**：记录 `next/font` 优化的字体信息。它包含了字体的加载策略、预加载 URL 等，确保字体加载不会导致布局偏移（CLS）。
- **`webpack-runtime.js`**
    - **作用**：服务端环境的 Webpack 运行时引导代码，负责模块的加载和解析。

---

## 🎨 `.next/static/` (客户端静态资源)

**这是“前端”的躯体。** 这个目录下的所有文件都会被公开对外服务（通常通过 `/_next/static/` 路径）。它们直接发送给用户的浏览器。

### 📂 子目录
- **`chunks/`**
    - **作用**：存放经过 Code Splitting（代码分割）后的 JavaScript 文件块。
    - **细节**：
        - `main-[hash].js`: 核心框架代码（React, Next.js runtime）。
        - `framework-[hash].js`: 其他常用库。
        - `[id]-[hash].js`: 特定页面或组件的代码。
        - 这种分割确保用户只下载当前页面所需的代码。
- **`css/`**
    - **作用**：存放所有编译后的 CSS 文件。
    - **细节**：Tailwind CSS 的样式、全局 CSS 和 CSS Modules 最终都会被压缩合并到这里。文件名通常带有哈希值以利用浏览器缓存。
- **`media/`**
    - **作用**：存放通过 `import img from './image.png'` 方式引入的静态图片、字体或其他媒体文件。文件名会被重命名为哈希值。
- **`webpack/`**
    - **作用**：客户端的 Webpack 运行时清单，用于在浏览器端动态加载 chunk。

---

## ⚡ `.next/cache/` (构建缓存)

**这是“加速器”。** 这个目录用于存储构建过程中的中间结果。如果你删除了这个目录，下一次 `next build` 将会变慢，因为失去了增量编译的能力。

### 📂 子目录
- **`fetch-cache/`**
    - **作用**：**Data Cache (数据缓存)**。
    - **细节**：Next.js 扩展了 `fetch` API。如果你在服务端组件中使用 `fetch` 且未禁用缓存，响应数据会以 JSON 文件的形式存储在这里。这使得 Next.js 可以在多次请求之间重用 API 响应。
- **`swc/`**
    - **作用**：SWC 编译器的缓存。SWC 是 Next.js 使用的基于 Rust 的超快编译器。
- **`webpack/`**
    - **作用**：Webpack 的文件系统缓存。它存储了模块解析和转换的结果，极大加快二次构建速度。
- **`eslint/`**
    - **作用**：ESLint 检查结果的缓存。避免对未修改的文件重复运行 Lint 检查。
- **`images/`** (主要在开发模式 `next dev` 下可见)
    - **作用**：存储通过 `next/image` 组件优化后的图片变体（不同尺寸、格式）。在生产环境中，这通常由 Image Optimization API 动态处理或配合 CDN。
- **`.tsbuildinfo`**
    - **作用**：TypeScript 编译器的增量构建信息，用于加速类型检查。

---

## 🧩 `.next/types/` (类型定义)

- **作用**：存放 Next.js 自动生成的 TypeScript 类型定义文件。
- **细节**：例如 `app/layout.tsx` 或 `page.tsx` 的 props 类型、`Link` 组件的路由自动补全类型等，都可能引用这里的定义，确保开发时的类型安全。

---
*Created by Gemini for Caliblog Project Documentation*

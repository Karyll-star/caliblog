# Cali 个人博客网站 (Cali's Blog)

这是 [Cali](https://cali.so/) 个人博客网站的源代码仓库。这是一个基于现代 Web 技术栈构建的全栈应用，集成了博客内容管理、作品集展示、即时通讯（留言板/评论）、以及邮件订阅服务。

## ✨ 特性 (Features)

- **🎨 现代化 UI/UX**: 使用 Tailwind CSS 和 Framer Motion 构建的响应式、流畅的交互界面。
- **📝 博客系统**: 基于 Sanity Headless CMS 的文章管理，支持 Markdown、代码高亮、阅读时间统计。
- **💬 互动功能**:
  - **留言板 (Guestbook)**: 访客可以留言互动。
  - **评论系统**: 文章支持嵌套评论。
  - **鉴权**: 集成 Clerk 进行用户身份验证。
- **📮 邮件订阅**: 支持 Newsletter 订阅，使用 React Email 编写邮件模板，通过 Resend 发送。
- **🛡️ 管理后台**: 内置管理员面板，用于管理评论、订阅者和发送 Newsletter。
- **⚡ 高性能**: 基于 Next.js App Router，利用服务端组件 (RSC) 和边缘计算优化性能。
- **📊 数据库**: 使用 Drizzle ORM 操作 PostgreSQL 数据库，Upstash Redis 用于缓存和限流。

## 🛠️ 技术栈 (Tech Stack)

采用**clerk**实现用户登录认证（轻量化、样式优雅、快速部署）
blog内容采用**sanity**，相较于wordpress更现代化且无需私人服务器部署，同时部分网站设置也储存在其中
**neon**为留言板提供数据库
Upstash Redis 在本项目中主要承担两个核心功能: API 限流  与  数据缓存与统计 作用: 存储一些不需要持久化到 PostgreSQL 数据库的实时数据。


>>| 特性 | Neon (Serverless PostgreSQL) | Sanity (Headless CMS) |
| :--- | :--- | :--- |
| **核心功能** | **关系型数据库** | **内容管理系统** |
| **存储的数据类型** | **结构化数据**：行和列，类型严格（如数字、字符串、日期）。例如：用户表、产品表。 | **半结构化/富文本内容**：灵活的 JSON 对象，包含文本、图片、视频、自定义模块等。例如：一篇图文并茂的博客文章。 |
| **主要用户** | **开发者 (Developer)** | **内容编辑、市场人员 (Content Editor)** |
| **交互方式** | - **后端代码**通过 SQL 查询或客户端库 (ORM) 进行读写。<br>- 直接连接数据库进行管理。 | - **编辑**通过 Sanity Studio (一个可视化后台) 进行内容的增删改查。<br>- **前端代码**通过 API (GROQ 或 GraphQL) 读取内容并展示。 |
| **数据模型定义** | 通过 SQL `CREATE TABLE` 语句或 ORM 的迁移文件来定义表结构。 | 通过 JavaScript/TypeScript 代码定义 Schema (内容模型)，这会自动生成 Sanity Studio 中的编辑表单。 |
| **核心价值** | **数据一致性、关系完整性、事务处理、高性能查询**。保证应用核心逻辑的准确和可靠。 | **优秀的编辑体验、内容与代码分离、实时协作、灵活的内容建模**。让内容管理变得轻松高效。 |
| **通俗比喻** | **银行的金库**：结构严谨，安全可靠，存放核心资产，由特定权限的银行职员（代码）操作。 | **图书馆的书架和图书**：内容丰富，易于查找和更新，供读者（网站访客）阅览，由图书管理员（内容编辑）整理。 |



### 核心框架
- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/) & [React Spring](https://www.react-spring.dev/)

### 数据存储 & CMS
- **Database**: [PostgreSQL](https://www.postgresql.org/) (via [Neon](https://neon.tech/))
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **CMS**: [Sanity](https://www.sanity.io/) (用于管理博客文章、项目展示等静态内容)
- **Cache/Rate Limit**: [Upstash Redis](https://upstash.com/)

### 服务与工具
- **Authentication**: [Clerk](https://clerk.com/)
- **Email**: [React Email](https://react.email/) & [Resend](https://resend.com/)
- **Deployment**: [Vercel](https://vercel.com/)
- **Validation**: [Zod](https://zod.dev/)

## 📂 项目结构 (Project Structure)

```
├── app/                # Next.js App Router 路由目录
│   ├── (main)/         # 主要页面布局 (Header, Footer)
│   ├── admin/          # 管理员后台页面
│   ├── api/            # API 路由 (评论, 邮件, Webhooks)
│   └── studio/         # Sanity Studio CMS 界面
├── components/         # React 组件
│   ├── emails/         # 邮件模板组件
│   └── ui/             # 通用 UI 组件
├── config/             # 项目配置文件 (导航, 邮件等)
├── db/                 # 数据库配置
│   ├── schema.ts       # Drizzle 数据库 Schema 定义
│   └── index.ts        # 数据库连接实例
├── emails/             # React Email 模板
├── lib/                # 工具函数库 (API 客户端, 辅助函数)
├── public/             # 静态资源
├── sanity/             # Sanity 配置
│   ├── schemas/        # CMS 内容模型定义 (Post, Project 等)
│   └── env.ts          # Sanity 环境变量
├── env.mjs             # 环境变量类型定义与验证 (t3-oss/env-nextjs)
└── ...配置文件
```

## 🚀 快速开始 (Getting Started)

### 1. 环境准备

确保你的本地环境已安装：
- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/) (包管理工具)

### 2. 获取代码

```bash
git clone <repository-url>
cd caliblog
```

### 3. 安装依赖

```bash
pnpm install
```

### 4. 配置环境变量

复制环境变量示例文件并重命名为 `.env` (或 `.env.local`)：

```bash
cp .env.example .env.local
```

你需要配置以下关键环境变量 (参考 `env.mjs`)：

**数据库 (Neon / PostgreSQL):**
- `DATABASE_URL`: PostgreSQL 连接字符串

**CMS (Sanity):**
- `NEXT_PUBLIC_SANITY_PROJECT_ID`: Sanity 项目 ID
- `NEXT_PUBLIC_SANITY_DATASET`: 数据集名称 (如 production)
- `NEXT_PUBLIC_SANITY_USE_CDN`: 是否使用 CDN (true/false)

**认证 (Clerk):**
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`

**邮件服务 (Resend):**
- `RESEND_API_KEY`: Resend API Key
- `NEXT_PUBLIC_SITE_EMAIL_FROM`: 发件人地址

**缓存 (Upstash Redis):**
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`

**其他:**
- `NEXT_PUBLIC_SITE_URL`: 站点 URL (本地开发填 http://localhost:3000)

### 5. 数据库迁移

使用 Drizzle Kit 推送数据库 Schema 到 Neon/Postgres：

```bash
pnpm db:push
```

### 6. 启动开发服务器

```bash
pnpm dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站。
访问 [http://localhost:3000/studio](http://localhost:3000/studio) 访问 Sanity CMS 内容管理后台。

## 📜 常用脚本 (Scripts)

- `pnpm dev`: 启动 Next.js 开发服务器。
- `pnpm build`: 构建生产环境应用。
- `pnpm start`: 运行构建后的生产应用。
- `pnpm db:generate`: 生成数据库迁移文件 (SQL)。
- `pnpm db:push`: 直接将 Schema 变更推送到数据库。
- `pnpm dev:email`: 启动 React Email 预览服务器 (预览邮件模板)。
- `lint`: 运行 ESLint 代码检查。

## 🚢 部署 (Deployment)

本项目针对 [Vercel](https://vercel.com) 进行了优化。

1. 将代码推送到 GitHub。
2. 在 Vercel 中导入项目。
3. 在 Vercel 项目设置中配置上述所有环境变量。
4. 点击 Deploy。

---
*Built with ❤️ by Cali*
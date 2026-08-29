# Home

一个基于 **Vue 3 + Vite + TypeScript** 的个人主页项目，提供时间展示、一言与常用网站导航等功能。整体使用 Vue Vapor 模式 + JSX 编写，最大化首屏渲染性能。

> 原 fork 自 `imsyy/home`，已通过 Vapor 重写。

## 功能特性

- 载入动画与欢迎文案
- 实时时间与日期展示
- Hitokoto 一言
- 常用网站导航链接（Swiper 轮播）
- 移动端适配
- 自定义光标动画
- 壁纸背景与切换

## 技术栈

- Vue 3.6（Vapor 模式）
- Vite 6
- TypeScript 5
- vue-jsx-vapor（Vue Vapor 模式下的 JSX 编译）
- Pinia（状态管理）
- VueUse
- Tailwind CSS 4
- Sass（SCSS Modules）
- Swiper
- vue-sonner（Toast 通知）

## 本地开发

### 环境要求

- Node.js >= 18（建议使用 LTS）
- pnpm >= 8

### 启动步骤

```bash
# 安装 pnpm（如未安装）
npm install -g pnpm

# 安装依赖
pnpm install

# 启动开发环境
pnpm dev
```

默认会在局域网可访问模式启动（`vite --host`）。

## 构建与预览

```bash
# 类型检查 + 生产构建
pnpm build

# 本地预览构建产物
pnpm preview
```

构建完成后产物位于 `dist/` 目录，可部署到 Nginx、Vercel、Netlify 等静态托管平台。

## 代码质量

```bash
# ESLint 自动修复
pnpm lint

# Prettier 格式化 src 目录
pnpm format

# 仅类型检查
pnpm typecheck
```

## Docker 部署

```bash
# 构建镜像
docker build -t home .

# 启动容器
docker run -p 12445:12445 -d home
```

## 配置说明

### 网站链接

可在 `src/assets/siteLinks.json` 中配置导航链接。

### 社交链接

可在 `src/assets/socialLinks.json` 中配置社交链接。

### 环境变量

复制 `.env.example` 为 `.env` 并按需修改。

## 目录结构（简要）

```text
src/
├── api/                # 接口请求
├── assets/             # 配置型静态数据（链接）
├── components/         # 通用组件
├── store/              # Pinia 状态管理
├── utils/              # 工具函数
└── views/              # 页面视图
```

## License

本项目采用 `MIT` 协议，详见 [LICENSE](./LICENSE)。

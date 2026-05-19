# Home

一个基于 **React + Vite + TypeScript** 的个人主页项目，提供时间展示、一言与常用网站导航等功能。

> 原项目 fork 自 `imsyy/home`，并在技术栈与实现上进行了 React 化改造。

## 功能特性

- 载入动画与欢迎文案
- 实时时间与日期展示
- Hitokoto 一言
- 常用网站导航链接
- 移动端适配

## 技术栈

- React 19
- Vite 8
- TypeScript 6
- Zustand
- Sass
- Sonner

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
# 生产构建
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

可在 `src/assets/siteLinks.json` 中配置导航链接，例如：

```json
{
  "icon": "Blog",
  "name": "博客",
  "link": "https://example.com"
}
```

## 目录结构（简要）

```text
src/
├── api/                # 接口请求
├── assets/             # 配置型静态数据（链接）
├── components/         # 通用组件
├── store/              # Zustand 状态管理
├── utils/              # 工具函数
└── views/              # 页面视图
```

## License

本项目采用 `MIT` 协议，详见 [LICENSE](./LICENSE)。

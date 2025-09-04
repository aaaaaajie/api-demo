# API Demo Monorepo

一个使用 Node.js + React + TypeScript 的 monorepo 演示项目。

## 项目结构

```
api-demo/
├── packages/
│   ├── shared/          # 共享类型定义和工具
│   ├── api/             # Node.js + TypeScript 后端 API
│   └── web/             # React + TypeScript 前端应用
├── package.json         # 根目录 package.json (工作区配置)
├── tsconfig.json        # TypeScript 根配置
└── README.md
```

## 技术栈

- **前端**: React 18 + TypeScript + Vite
- **后端**: Node.js + Express + TypeScript
- **共享**: TypeScript 类型定义
- **工具**: ESLint, npm workspaces, concurrently

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

同时启动前端和后端开发服务器：

```bash
npm run dev
```

- 前端: http://localhost:5173
- 后端: http://localhost:3001

### 构建

```bash
npm run build
```

### 其他命令

```bash
# 类型检查
npm run type-check

# 代码检查
npm run lint

# 修复代码格式
npm run lint:fix

# 清理构建文件
npm run clean
```

## 包说明

### @api-demo/shared
共享的 TypeScript 类型定义和工具函数，供前端和后端共同使用。

### @api-demo/api
基于 Express 的 Node.js 后端 API 服务，提供 RESTful 接口。

### @api-demo/web
基于 React + Vite 的前端单页应用。

## 开发注意事项

1. 所有共享类型应定义在 `@api-demo/shared` 包中
2. API 接口遵循 RESTful 规范
3. 前端组件使用 TypeScript 严格模式
4. 使用 ESLint 保持代码风格一致性

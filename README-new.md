# API Demo - Postman-like API Testing Tool

一个基于 TypeScript 的 monorepo 项目，前端是类似 Postman 的 API 测试工具，支持 React + Node.js 全栈开发。

## 🚀 在线演示

部署到 Vercel: [查看演示](https://your-app-url.vercel.app)

## 📦 项目结构

```
api-demo/
├── packages/
│   ├── shared/          # 共享类型和工具
│   ├── api/            # Node.js + Express API 服务器  
│   └── web/            # React + Vite 前端应用
├── package.json        # 根目录配置
├── vercel.json         # Vercel 部署配置
└── build-vercel.sh     # Vercel 构建脚本
```

## ✨ 功能特性

### 前端 - API 测试工具
- 🎯 **动态块管理** - 添加多个 API 请求块
- 🔧 **完整请求配置** - HTTP 方法、URL、参数、请求头、请求体
- 📝 **数据转换器** - 使用 `data.users` 语法提取响应数据特定层级
- 🎨 **UI 渲染** - 响应数据可渲染为表格、详情或可编辑表单
- 💫 **现代 UI** - 基于 Ant Design 的美观界面

### 后端 - RESTful API
- 🛠️ **Express.js** - 成熟的 Node.js 框架
- 📚 **示例 API** - 用户和任务管理端点
- 🔒 **类型安全** - 完整的 TypeScript 支持

## 🛠️ 开发

```bash
# 安装依赖
npm install

# 启动开发服务器 (前端 + 后端)
npm run dev

# 仅构建前端 (部署用)
npm run build:frontend

# 构建所有包
npm run build

# 清理构建文件
npm run clean
```

**开发地址:**
- 前端: http://localhost:5173
- 后端: http://localhost:3001

## 🚀 部署到 Vercel

1. **连接 GitHub**: 将项目推送到 GitHub 并连接到 Vercel
2. **自动部署**: Vercel 会自动读取 `vercel.json` 配置
3. **构建配置**: 
   - 构建命令: `npm run build:frontend`
   - 输出目录: `packages/web/dist`

## 📖 使用指南

1. **创建 API 块**: 点击 "+ Add block" → "Request API" → "Blank Block"
2. **配置请求**: 
   - 选择 HTTP 方法 (GET、POST、PUT 等)
   - 输入 API URL
   - 在 Params/Headers/Body/Transformer 标签页中配置详细参数
3. **设置数据转换器**: 在 Transformer 标签页使用点号语法提取数据，如:
   - `data` - 提取 response.data
   - `data.users` - 提取 response.data.users
   - `results.0` - 提取数组第一个元素
4. **发送请求**: 点击 "Run" 按钮
5. **渲染 UI**: 在响应面板点击 "Display on UI" 选择渲染模式:
   - **Table** - 数据表格显示
   - **Detail** - 详情描述列表
   - **Form** - 可编辑表单

## 🏗️ 技术栈

- **Frontend**: React 18 + TypeScript + Vite + Ant Design + Axios
- **Backend**: Node.js + Express + TypeScript + CORS
- **Build**: npm workspaces + TypeScript compiler + Vite
- **Deploy**: Vercel + GitHub

## 📝 示例 API

后端提供以下示例端点用于测试：

```bash
# 用户管理
GET    /api/users       # 获取用户列表
GET    /api/users/:id   # 获取用户详情
POST   /api/users       # 创建用户
PUT    /api/users/:id   # 更新用户
DELETE /api/users/:id   # 删除用户

# 任务管理
GET    /api/tasks       # 获取任务列表
GET    /api/tasks/:id   # 获取任务详情
POST   /api/tasks       # 创建任务
PUT    /api/tasks/:id   # 更新任务
DELETE /api/tasks/:id   # 删除任务
```

## 🤝 贡献

1. Fork 项目
2. 创建功能分支: `git checkout -b feature/AmazingFeature`
3. 提交更改: `git commit -m 'Add some AmazingFeature'`
4. 推送分支: `git push origin feature/AmazingFeature`
5. 提交 Pull Request

## 📄 License

MIT License - 查看 [LICENSE](LICENSE) 了解详情。

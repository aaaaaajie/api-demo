#!/bin/bash
set -e

echo "🚀 开始生产环境部署..."

# 检查 Node.js 版本
echo "📋 检查环境..."
node --version
npm --version

# 清理旧的构建文件
echo "🧹 清理旧的构建文件..."
npm run clean

# 安装依赖
echo "📦 安装依赖..."
npm ci --production=false

# 构建所有包
echo "🔨 构建应用..."
npm run build:prod

echo "✅ 构建完成！"
echo ""
echo "📋 生产环境启动选项："
echo "1. 仅启动 API 服务器: npm run start:api"
echo "2. 使用 Docker: docker-compose up --build"
echo "3. 部署到云平台: 查看 README.md"
echo ""
echo "🌐 构建文件位置："
echo "  - API: packages/api/dist/"
echo "  - Web: packages/web/dist/"
echo "  - Shared: packages/shared/dist/"

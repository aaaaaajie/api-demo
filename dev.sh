#!/bin/bash

# 启动开发服务器脚本
echo "🚀 启动 API Demo 开发环境..."

# 检查 Node.js 是否安装
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 未安装，请先安装 Node.js"
    exit 1
fi

# 检查依赖是否安装
if [ ! -d "node_modules" ]; then
    echo "📦 安装依赖..."
    npm install
fi

# 构建共享包
echo "🔧 构建共享包..."
cd packages/shared && npm run build && cd ../..

# 启动开发服务器（前端和后端）
echo "🌟 启动前端和后端服务器..."
npm run dev

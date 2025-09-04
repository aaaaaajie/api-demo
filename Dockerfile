# 多阶段构建 Docker 配置
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./
COPY packages/*/package*.json ./packages/*/

# 安装所有依赖
FROM base AS deps
RUN npm ci --only=production --frozen-lockfile

# 构建阶段
FROM base AS builder
RUN npm ci --frozen-lockfile
COPY . .
RUN npm run build:prod

# 生产环境运行阶段
FROM node:18-alpine AS runner
WORKDIR /app

# 创建非 root 用户
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 apiuser

# 复制构建产物和依赖
COPY --from=deps --chown=apiuser:nodejs /app/node_modules ./node_modules
COPY --from=deps --chown=apiuser:nodejs /app/packages/*/node_modules ./packages/*/node_modules
COPY --from=builder --chown=apiuser:nodejs /app/packages/shared/dist ./packages/shared/dist
COPY --from=builder --chown=apiuser:nodejs /app/packages/api/dist ./packages/api/dist
COPY --from=builder --chown=apiuser:nodejs /app/packages/web/dist ./packages/web/dist
COPY --chown=apiuser:nodejs package*.json ./
COPY --chown=apiuser:nodejs packages/*/package*.json ./packages/*/

USER apiuser

EXPOSE 3001

# 启动 API 服务器
CMD ["npm", "run", "start:prod"]

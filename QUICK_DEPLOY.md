# 🚀 在线商店快速部署指南

## 📋 部署前准备

### 1. 获取 Supabase 配置

**重要：在部署前，你需要先设置 Supabase 数据库！**

1. 访问 [supabase.com](https://supabase.com)
2. 创建新项目（免费）
3. 在项目设置中找到：
   - **Project URL** (例如: `https://your-project.supabase.co`)
   - **anon public key** (例如: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

### 2. 设置数据库

1. 在 Supabase 控制台进入 **SQL Editor**
2. 复制并运行 `supabase-schema.sql` 文件中的所有 SQL 代码
3. 确保所有表都创建成功

### 3. 配置环境变量

编辑 `.env.local` 文件，填入你的真实 Supabase 配置：

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## 🎯 部署方式

### 方式1: Vercel 部署 (推荐) ⭐

#### 步骤A: 通过 Vercel 网站 (最简单)

1. **推送代码到 GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **部署到 Vercel**
   - 访问 [vercel.com](https://vercel.com)
   - 用 GitHub 登录
   - 点击 "New Project"
   - 选择你的仓库
   - 在环境变量中添加：
     - `NEXT_PUBLIC_SUPABASE_URL` = 你的 Supabase URL
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = 你的 Supabase 密钥
   - 点击 "Deploy"

#### 步骤B: 通过 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录 Vercel
vercel login

# 部署项目
vercel

# 添加环境变量
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY

# 部署到生产环境
vercel --prod
```

### 方式2: Netlify 部署

1. **推送代码到 GitHub**

2. **部署到 Netlify**
   - 访问 [netlify.com](https://netlify.com)
   - 用 GitHub 登录
   - 点击 "New site from Git"
   - 选择你的仓库
   - 构建设置：
     - **Build command**: `npm run build`
     - **Publish directory**: `.next`
   - 在环境变量中添加配置
   - 点击 "Deploy site"

### 方式3: Railway 部署

1. **推送代码到 GitHub**

2. **部署到 Railway**
   - 访问 [railway.app](https://railway.app)
   - 用 GitHub 登录
   - 点击 "New Project"
   - 选择 "Deploy from GitHub repo"
   - 选择你的仓库
   - 在环境变量中添加配置
   - 自动部署

## 🔧 快速部署命令

### 一键部署脚本

```bash
# 1. 进入项目目录
cd "/Users/terry/Documents/AI/cursor/supabase测试项目/online-store"

# 2. 初始化 Git 仓库（如果还没有）
git init
git add .
git commit -m "Initial commit"

# 3. 推送到 GitHub（需要先在 GitHub 创建仓库）
git remote add origin https://github.com/yourusername/online-store.git
git push -u origin main

# 4. 部署到 Vercel
npx vercel --prod
```

## ✅ 部署后验证

1. **访问你的部署 URL**
2. **测试功能**：
   - [ ] 首页正常加载
   - [ ] 商品列表显示
   - [ ] 搜索功能正常
   - [ ] 用户注册/登录
   - [ ] 购物车功能
   - [ ] 移动端适配

## 🚨 常见问题解决

### Q: 部署后页面显示空白
**A**: 检查环境变量是否正确配置

### Q: 用户无法注册
**A**: 检查 Supabase 项目设置中的认证配置

### Q: 购物车不工作
**A**: 检查数据库表是否正确创建

### Q: 构建失败
**A**: 检查 TypeScript 错误，运行 `npm run build` 查看详细错误

## 📞 需要帮助？

如果遇到问题，请检查：
1. Supabase 配置是否正确
2. 环境变量是否设置
3. 数据库表是否创建
4. 网络连接是否正常

---

**选择你喜欢的部署方式开始吧！** 🎉

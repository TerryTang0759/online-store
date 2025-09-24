# 🚀 在线商店部署指南

## 📋 部署前准备

### 1. 获取 Supabase 配置

1. 访问 [supabase.com](https://supabase.com)
2. 创建新项目
3. 在项目设置中找到：
   - **Project URL** (例如: `https://your-project.supabase.co`)
   - **anon public key** (例如: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

### 2. 设置数据库

1. 在 Supabase 控制台进入 **SQL Editor**
2. 复制并运行 `supabase-schema.sql` 文件中的所有 SQL 代码
3. 确保所有表都创建成功
4. 验证 RLS 策略已启用

### 3. 配置环境变量

创建 `.env.local` 文件：

```bash
cp .env.example .env.local
```

编辑 `.env.local` 文件：

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## 🎯 部署选项

### 选项1: Vercel 部署 (推荐)

#### 方法A: 通过 Vercel 网站
1. 访问 [vercel.com](https://vercel.com)
2. 使用 GitHub 登录
3. 点击 "New Project"
4. 导入你的 GitHub 仓库
5. 在环境变量中添加：
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. 点击 "Deploy"

#### 方法B: 通过 Vercel CLI
```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录 Vercel
vercel login

# 部署项目
vercel

# 部署到生产环境
vercel --prod
```

### 选项2: Netlify 部署

1. 访问 [netlify.com](https://netlify.com)
2. 使用 GitHub 登录
3. 点击 "New site from Git"
4. 选择你的仓库
5. 构建设置：
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
6. 在环境变量中添加配置
7. 点击 "Deploy site"

### 选项3: Railway 部署

1. 访问 [railway.app](https://railway.app)
2. 使用 GitHub 登录
3. 点击 "New Project"
4. 选择 "Deploy from GitHub repo"
5. 选择你的仓库
6. 在环境变量中添加配置
7. 自动部署

### 选项4: 本地预览

```bash
# 确保已配置环境变量
npm run dev

# 访问 http://localhost:3000
```

## 🔧 部署后配置

### 1. 验证部署

访问你的部署 URL，检查：
- [ ] 首页正常加载
- [ ] 商品列表显示
- [ ] 搜索功能正常
- [ ] 购物车功能正常
- [ ] 用户注册/登录正常

### 2. 测试功能

1. **用户注册/登录**
   - 注册新用户
   - 登录现有用户
   - 验证用户状态持久化

2. **商品浏览**
   - 浏览商品列表
   - 使用搜索功能
   - 测试分类筛选
   - 测试排序功能

3. **购物车功能**
   - 添加商品到购物车
   - 调整商品数量
   - 删除购物车商品
   - 验证价格计算

### 3. 性能优化

- 启用 Vercel 的 Edge Functions（如果使用 Vercel）
- 配置 CDN 加速
- 优化图片加载
- 启用 Gzip 压缩

## 🚨 常见问题

### Q: 部署后页面显示空白
**A**: 检查环境变量是否正确配置，确保 Supabase URL 和密钥正确。

### Q: 用户无法注册/登录
**A**: 检查 Supabase 项目设置中的认证配置，确保邮箱确认已正确设置。

### Q: 购物车功能不工作
**A**: 检查数据库表是否正确创建，确保 RLS 策略已启用。

### Q: 商品图片不显示
**A**: 检查图片 URL 是否可访问，考虑使用 CDN 或图片优化服务。

### Q: 构建失败
**A**: 检查 TypeScript 错误，确保所有依赖正确安装。

## 📊 部署检查清单

### 部署前
- [ ] 代码已推送到 GitHub
- [ ] 环境变量已配置
- [ ] 数据库已设置
- [ ] 本地测试通过

### 部署后
- [ ] 网站可正常访问
- [ ] 所有功能正常工作
- [ ] 移动端适配正常
- [ ] 性能表现良好

## 🎉 部署完成

恭喜！你的在线商店已经成功部署！

### 下一步建议

1. **监控和维护**
   - 设置错误监控（如 Sentry）
   - 定期备份数据库
   - 监控性能指标

2. **功能扩展**
   - 添加支付功能
   - 实现订单管理
   - 添加用户评价
   - 集成分析工具

3. **SEO 优化**
   - 添加 meta 标签
   - 配置 sitemap
   - 优化页面加载速度

---

**你的在线商店现在已经可以接受用户了！** 🎊
# 重新部署触发 - Wed Sep 24 15:15:06 CST 2025

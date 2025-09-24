# 🛒 在线商店

一个现代化的在线商店应用，使用 Next.js 15 + Supabase 构建，提供完整的购物体验。

## ✨ 功能特性

- 🔐 **用户认证** - 注册、登录、用户管理
- 🛍️ **商品浏览** - 商品展示、搜索、分类筛选
- 🛒 **购物车** - 添加商品、数量调整、购物车管理
- 📱 **响应式设计** - 完美适配桌面和移动设备
- 🎨 **现代UI** - 使用 Tailwind CSS 构建的美观界面
- ⚡ **高性能** - Next.js 15 + Turbopack 提供极速体验

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone <your-repo-url>
cd online-store
```

### 2. 安装依赖

```bash
npm install
```

### 3. 设置环境变量

复制环境变量模板文件：

```bash
cp .env.example .env.local
```

编辑 `.env.local` 文件，填入你的 Supabase 配置：

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 4. 设置数据库

1. 在 [Supabase](https://supabase.com) 创建新项目
2. 在 SQL 编辑器中运行 `supabase-schema.sql` 文件中的 SQL 代码
3. 确保启用了行级安全策略 (RLS)

### 5. 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看应用。

## 📁 项目结构

```
online-store/
├── src/
│   ├── app/                 # Next.js App Router 页面
│   │   ├── cart/           # 购物车页面
│   │   ├── products/       # 商品页面
│   │   └── page.tsx        # 首页
│   ├── components/         # React 组件
│   │   ├── auth/          # 认证相关组件
│   │   ├── ui/            # 基础UI组件
│   │   ├── navbar.tsx     # 导航栏
│   │   └── product-card.tsx # 商品卡片
│   ├── lib/               # 工具函数
│   │   ├── supabase.ts    # Supabase 客户端
│   │   └── utils.ts       # 通用工具函数
│   └── types/             # TypeScript 类型定义
├── supabase-schema.sql    # 数据库架构
└── README.md
```

## 🛠️ 技术栈

- **前端框架**: Next.js 15 (App Router)
- **样式**: Tailwind CSS
- **数据库**: Supabase (PostgreSQL)
- **认证**: Supabase Auth
- **类型安全**: TypeScript
- **图标**: Lucide React
- **构建工具**: Turbopack

## 🗄️ 数据库架构

### 主要表结构

- **products** - 商品信息
- **cart_items** - 购物车商品
- **profiles** - 用户资料

### 安全策略

所有表都启用了行级安全策略 (RLS)，确保数据安全：
- 商品表：所有人可查看
- 购物车表：用户只能操作自己的购物车
- 用户资料表：公开可查看，用户只能修改自己的资料

## 🎨 界面预览

- **首页**: 商品展示、搜索、分类筛选
- **商品页**: 详细商品列表、排序、筛选
- **购物车**: 商品管理、数量调整、价格计算
- **认证**: 登录/注册模态框

## 🚀 部署

### Vercel 部署 (推荐)

1. 将代码推送到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. 添加环境变量
4. 部署

### 其他平台

项目也可以部署到：
- Netlify
- Railway
- DigitalOcean App Platform

## 📝 开发说明

### 添加新功能

1. 在 `src/components/` 中创建新组件
2. 在 `src/types/` 中定义相关类型
3. 在 `src/lib/` 中添加工具函数
4. 更新数据库架构（如需要）

### 样式定制

项目使用 Tailwind CSS，可以通过修改 `tailwind.config.js` 进行主题定制。

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 🆘 常见问题

### Q: 如何添加新的商品分类？
A: 在 Supabase 中直接向 products 表插入新商品时指定 category 字段即可。

### Q: 如何自定义商品图片？
A: 修改 products 表中的 image_url 字段，指向你的图片 URL。

### Q: 如何添加支付功能？
A: 可以集成 Stripe、支付宝等支付服务，在购物车结算页面添加支付逻辑。

---

**开始构建你的在线商店吧！** 🎉
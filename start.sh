#!/bin/bash

echo "🛒 启动在线商店..."
echo "================================"

# 检查环境变量文件
if [ ! -f .env.local ]; then
    echo "❌ 错误: .env.local 文件不存在"
    echo "📝 请先创建 .env.local 文件并填入以下环境变量:"
    echo ""
    echo "NEXT_PUBLIC_SUPABASE_URL=your_supabase_url"
    echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key"
    echo ""
    echo "💡 提示: 可以复制 .env.example 文件作为模板"
    exit 1
fi

echo "✅ 环境变量文件存在"
echo "🚀 启动开发服务器..."

npm run dev

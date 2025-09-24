-- 创建商品表
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  category TEXT,
  stock INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建购物车表
CREATE TABLE cart_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- 创建用户资料表
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 启用行级安全
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 商品策略：所有人都可以查看
CREATE POLICY "Products are viewable by everyone" ON products FOR SELECT USING (true);

-- 购物车策略：用户只能查看自己的购物车
CREATE POLICY "Users can view own cart" ON cart_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own cart" ON cart_items FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own cart" ON cart_items FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own cart" ON cart_items FOR DELETE USING (auth.uid() = user_id);

-- 用户资料策略
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- 创建用户资料触发器
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 插入示例商品数据
INSERT INTO products (name, description, price, image_url, category, stock) VALUES
('iPhone 15 Pro', '最新款iPhone，配备A17 Pro芯片', 7999.00, 'https://images.unsplash.com/photo-1592899677977-9c8c8b8b8b8b?w=500', '手机', 50),
('MacBook Pro 14"', 'M3芯片，14英寸Liquid Retina XDR显示屏', 15999.00, 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500', '电脑', 30),
('AirPods Pro', '主动降噪无线耳机', 1899.00, 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500', '耳机', 100),
('iPad Air', 'M1芯片，10.9英寸Liquid Retina显示屏', 4399.00, 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=500', '平板', 25),
('Apple Watch Series 9', '健康监测，GPS + 蜂窝网络', 2999.00, 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500', '手表', 40);

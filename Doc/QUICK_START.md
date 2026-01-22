# 🚀 Supabase 快速开始指南

## 5 分钟快速设置

### 步骤 1: 创建 Supabase 项目（2 分钟）

1. 访问 https://supabase.com 并登录
2. 点击 **"New Project"**
3. 填写项目信息：
   - Name: `my-portfolio-vectors`
   - Password: 设置并**保存**数据库密码
   - Region: 选择最近的区域
   - Plan: **Free**
4. 等待项目创建完成

### 步骤 2: 获取凭证（1 分钟）

1. 在 Supabase Dashboard，进入 **Settings** -> **API**
2. 复制以下信息：
   - **Project URL**: `https://xxxxx.supabase.co`
   - **service_role key**: 点击 "Reveal" 显示并复制

### 步骤 3: 配置数据库（1 分钟）

1. 在 Supabase Dashboard，进入 **SQL Editor**
2. 点击 **"New query"**
3. 打开项目中的 `supabase-init.sql` 文件
4. 复制全部内容并粘贴到 SQL Editor
5. 点击 **"Run"** 执行

### 步骤 4: 配置环境变量（30 秒）

```bash
# 进入项目目录
cd "/Users/taylor/Desktop/Jacky Workspace/ai-app/myPortfolio"

# 复制环境变量模板
cp env.template .env.local

# 编辑 .env.local，填入你的凭证
# 使用你喜欢的编辑器，例如：
# code .env.local
# 或
# nano .env.local
```

在 `.env.local` 中填入：

- `SUPABASE_URL`: 你的项目 URL
- `SUPABASE_SERVICE_ROLE_KEY`: 你的 service_role key
- `OPENAI_API_KEY`: 你的 OpenAI API Key

### 步骤 5: 验证设置（30 秒）

```bash
# 运行设置检查脚本
node scripts/setup-supabase.js
```

如果所有检查通过，继续下一步。

### 步骤 6: 初始化向量存储（30 秒）

```bash
# 启动开发服务器（在一个终端）
npm run dev

# 在另一个终端，初始化向量存储
curl -X POST http://localhost:3001/api/vector-store/init
```

### 步骤 7: 测试（30 秒）

1. 打开浏览器访问：`http://localhost:3001`
2. 在聊天界面发送消息测试
3. 检查控制台日志，应该看到向量搜索结果

## ✅ 完成！

如果所有步骤都成功，你的 Supabase 环境就设置完成了！

## 🆘 遇到问题？

1. 查看详细指南：`SUPABASE_SETUP_GUIDE.md`
2. 运行检查脚本：`node scripts/setup-supabase.js`
3. 检查 Supabase Dashboard 中的错误信息

## 📝 下一步

- 更新 `src/data/knowledge-base.json` 添加更多知识
- 调整相似度阈值（在 `src/lib/rag/retrieval.ts` 中）
- 部署到生产环境时，记得在 Vercel 等平台设置环境变量

# Supabase 环境设置

## 📚 文档索引

根据你的需求，选择相应的文档：

1. **快速开始** → [`QUICK_START.md`](./QUICK_START.md) - 5 分钟快速设置
2. **详细指南** → [`SUPABASE_SETUP_GUIDE.md`](./SUPABASE_SETUP_GUIDE.md) - 完整设置步骤
3. **向量存储** → [`VECTOR_STORE_SETUP.md`](./VECTOR_STORE_SETUP.md) - 向量存储详细说明

## 🎯 快速开始（推荐）

如果你是第一次设置，建议从快速开始指南开始：

```bash
# 1. 查看快速开始指南
cat QUICK_START.md

# 2. 运行设置检查脚本
node scripts/setup-supabase.js

# 3. 按照提示完成设置
```

## 📋 设置步骤概览

1. ✅ 创建 Supabase 项目
2. ✅ 启用 pgvector 扩展
3. ✅ 执行数据库初始化脚本
4. ✅ 配置环境变量
5. ✅ 初始化向量存储
6. ✅ 测试向量检索

## 🛠️ 辅助工具

### 设置检查脚本

自动检查你的 Supabase 环境配置：

```bash
node scripts/setup-supabase.js
```

这个脚本会检查：

- ✅ 环境变量文件是否存在
- ✅ 环境变量是否已配置
- ✅ Supabase 连接是否正常
- ✅ 数据库表是否存在

### 测试脚本

测试向量存储功能：

```bash
# 需要先安装 tsx
npm install -D tsx

# 运行测试
npx tsx scripts/test-vector-store.ts
```

## 🔑 需要的凭证

在开始之前，确保你有：

1. **Supabase 账户** - [注册](https://supabase.com)
2. **Supabase Project URL** - 从 Dashboard 获取
3. **Supabase Service Role Key** - 从 Settings -> API 获取
4. **OpenAI API Key** - [获取](https://platform.openai.com/api-keys)

## 📝 环境变量模板

复制 `env.template` 为 `.env.local` 并填入你的凭证：

```bash
cp env.template .env.local
```

然后编辑 `.env.local`：

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
OPENAI_API_KEY=sk-your_openai_api_key
```

## 🚀 初始化向量存储

设置完成后，初始化向量存储：

```bash
# 方式 1: 使用 API 端点（推荐）
curl -X POST http://localhost:3001/api/vector-store/init

# 方式 2: 使用测试脚本
npx tsx scripts/test-vector-store.ts
```

## ✅ 验证设置

1. 运行设置检查脚本
2. 在 Supabase Dashboard 查看表数据
3. 在聊天界面测试向量检索

## 🆘 需要帮助？

- 查看 [`SUPABASE_SETUP_GUIDE.md`](./SUPABASE_SETUP_GUIDE.md) 中的故障排除部分
- 检查 Supabase Dashboard 中的错误信息
- 查看控制台日志

## 📚 相关资源

- [Supabase 文档](https://supabase.com/docs)
- [Supabase Vector 指南](https://supabase.com/docs/guides/ai/vector-columns)
- [OpenAI Embeddings API](https://platform.openai.com/docs/guides/embeddings)

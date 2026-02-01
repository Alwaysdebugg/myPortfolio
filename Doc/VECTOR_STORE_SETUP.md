# 向量存储设置指南

本指南将帮助你设置 Supabase Vector 向量数据库和 OpenAI Embeddings。

## 📋 前置要求

1. **Supabase 账户** - 注册地址：https://supabase.com
2. **OpenAI API Key** - 获取地址：https://platform.openai.com/api-keys

## 🚀 设置步骤

### 步骤 1: 创建 Supabase 项目

1. 登录 Supabase Dashboard
2. 创建新项目（或使用现有项目）
3. 记录以下信息：
   - **Project URL** (例如: `https://xxxxx.supabase.co`)
   - **Service Role Key** (在 Settings -> API 中获取)

### 步骤 2: 初始化数据库

1. 在 Supabase Dashboard 中，进入 **SQL Editor**
2. 打开项目根目录的 `supabase-init.sql` 文件
3. 复制整个 SQL 脚本内容
4. 在 SQL Editor 中粘贴并执行
5. 确认以下内容已创建：
   - ✅ `knowledge_base_vectors` 表
   - ✅ `match_documents` 函数
   - ✅ 向量索引

### 步骤 3: 配置环境变量

在项目根目录创建或更新 `.env.local` 文件：

```env
# Supabase 配置
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# OpenAI 配置
OPENAI_API_KEY=sk-your_openai_api_key_here

# 可选：初始化 API 的密钥保护（如果启用）
# INIT_SECRET=your_secret_key_here
```

### 步骤 4: 初始化向量存储

有两种方式初始化向量存储：

#### 方式 A: 使用 API 端点（推荐）

```bash
# 在项目根目录执行
curl -X POST http://localhost:3001/api/vector-store/init
```

#### 方式 B: 在代码中调用

创建一个初始化脚本或在应用启动时调用：

```typescript
import { initializeSupabaseStore } from "@/lib/rag/vector-store-supabase";

// 在应用启动时调用
await initializeSupabaseStore();
```

### 步骤 5: 验证设置

#### 方式 A: 使用 API 端点测试（推荐）

1. 启动开发服务器：
   ```bash
   npm run dev
   ```

2. 初始化向量存储：
   ```bash
   curl -X POST http://localhost:3001/api/vector-store/init
   ```

3. 测试向量检索：
   - 打开聊天界面
   - 发送一条消息（例如："What is your name?"）
   - 检查控制台日志，应该看到向量搜索结果

#### 方式 B: 在 Supabase Dashboard 中验证

1. 进入 **Table Editor**
2. 查看 `knowledge_base_vectors` 表
3. 应该看到知识库文档已转换为向量存储
4. 检查 `embedding` 列，应该包含 768 维的向量数据

#### 方式 C: 使用测试脚本（可选）

如果需要更详细的测试，可以安装 `tsx` 并运行测试脚本：

```bash
npm install -D tsx
npx tsx scripts/test-vector-store.ts
```

## 🔧 配置说明

### 向量维度

- **模型**: `text-embedding-3-small`
- **维度**: 768
- **距离度量**: 余弦相似度 (Cosine Similarity)

### 相似度阈值

默认相似度阈值为 `0.5`，可以在 `retrieval.ts` 中调整：

```typescript
const vectorResults = await searchSupabase(query, topK, 0.5); // 调整第三个参数
```

- **较低阈值** (如 0.3): 返回更多结果，但可能包含不太相关的文档
- **较高阈值** (如 0.7): 返回更少但更精确的结果

### TopK 参数

控制返回的文档数量，默认值为 `2`。

## 📊 监控和调试

### 查看向量存储状态

在 Supabase Dashboard -> SQL Editor 中执行：

```sql
-- 查看文档数量
SELECT COUNT(*) FROM knowledge_base_vectors;

-- 查看所有文档
SELECT doc_id, title, LEFT(content, 50) as content_preview 
FROM knowledge_base_vectors;

-- 测试向量搜索函数
SELECT * FROM match_documents(
  (SELECT embedding FROM knowledge_base_vectors LIMIT 1),
  0.5,
  5
);
```

### 日志输出

向量检索会在控制台输出：
- 搜索结果（包含相似度分数）
- 错误信息（如果检索失败）

## 🔄 更新知识库

当 `knowledge-base.json` 更新时：

1. 删除现有向量数据（可选，如果只想更新特定文档）：
   ```sql
   DELETE FROM knowledge_base_vectors;
   ```

2. 重新初始化：
   ```bash
   curl -X POST http://localhost:3001/api/vector-store/init
   ```

或者使用更新函数：

```typescript
import { updateSupabaseDoc } from "@/lib/rag/vector-store-supabase";

await updateSupabaseDoc({
  id: 1,
  title: "Updated Title",
  content: "Updated content..."
});
```

## 🛡️ 安全建议

1. **保护 Service Role Key**:
   - 永远不要提交到 Git
   - 使用环境变量存储
   - 在生产环境中使用 Vercel/环境变量管理

2. **API 端点保护**:
   - 考虑为 `/api/vector-store/init` 添加认证
   - 在 `route.ts` 中取消注释认证检查代码

3. **Row Level Security (RLS)**:
   - 如果使用用户级别的访问控制，启用 RLS
   - 参考 `supabase-init.sql` 中的注释

## 🐛 故障排除

### 问题 1: "Extension vector does not exist"

**解决方案**: 在 Supabase Dashboard -> Database -> Extensions 中启用 `pgvector` 扩展。

### 问题 2: "Function match_documents does not exist"

**解决方案**: 确保已执行 `supabase-init.sql` 中的所有 SQL 语句。

### 问题 3: "OPENAI_API_KEY is not set"

**解决方案**: 检查 `.env.local` 文件中的 `OPENAI_API_KEY` 是否正确设置。

### 问题 4: 向量检索返回空结果

**可能原因**:
- 向量存储未初始化
- 相似度阈值设置过高
- 查询文本与知识库内容差异太大

**解决方案**:
- 检查向量存储是否已初始化
- 降低相似度阈值
- 检查控制台日志中的错误信息

## 📚 相关文档

- [Supabase Vector 文档](https://supabase.com/docs/guides/ai/vector-columns)
- [OpenAI Embeddings API](https://platform.openai.com/docs/guides/embeddings)
- [pgvector 文档](https://github.com/pgvector/pgvector)

## ✅ 完成检查清单

- [ ] Supabase 项目已创建
- [ ] SQL 初始化脚本已执行
- [ ] 环境变量已配置
- [ ] 向量存储已初始化
- [ ] 测试查询成功返回结果
- [ ] 生产环境变量已设置（如果部署）

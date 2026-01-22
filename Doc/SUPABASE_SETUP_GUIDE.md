# Supabase 环境设置完整指南

本指南将逐步指导你完成 Supabase 环境的设置。

## 📋 第一步：创建 Supabase 项目

### 1.1 注册/登录 Supabase

1. 访问 [Supabase 官网](https://supabase.com)
2. 点击 **"Start your project"** 或 **"Sign in"**
3. 使用 GitHub、GitLab 或邮箱注册/登录

### 1.2 创建新项目

1. 登录后，点击 **"New Project"** 或 **"Create a new project"**
2. 填写项目信息：

   - **Name**: 输入项目名称（例如：`my-portfolio-vectors`）
   - **Database Password**: 设置数据库密码（**重要：请保存此密码**）
   - **Region**: 选择离你最近的区域（推荐：`West US (N. California)` 或 `Southeast Asia (Singapore)`）
   - **Pricing Plan**: 选择 **Free** 计划（免费层足够使用）

3. 点击 **"Create new project"**
4. 等待项目创建完成（通常需要 1-2 分钟）

### 1.3 获取项目凭证

项目创建完成后，需要获取以下信息：

1. **Project URL**:

   - 在项目 Dashboard 首页
   - 或在 **Settings** -> **API** 页面
   - 格式：`https://xxxxxxxxxxxxx.supabase.co`

2. **Service Role Key**（重要）:
   - 进入 **Settings** -> **API**
   - 找到 **"service_role"** 密钥（⚠️ 这是敏感密钥，不要公开）
   - 点击 **"Reveal"** 显示完整密钥
   - 复制并保存

## 📋 第二步：启用 pgvector 扩展

### 2.1 在 Supabase Dashboard 中启用

1. 进入项目 Dashboard
2. 点击左侧菜单 **"Database"**
3. 点击 **"Extensions"** 标签
4. 在搜索框中输入 `pgvector`
5. 找到 **"vector"** 扩展，点击 **"Enable"**

### 2.2 或使用 SQL 启用

1. 进入 **SQL Editor**
2. 执行以下 SQL：
   ```sql
   CREATE EXTENSION IF NOT EXISTS vector;
   ```

## 📋 第三步：执行数据库初始化脚本

### 3.1 打开 SQL Editor

1. 在 Supabase Dashboard 中，点击左侧菜单 **"SQL Editor"**
2. 点击 **"New query"**

### 3.2 执行初始化脚本

1. 打开项目中的 `supabase-init.sql` 文件
2. 复制整个文件内容
3. 粘贴到 SQL Editor 中
4. 点击 **"Run"** 或按 `Ctrl/Cmd + Enter`
5. 确认执行成功（应该看到 "Success. No rows returned"）

### 3.3 验证表已创建

1. 点击左侧菜单 **"Table Editor"**
2. 应该能看到 `knowledge_base_vectors` 表
3. 点击表名查看表结构，应该包含以下列：
   - `id` (bigint)
   - `doc_id` (integer)
   - `title` (text)
   - `content` (text)
   - `embedding` (vector(1536))
   - `created_at` (timestamp)
   - `updated_at` (timestamp)

### 3.4 验证函数已创建

1. 在 SQL Editor 中执行：
   ```sql
   SELECT proname FROM pg_proc WHERE proname = 'match_documents';
   ```
2. 应该返回 `match_documents`

## 📋 第四步：配置环境变量

### 4.1 创建 .env.local 文件

在项目根目录（`myPortfolio/`）创建 `.env.local` 文件：

```bash
cd /Users/taylor/Desktop/Jacky\ Workspace/ai-app/myPortfolio
touch .env.local
```

### 4.2 添加环境变量

打开 `.env.local` 文件，添加以下内容：

```env
# Supabase 配置
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# OpenAI 配置（用于生成 embeddings）
OPENAI_API_KEY=sk-your_openai_api_key_here

# 可选：初始化 API 的密钥保护
# INIT_SECRET=your_secret_key_here
```

**替换以下值**：

- `SUPABASE_URL`: 你的 Supabase 项目 URL
- `SUPABASE_SERVICE_ROLE_KEY`: 你的 Service Role Key
- `OPENAI_API_KEY`: 你的 OpenAI API Key

### 4.3 验证 .env.local 不被提交到 Git

检查 `.gitignore` 文件是否包含：

```
.env.local
.env
```

如果没有，请添加。

## 📋 第五步：测试连接

### 5.1 安装依赖（如果尚未安装）

```bash
cd /Users/taylor/Desktop/Jacky\ Workspace/ai-app/myPortfolio
npm install
```

### 5.2 测试 Supabase 连接

创建一个简单的测试脚本：

```bash
# 在项目根目录创建测试文件
cat > test-supabase-connection.js << 'EOF'
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function test() {
  try {
    // 测试连接
    const { data, error } = await supabase
      .from('knowledge_base_vectors')
      .select('count', { count: 'exact', head: true });

    if (error) {
      console.error('❌ 连接失败:', error.message);
      process.exit(1);
    }

    console.log('✅ Supabase 连接成功！');
    console.log(`📊 当前表中有 ${data?.length || 0} 条记录`);
  } catch (error) {
    console.error('❌ 错误:', error.message);
    process.exit(1);
  }
}

test();
EOF

# 运行测试
node test-supabase-connection.js
```

### 5.3 使用测试脚本（推荐）

如果你安装了 `tsx`，可以使用项目中的测试脚本：

```bash
# 安装 tsx（如果还没有）
npm install -D tsx

# 运行测试脚本
npx tsx scripts/test-vector-store.ts
```

## 📋 第六步：初始化向量存储

### 6.1 启动开发服务器

```bash
npm run dev
```

### 6.2 初始化向量存储

在另一个终端窗口中：

```bash
curl -X POST http://localhost:3001/api/vector-store/init
```

或者使用浏览器访问：

```
http://localhost:3001/api/vector-store/init
```

**预期响应**：

```json
{
  "success": true,
  "message": "Vector store initialized successfully"
}
```

### 6.3 验证数据已插入

1. 在 Supabase Dashboard 中，进入 **Table Editor**
2. 选择 `knowledge_base_vectors` 表
3. 应该能看到知识库文档已转换为向量存储
4. 检查 `embedding` 列，应该包含 1536 维的向量数据

## 📋 第七步：测试向量检索

### 7.1 在聊天界面测试

1. 打开应用：`http://localhost:3001`
2. 在聊天界面发送消息，例如：
   - "What is your name?"
   - "Tell me about your skills"
   - "Where are you located?"
3. 检查浏览器控制台和服务器日志，应该看到向量搜索结果

### 7.2 在 Supabase 中测试 SQL

在 SQL Editor 中执行：

```sql
-- 查看所有文档
SELECT doc_id, title, LEFT(content, 50) as content_preview
FROM knowledge_base_vectors;

-- 测试向量搜索（使用第一个文档的 embedding 作为查询）
SELECT * FROM match_documents(
  (SELECT embedding FROM knowledge_base_vectors LIMIT 1),
  0.5,
  5
);
```

## ✅ 完成检查清单

完成以下所有步骤后，你的 Supabase 环境就设置完成了：

- [ ] Supabase 项目已创建
- [ ] pgvector 扩展已启用
- [ ] `supabase-init.sql` 脚本已执行
- [ ] `knowledge_base_vectors` 表已创建
- [ ] `match_documents` 函数已创建
- [ ] `.env.local` 文件已创建并配置
- [ ] 环境变量已正确设置
- [ ] Supabase 连接测试通过
- [ ] 向量存储已初始化
- [ ] 数据已成功插入
- [ ] 向量检索测试成功

## 🐛 常见问题

### Q1: 如何找到 Service Role Key？

**A**:

1. 进入 Supabase Dashboard
2. 点击 **Settings** -> **API**
3. 找到 **"service_role"** 密钥
4. 点击 **"Reveal"** 显示密钥

### Q2: 执行 SQL 时出现 "Extension vector does not exist"

**A**:

1. 进入 **Database** -> **Extensions**
2. 搜索并启用 `vector` 扩展
3. 或执行：`CREATE EXTENSION IF NOT EXISTS vector;`

### Q3: 初始化时出现 "relation does not exist"

**A**:

- 确保已执行 `supabase-init.sql` 脚本
- 检查表名是否正确：`knowledge_base_vectors`

### Q4: 环境变量不生效

**A**:

- 确保 `.env.local` 文件在项目根目录
- 重启开发服务器
- 检查变量名是否正确（区分大小写）

### Q5: OpenAI API 调用失败

**A**:

- 检查 `OPENAI_API_KEY` 是否正确
- 确保 API Key 有足够的额度
- 检查网络连接

## 📚 有用的链接

- [Supabase 文档](https://supabase.com/docs)
- [Supabase Vector 指南](https://supabase.com/docs/guides/ai/vector-columns)
- [pgvector 文档](https://github.com/pgvector/pgvector)
- [OpenAI Embeddings API](https://platform.openai.com/docs/guides/embeddings)

## 🆘 需要帮助？

如果遇到问题：

1. 检查控制台日志
2. 查看 Supabase Dashboard 中的错误信息
3. 参考 `VECTOR_STORE_SETUP.md` 中的故障排除部分

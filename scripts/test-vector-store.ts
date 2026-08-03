/**
 * 向量存储测试脚本
 * 用于验证 Supabase Vector 和 OpenAI Embeddings 配置是否正确
 * 
 * 使用方法：
 * npx tsx scripts/test-vector-store.ts
 */

import { getEmbedding } from "../src/lib/rag/embeddings";
import { searchSupabase, initializeSupabaseStore } from "../src/lib/rag/vector-store-supabase";

async function testVectorStore() {
  console.log("🧪 开始测试向量存储...\n");

  // 测试 1: 检查环境变量
  console.log("1️⃣ 检查环境变量...");
  const requiredEnvVars = [
    "OPENAI_API_KEY",
    "SUPABASE_URL",
    "SUPABASE_SERVICE_ROLE_KEY",
  ];

  const missingVars = requiredEnvVars.filter(
    (varName) => !process.env[varName]
  );

  if (missingVars.length > 0) {
    console.error("❌ 缺少环境变量:", missingVars.join(", "));
    console.error("请在 .env.local 文件中设置这些变量");
    process.exit(1);
  }
  console.log("✅ 环境变量检查通过\n");

  // 测试 2: 测试 OpenAI Embedding
  console.log("2️⃣ 测试 OpenAI Embedding...");
  try {
    const testText = "Hello, this is a test";
    const embedding = await getEmbedding(testText);
    console.log(`✅ Embedding 生成成功，维度: ${embedding.length}`);
    if (embedding.length !== 768) {
      console.warn(
        `⚠️  警告: 期望维度 768，实际维度 ${embedding.length}`
      );
    }
  } catch (error) {
    console.error("❌ Embedding 生成失败:", error);
    process.exit(1);
  }
  console.log();

  // 测试 3: 初始化向量存储
  console.log("3️⃣ 初始化向量存储...");
  try {
    await initializeSupabaseStore();
    console.log("✅ 向量存储初始化成功");
  } catch (error) {
    console.error("❌ 向量存储初始化失败:", error);
    console.error(
      "提示: 请确保已执行 supabase-init.sql 脚本创建表和函数"
    );
    process.exit(1);
  }
  console.log();

  // 测试 4: 测试向量搜索
  console.log("4️⃣ 测试向量搜索...");
  try {
    const testQueries = [
      "What is your name?",
      "Tell me about your skills",
      "Where are you located?",
    ];

    for (const query of testQueries) {
      console.log(`\n查询: "${query}"`);
      const results = await searchSupabase(query, 2, 0.5);
      console.log(`找到 ${results.length} 个相关文档:`);
      results.forEach((result, index) => {
        console.log(
          `  ${index + 1}. [${result.doc.title}] ${result.doc.content.substring(0, 50)}...`
        );
      });
    }
    console.log("\n✅ 向量搜索测试通过");
  } catch (error) {
    console.error("❌ 向量搜索失败:", error);
    process.exit(1);
  }

  console.log("\n🎉 所有测试通过！向量存储配置正确。");
}

// 运行测试
testVectorStore().catch((error) => {
  console.error("测试过程中发生错误:", error);
  process.exit(1);
});

#!/usr/bin/env node

/**
 * Supabase 环境设置辅助脚本
 * 帮助检查和配置 Supabase 环境
 *
 * 使用方法：
 * node scripts/setup-supabase.js
 */

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (query) =>
  new Promise((resolve) => rl.question(query, resolve));

async function checkEnvFile() {
  const envPath = path.join(process.cwd(), ".env");
  const envExamplePath = path.join(process.cwd(), ".env.local.example");

  console.log("📋 检查环境变量文件...\n");

  if (!fs.existsSync(envPath)) {
    console.log("⚠️  .env.local 文件不存在");

    if (fs.existsSync(envExamplePath)) {
      const copy = await question(
        "是否从 .env.local.example 创建 .env.local? (y/n): "
      );
      if (copy.toLowerCase() === "y") {
        fs.copyFileSync(envExamplePath, envPath);
        console.log("✅ 已创建 .env.local 文件\n");
        console.log(
          "📝 请编辑 .env.local 文件，填入你的 Supabase 和 OpenAI 凭证\n"
        );
        return false;
      }
    } else {
      console.log("❌ .env.local.example 文件也不存在");
      return false;
    }
  } else {
    console.log("✅ .env.local 文件存在\n");
  }

  return true;
}

async function checkEnvVars() {
  // 尝试加载 dotenv（如果已安装）
  try {
    require("dotenv").config({ path: path.join(process.cwd(), ".env.local") });
  } catch (e) {
    // 如果没有 dotenv，手动读取 .env.local
    const envPath = path.join(process.cwd(), ".env.local");
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, "utf8");
      envContent.split("\n").forEach((line) => {
        const match = line.match(/^([^#=]+)=(.*)$/);
        if (match) {
          const key = match[1].trim();
          const value = match[2].trim().replace(/^["']|["']$/g, "");
          process.env[key] = value;
        }
      });
    }
  }

  console.log("🔍 检查环境变量...\n");

  const requiredVars = {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  };

  const missing = [];
  const present = [];

  for (const [key, value] of Object.entries(requiredVars)) {
    if (!value || value.includes("your-") || value.includes("your_")) {
      missing.push(key);
      console.log(`❌ ${key}: 未设置或使用占位符`);
    } else {
      present.push(key);
      // 只显示部分值以确保安全
      const displayValue = key.includes("KEY")
        ? `${value.substring(0, 10)}...`
        : value;
      console.log(`✅ ${key}: ${displayValue}`);
    }
  }

  console.log();

  if (missing.length > 0) {
    console.log("⚠️  以下环境变量需要配置：");
    missing.forEach((key) => console.log(`   - ${key}`));
    console.log("\n请编辑 .env.local 文件并填入正确的值。");
    console.log("参考 SUPABASE_SETUP_GUIDE.md 获取详细说明。\n");
    return false;
  }

  return true;
}

async function testSupabaseConnection() {
  try {
    const { createClient } = require("@supabase/supabase-js");

    // 尝试加载 dotenv（如果已安装）
    try {
      require("dotenv").config({
        path: path.join(process.cwd(), ".env.local"),
      });
    } catch (e) {
      // 如果没有 dotenv，手动读取 .env.local
      const envPath = path.join(process.cwd(), ".env.local");
      if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, "utf8");
        envContent.split("\n").forEach((line) => {
          const match = line.match(/^([^#=]+)=(.*)$/);
          if (match) {
            const key = match[1].trim();
            const value = match[2].trim().replace(/^["']|["']$/g, "");
            process.env[key] = value;
          }
        });
      }
    }

    console.log("🔌 测试 Supabase 连接...\n");

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // 测试连接
    const { data, error } = await supabase
      .from("knowledge_base_vectors")
      .select("count", { count: "exact", head: true });

    if (error) {
      if (
        error.message.includes("relation") ||
        error.message.includes("does not exist")
      ) {
        console.log("❌ 表不存在，请先执行 supabase-init.sql 脚本");
        console.log("   在 Supabase Dashboard -> SQL Editor 中执行\n");
      } else {
        console.log(`❌ 连接失败: ${error.message}\n`);
      }
      return false;
    }

    console.log("✅ Supabase 连接成功！");
    console.log(`📊 当前表中有记录数: ${data?.length || 0}\n`);
    return true;
  } catch (error) {
    console.log(`❌ 连接错误: ${error.message}\n`);
    return false;
  }
}

async function main() {
  console.log("🚀 Supabase 环境设置检查\n");
  console.log("=".repeat(50));
  console.log();

  // 步骤 1: 检查环境变量文件
  const envFileExists = await checkEnvFile();
  if (!envFileExists) {
    rl.close();
    return;
  }

  // 步骤 2: 检查环境变量
  const envVarsOk = await checkEnvVars();
  if (!envVarsOk) {
    rl.close();
    return;
  }

  // 步骤 3: 测试连接
  const connectionOk = await testSupabaseConnection();

  console.log("=".repeat(50));
  console.log();

  if (connectionOk) {
    console.log("✅ 所有检查通过！Supabase 环境已正确配置。\n");
    console.log("下一步：");
    console.log(
      "1. 如果向量存储未初始化，运行: curl -X POST http://localhost:3001/api/vector-store/init"
    );
    console.log("2. 启动开发服务器: npm run dev");
    console.log("3. 测试聊天功能\n");
  } else {
    console.log("⚠️  请完成以下步骤：");
    console.log("1. 确保已在 Supabase Dashboard 中执行 supabase-init.sql");
    console.log("2. 检查环境变量是否正确");
    console.log("3. 参考 SUPABASE_SETUP_GUIDE.md 获取详细说明\n");
  }

  rl.close();
}

main().catch((error) => {
  console.error("错误:", error);
  rl.close();
  process.exit(1);
});

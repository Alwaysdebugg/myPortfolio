import { NextRequest, NextResponse } from "next/server";
import { initializeSupabaseStore } from "@/lib/rag/vector-store-supabase";

export const runtime = "nodejs";

/**
 * 初始化向量存储 API
 * POST /api/vector-store/init
 * 将知识库文档转换为向量并存储到 Supabase
 */
export async function POST(req: NextRequest) {
  try {
    // 可以添加认证检查，确保只有授权用户可以初始化
    // const authHeader = req.headers.get("authorization");
    // if (authHeader !== `Bearer ${process.env.INIT_SECRET}`) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    await initializeSupabaseStore();
    
    return NextResponse.json({
      success: true,
      message: "Vector store initialized successfully",
    });
  } catch (error) {
    console.error("Init error:", error);
    return NextResponse.json(
      {
        error: String(error),
        message: "Failed to initialize vector store",
      },
      { status: 500 }
    );
  }
}

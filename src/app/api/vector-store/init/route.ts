import { NextRequest, NextResponse } from "next/server";
import { syncSupabaseStore } from "@/lib/rag/vector-store-supabase";

export const runtime = "nodejs";

/**
 * 初始化向量存储 API
 * POST /api/vector-store/init
 * 将知识库文档转换为向量并存储到 Supabase
 */
export async function POST(req: NextRequest) {
  try {
    const secret = process.env.INIT_SECRET;
    if (!secret) {
      return NextResponse.json(
        { error: "Vector-store sync is disabled until INIT_SECRET is set." },
        { status: 503 }
      );
    }

    if (req.headers.get("authorization") !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const count = await syncSupabaseStore();
    
    return NextResponse.json({
      success: true,
      message: "Vector store synchronized successfully",
      count,
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

// 速率限制配置
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10分钟
const RATE_LIMIT_MAX_REQUESTS = 10; // 最多10次请求

interface RateLimitRecord {
  timestamps: number[];
}

// 使用 Map 存储每个 IP 的请求记录
const rateLimitStore = new Map<string, RateLimitRecord>();

// 清理过期记录（防止内存泄漏）
const cleanupInterval = setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of Array.from(rateLimitStore.entries())) {
    // 只保留窗口期内的记录
    record.timestamps = record.timestamps.filter(
      (timestamp: number) => now - timestamp < RATE_LIMIT_WINDOW_MS
    );

    // 如果没有任何有效记录，删除该 IP
    if (record.timestamps.length === 0) {
      rateLimitStore.delete(ip);
    }
  }
}, 60000); // 每分钟清理一次

/**
 * 检查是否超过速率限制
 * @param ip - 客户端 IP 地址
 * @returns { allowed: boolean, remaining: number, resetAt: number }
 */
export function checkRateLimit(ip: string): {
  allowed: boolean;
  remaining: number;
  resetAt: number;
} {
  const now = Date.now();

  // 获取或创建该 IP 的记录
  let record = rateLimitStore.get(ip);
  if (!record) {
    record = { timestamps: [] };
    rateLimitStore.set(ip, record);
  }

  // 清理过期的时间戳
  record.timestamps = record.timestamps.filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS
  );

  // 检查是否超过限制
  if (record.timestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    // 找到最早的有效时间戳，计算重置时间
    const oldestTimestamp = Math.min(...record.timestamps);
    const resetAt = oldestTimestamp + RATE_LIMIT_WINDOW_MS;

    return {
      allowed: false,
      remaining: 0,
      resetAt,
    };
  }

  // 记录本次请求时间戳
  record.timestamps.push(now);

  // 计算重置时间（基于最早的时间戳）
  const oldestTimestamp =
    record.timestamps.length > 0 ? Math.min(...record.timestamps) : now;
  const resetAt = oldestTimestamp + RATE_LIMIT_WINDOW_MS;

  return {
    allowed: true,
    remaining: RATE_LIMIT_MAX_REQUESTS - record.timestamps.length,
    resetAt,
  };
}

/**
 * 获取客户端 IP 地址
 */
export function getClientIP(req: Request): string {
  // 优先从 headers 获取真实 IP（如果使用代理）
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }

  const realIP = req.headers.get("x-real-ip");
  if (realIP) {
    return realIP;
  }

  // 如果没有，返回一个默认值（实际情况下应该总是有 IP）
  return "unknown";
}

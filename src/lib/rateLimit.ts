import { getRedis } from './redis';

export async function rateLimit(key: string, limit = 60, windowSec = 60) {
  const redis = getRedis();
  const now = Date.now();
  const bucket = `rl:${key}:${Math.floor(now / (windowSec * 1000))}`;
  const count = await redis.incr(bucket);
  if (count === 1) await redis.expire(bucket, windowSec);
  return { allowed: count <= limit, count };
}
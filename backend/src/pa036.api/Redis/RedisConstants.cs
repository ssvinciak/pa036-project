using pa036.api.Utils;
using System;

namespace pa036.api.Redis
{
    public static class RedisConstants
    {
        public static readonly string Port = "6379";
        public static readonly string Host = "localhost";

        public static readonly string ServerUrl = string.Format("{0}:{1}", Host, Port);

        public static readonly string EFCacheRedis_CacheKey = CacheTypes.EFCacheRedis.ToString();
        public static readonly string NoEFCacheRedis_CacheKey = CacheTypes.EFNoCacheRedis.ToString();

        public static readonly TimeSpan CacheKeyExpirationTime = new TimeSpan(0, 5, 0);
    }
}

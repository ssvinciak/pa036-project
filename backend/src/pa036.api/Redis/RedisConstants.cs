using System;
using System.Collections.Generic;

namespace pa036.api.Redis
{
    public static class RedisConstants
    {
        public static readonly string Port = "6379";
        public static readonly string Host = "localhost";

        public static readonly string ServerUrl = string.Format("{0}:{1}", Host, Port);

        public static readonly IDictionary<RedisKeys, string> CacheKeys = new Dictionary<RedisKeys, string>()
        {
            { RedisKeys.NoEf, RedisKeys.NoEf.ToString() },
            { RedisKeys.WithEf, RedisKeys.WithEf.ToString() },
            { RedisKeys.SortedSetRange, RedisKeys.SortedSetRange.ToString() },
        };

        public static readonly TimeSpan CacheKeyExpirationTime = new TimeSpan(0, 5, 0);
    }
}

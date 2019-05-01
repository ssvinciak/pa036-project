using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pa036.api.Utils
{
    public enum CacheTypes
    {
        EFNoCacheNoRedis,
        EFCacheNoRedis,
        EFNoCacheRedis,
        EFCacheRedis
    }
}

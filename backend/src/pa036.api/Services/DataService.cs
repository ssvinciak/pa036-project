using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using pa036.api.Redis;
using pa036.api.Utils;
using pa036.db;
using pa036.db.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace pa036.api.Services
{
    public class DataService
    {
        public List<Measurement> GetDataWithEFCacheNoRedis(DateTime from, DateTime to)
        {
            using (var context = new DataDbContext())
            {
                return context
                        .Measurements
                        .Where(s => s.MeasurementDate >= from && s.MeasurementDate <= to)
                        .ToList();
            }
        }

        public List<Measurement> GetDataNoEFCacheNoRedis(DateTime from, DateTime to)
        {
            using (var context = new DataDbContext())
            {
                return context
                        .Measurements
                        .Where(s => s.MeasurementDate >= from && s.MeasurementDate <= to)
                        .AsNoTracking()
                        .ToList();
            }
        }

        public List<Measurement> GetDataWithEFCacheWithRedis(DateTime from, DateTime to)
        {
            List<Measurement> cached = null;
            string cacheKey = RedisConstants.CacheKeys[RedisKeys.WithEf];
            using (var context = new DataDbContext())
            {
                if (!RedisManager.GetDatabase().KeyExists(cacheKey))
                {
                    var data = context.Measurements
                        .Where(s => s.MeasurementDate >= from && s.MeasurementDate <= to)
                        .ToList();
                    RedisManager.GetDatabase().StringSet(cacheKey, JsonConvert.SerializeObject(data));
                    cached = data;
                }
                else
                {
                    var oldcache = JsonConvert.DeserializeObject<List<Measurement>>(RedisManager.GetDatabase().StringGet(cacheKey));
                    List<Measurement> data = null;
                    if (oldcache.First().MeasurementDate == from && oldcache.Last().MeasurementDate == to)
                    {
                        data = oldcache;
                    }
                    else
                    {
                        var newData = context.Measurements
                            .Where(s => s.MeasurementDate > oldcache.Last().MeasurementDate && s.MeasurementDate <= to)
                            .ToList();
                        var newCache = oldcache.SkipWhile(o => o.MeasurementDate < from).ToList();
                        newCache.AddRange(newData);
                        RedisManager.GetDatabase().StringSet(cacheKey, JsonConvert.SerializeObject(newCache));

                        data = newCache;
                    }
                    cached = data;
                }
            }

            SetKeyExpiration(cacheKey);
            return cached;
        }

        public List<Measurement> GetDataNoEFCacheWithRedis(DateTime from, DateTime to)
        {
            List<Measurement> cached;
            string cacheKey = RedisConstants.CacheKeys[RedisKeys.NoEf];
            using (var context = new DataDbContext())
            {
                if (!RedisManager.GetDatabase().KeyExists(cacheKey))
                {
                    var data = context.Measurements
                        .Where(s => s.MeasurementDate >= from && s.MeasurementDate <= to)
                        .AsNoTracking()
                        .ToList();
                    RedisManager.GetDatabase().StringSet(cacheKey, JsonConvert.SerializeObject(data));
                    cached = data;
                }
                else
                {
                    var oldcache = JsonConvert.DeserializeObject<List<Measurement>>(RedisManager.GetDatabase().StringGet(cacheKey));
                    List<Measurement> data = null;
                    if (oldcache.First().MeasurementDate == from && oldcache.Last().MeasurementDate == to)
                    {
                        data = oldcache;
                    }
                    else
                    {
                        var newData = context.Measurements
                            .Where(s => s.MeasurementDate > oldcache.Last().MeasurementDate && s.MeasurementDate <= to)
                            .AsNoTracking()
                            .ToList();
                        var newCache = oldcache.SkipWhile(o => o.MeasurementDate < from).ToList();
                        newCache.AddRange(newData);
                        RedisManager.GetDatabase().StringSet(cacheKey, JsonConvert.SerializeObject(newCache));
                        data = newCache;
                    }
                    cached = data;
                }
            }

            SetKeyExpiration(cacheKey);
            return cached;
        }

        private void SetKeyExpiration(string cacheKey)
        {
            RedisManager.GetDatabase().KeyExpire(cacheKey, RedisConstants.CacheKeyExpirationTime);
        }

        public List<Measurement> GetDataRedisSortedSet(DateTime from, DateTime to)
        {
            string cacheKey = RedisConstants.CacheKeys[RedisKeys.SortedSetRange];
            if (!RedisManager.GetDatabase().KeyExists(cacheKey))
            {
                using (var context = new DataDbContext())
                {
                    var minDate = context.Measurements.Min(m => m.MeasurementDate);
                    var maxDate = context.Measurements.Max(m => m.MeasurementDate);

                    var allData = context.Measurements
                        .Where(s => s.MeasurementDate >= minDate && s.MeasurementDate <= maxDate)
                        .AsNoTracking()
                        .ToList();

                    foreach (var item in allData)
                    {
                        RedisManager.GetDatabase().SortedSetAdd(
                            cacheKey,
                            JsonConvert.SerializeObject(item),
                            item.MeasurementDate.ToUnixSeconds()
                        );
                    }
                }
            }

            var data = RedisManager.GetDatabase().SortedSetRangeByScore(
                        cacheKey,
                        DateTimeUtils.ToUnixSeconds(from),
                        DateTimeUtils.ToUnixSeconds(to)
            );

            return data.Select(d => JsonConvert.DeserializeObject<Measurement>(d)).ToList();
        }
    }
}

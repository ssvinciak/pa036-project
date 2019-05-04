using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using pa036.api.Redis;
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
                        .AsNoTracking()
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
                        .ToList();
            }
        }

        public List<Measurement> GetDataWithEFCacheWithRedis(DateTime from, DateTime to)
        {
            List<Measurement> cached = null;
            string cacheKey = RedisConstants.EFCacheRedis_CacheKey;
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
            string cacheKey = RedisConstants.NoEFCacheRedis_CacheKey;
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
            RedisManager.GetDatabase().KeyExpire(cacheKey, new TimeSpan(0, 5, 0));
        }
    }
}

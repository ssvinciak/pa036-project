using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using pa036.api.Redis;
using pa036.api.Utils;
using pa036.db;
using pa036.db.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.IO;
using System.Linq;

namespace pa036.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataController : ControllerBase
    {
        [Route("test")]
        public JsonResult Get(int cacheType, DateTime from, DateTime to)
        {
            return new JsonResult(from);
        }

        [HttpGet]
        public JsonResult Get(string cacheType, string from, string to)
        {
            DateTime.TryParse(from, out var fromDate);
            DateTime.TryParse(to, out var toDate);
            int cache;
            int.TryParse(cacheType, out cache);
            switch (cache)
            {
                case (int) CacheTypes.EFNoCacheNoRedis:
                    return GetEFNoCacheNoRedis(fromDate, toDate);

                case 2:
                    return GetEFCacheNoRedis(fromDate, toDate);

                case 3:
                    break;

                case (int)CacheTypes.EFCacheRedis:
                    return GetRedis(fromDate, toDate);

                default:
                    throw new InvalidEnumArgumentException();
            }
            throw new NotImplementedException();
        }

        private JsonResult GetEFNoCacheNoRedis(DateTime from, DateTime to)
        {
            using (var context = new DataDbContext())
            {
                var watch = System.Diagnostics.Stopwatch.StartNew();
                var data = context
                    .Measurements
                    .Where(s => s.MeasurementDate >= from && s.MeasurementDate <= to)
                    .AsNoTracking()
                    .ToList();
                watch.Stop();
                var path = Path.Combine(System.AppDomain.CurrentDomain.BaseDirectory, "time.txt");
                using (StreamWriter sw = System.IO.File.AppendText(path))
                {
                    sw.WriteLine(watch.ElapsedMilliseconds);
                }

                return new JsonResult(data);
            }
        }

        private JsonResult GetEFCacheNoRedis(DateTime from, DateTime to)
        {
            using (var context = new DataDbContext())
            {
                var watch = System.Diagnostics.Stopwatch.StartNew();
                var data = context
                    .Measurements
                    .Where(s => s.MeasurementDate >= from && s.MeasurementDate <= to)
                    .ToList();
                watch.Stop();
                var path = Path.Combine(System.AppDomain.CurrentDomain.BaseDirectory, "time.txt");
                using (StreamWriter sw = System.IO.File.AppendText(path))
                {
                    sw.WriteLine(watch.ElapsedMilliseconds);
                }

                return new JsonResult(data);
            }
        }

        private JsonResult GetRedis(DateTime from, DateTime to)
        {
            using (var context = new DataDbContext())
            {
                const string cacheKey = "1";
                if (!RedisManager.GetDatabase().KeyExists(cacheKey))
                {
                    var data = context
                    .Measurements
                    .Where(s => s.MeasurementDate >= from && s.MeasurementDate <= to)
                    .ToList();
                    RedisManager.GetDatabase().StringSet(cacheKey, JsonConvert.SerializeObject(data));
                } else
                {
                    var oldcache = JsonConvert.DeserializeObject<List<Measurement>>(RedisManager.GetDatabase().StringGet(cacheKey));
                    var newData = context.Measurements
                        .Where(s => s.MeasurementDate > oldcache.Last().MeasurementDate && s.MeasurementDate <= to)
                        .ToList();
                    var newCache = oldcache.SkipWhile(o => o.MeasurementDate < from).ToList();
                    newCache.AddRange(newData);
                    RedisManager.GetDatabase().StringSet(cacheKey, JsonConvert.SerializeObject(newCache));
                }
                
                var cached = JsonConvert.DeserializeObject<List<Measurement>>(RedisManager.GetDatabase().StringGet(cacheKey));

                return new JsonResult(cached);
            }
        }
    }
}

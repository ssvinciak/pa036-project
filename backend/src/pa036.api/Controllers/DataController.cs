using Microsoft.AspNetCore.Mvc;
using pa036.api.Services;
using pa036.api.Utils;
using System;
using System.ComponentModel;
using System.IO;

namespace pa036.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataController : ControllerBase
    {
        private DataService _dataService = new DataService();

        [HttpGet]
        public JsonResult Get(int cacheType, DateTime from, DateTime to)
        {
            switch (cacheType)
            {
                case (int)CacheTypes.EFNoCacheNoRedis:
                    return GetEFNoCacheNoRedis(from, to);

                case (int) CacheTypes.EFCacheNoRedis:
                    return GetEFCacheNoRedis(from, to);

                case (int)CacheTypes.EFNoCacheRedis:
                    return GetNoEFCacheRedis(from, to);

                case (int)CacheTypes.EFCacheRedis:
                    return GetEFCacheRedis(from, to);

                default:
                    throw new InvalidEnumArgumentException();
            }
            throw new NotImplementedException();
        }

        private JsonResult GetEFNoCacheNoRedis(DateTime from, DateTime to)
        {
            var watch = System.Diagnostics.Stopwatch.StartNew();
            var data = _dataService.GetDataNoEFCacheNoRedis(from, to);
            watch.Stop();
            var path = Path.Combine(System.AppDomain.CurrentDomain.BaseDirectory, "time.txt");
            using (StreamWriter sw = System.IO.File.AppendText(path))
            {
                sw.WriteLine(watch.ElapsedMilliseconds);
            }

            return new JsonResult(data);
        }

        private JsonResult GetEFCacheNoRedis(DateTime from, DateTime to)
        {
            var watch = System.Diagnostics.Stopwatch.StartNew();
            var data = _dataService.GetDataWithEFCacheNoRedis(from, to);
            watch.Stop();
            var path = Path.Combine(System.AppDomain.CurrentDomain.BaseDirectory, "time.txt");
            using (StreamWriter sw = System.IO.File.AppendText(path))
            {
                sw.WriteLine(watch.ElapsedMilliseconds);
            }

            return new JsonResult(data);
        }

        private JsonResult GetEFCacheRedis(DateTime from, DateTime to)
        {
            var data = _dataService.GetDataWithEFCacheWithRedis(from, to);
            return new JsonResult(data);
        }

        private JsonResult GetNoEFCacheRedis(DateTime from, DateTime to)
        {
            var data = _dataService.GetDataNoEFCacheWithRedis(from, to);
            return new JsonResult(data);
        }
    }
}

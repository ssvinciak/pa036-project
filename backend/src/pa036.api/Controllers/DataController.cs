using System;
using System.ComponentModel;
using System.Diagnostics;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using pa036.db;


namespace pa036.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataController : ControllerBase
    {
        [HttpGet]
        public JsonResult Get(int cacheType, string from, string to)
        {
            DateTime.TryParse(from, out var fromDate);
            DateTime.TryParse(to, out var toDate);

            switch (cacheType)
            {
                case 1:
                    return GetEFNoCacheNoRedis(fromDate, toDate);
                case 2:
                    return GetEFCacheNoRedis(fromDate, toDate);
                case 3:
                    break;
                case 4:
                    break;
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
    }
}

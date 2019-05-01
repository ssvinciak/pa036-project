using System;
using System.Diagnostics;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
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
        public JsonResult Get(string from, string to)
        {
            DateTime.TryParse(from, out var fromDate);
            DateTime.TryParse(to, out var toDate);
            using (var context = new DataDbContext())
            {
                var watch = System.Diagnostics.Stopwatch.StartNew();
                var data = context
                    .Measurements
                    .Where(s => s.MeasurementDate >= fromDate && s.MeasurementDate <= toDate)
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
    }

    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        [HttpGet]
        public JsonResult Get()
        {
            using (var context = new DataDbContext())
            {
                //var watch = System.Diagnostics.Stopwatch.StartNew();
                var data = context.Measurements.Where(s => s.MeasurementDate.Year == 1986).ToList();
                //watch.Stop();
                //var path = Path.Combine(System.AppDomain.CurrentDomain.BaseDirectory, "time.txt");
                /*using (StreamWriter sw = System.IO.File.AppendText(path))
                {
                    sw.WriteLine(watch.ElapsedMilliseconds);
                }*/
                return new JsonResult(data);
            }

        }
    }
}

using Microsoft.AspNetCore.Mvc;
using pa036.db;
using System.Linq;

namespace pa036.api.Controllers
{
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

using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using pa036.db;

namespace pa036.api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataController : ControllerBase
    {
        [HttpGet]
        public JsonResult Get()
        {
            using (var context = new DataDbContext())
            {
                var data = context.Measurements.Where(s => s.MeasurementDate.Year == 1985).ToList();
                return new JsonResult(data);
            }
            
        }
    }
}
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using pa036.api.Redis;

namespace pa036.api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            RedisManager.RemoveCachedKeys();
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }
}

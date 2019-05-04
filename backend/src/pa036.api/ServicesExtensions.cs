using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using pa036.db;

namespace pa036.api
{
    public static class ServiceExtensions
    {
        public static void ConfigureCors(this IServiceCollection services)
        {
            var allowedUrls = new string[]
            {
                "http://localhost:3000",
                "http://www.localhost:3000",
                "https://localhost:3000",
                "https://www.localhost:3000"
            };

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.WithOrigins("http://localhost:3000")
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
            });
        }

        public static void ConfigureMssqlContext(this IServiceCollection services, IConfiguration config)
        {
            var connectionString = config.GetConnectionString("connectionStringMeasurements");
            services.AddDbContext<DataDbContext>(options => options.UseSqlServer(connectionString));
        }
    }
}

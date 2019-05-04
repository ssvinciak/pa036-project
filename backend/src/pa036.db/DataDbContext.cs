using Microsoft.EntityFrameworkCore;
using pa036.db.Models;

namespace pa036.db
{
    public class DataDbContext : DbContext
    {
        public DbSet<Measurement> Measurements { get; set; }

        public static string ConnectionString { get; } =
            "Server=(localdb)\\mssqllocaldb;Database=pa036;Trusted_Connection=True; Integrated Security=true;";

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(ConnectionString);
        }
    }
}

using Microsoft.EntityFrameworkCore;
using pa036.db.Entities;
using pa036.db.DataDbInitializer;

namespace pa036.db
{
    public class DataDbContext : DbContext
    {
        public DataDbContext()
        {
            Database.SetInitializer(new DataDbInitializer());
        }

        public DbSet<Measurement> Measurements { get; set; }
    }
}

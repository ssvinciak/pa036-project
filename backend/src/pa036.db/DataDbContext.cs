using Microsoft.EntityFrameworkCore;
using pa036.db.Entities;

namespace pa036.db
{
    public class DataDbContext : DbContext
    {
        public DataDbContext()
        {
            // TODO: 
            // 2 options for default data
            // 1. here add code for parsing data from csv and store to db
            // 2. add migration with data
        }

        public DbSet<Measurement> Measurements { get; set; }
    }
}

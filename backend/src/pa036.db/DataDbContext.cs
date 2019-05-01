﻿using Microsoft.EntityFrameworkCore;
using pa036.db.Entities;

namespace pa036.db
{
    public class DataDbContext : DbContext
    {
        public DbSet<Measurement> Measurements { get; set; }

        public static string ConnectionString { get; } =
            "Server=(localdb)\\mssqllocaldb;Database=pa036.dbo.Measurements;Trusted_Connection=True;";

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(ConnectionString);
        }
    }
}

using System;
using System.Linq;
using pa036.db;

namespace pa036.cli
{
    public class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");
            using (var context = new DataDbContext())
            {
                Console.WriteLine(context.Measurements.First());
            }
        }
    }
}

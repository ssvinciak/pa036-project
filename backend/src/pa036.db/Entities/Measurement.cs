using System;
using System.ComponentModel.DataAnnotations;

namespace pa036.db.Entities
{
    public class Measurement
    {
        [Key]
        public int Id { get; set; }

        public DateTime MeasurementDate { get; set; }

        public double Temperature { get; set; }
    }
}

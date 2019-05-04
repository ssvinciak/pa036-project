using System;
using System.ComponentModel.DataAnnotations;

namespace pa036.db.Models
{
    public class Measurement
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public DateTime MeasurementDate { get; set; }

        public double Temperature { get; set; }
    }
}

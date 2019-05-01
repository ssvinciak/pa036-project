using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace pa036.db.Entities
{
    public class Measurement
    {
        [Key]
        public int Id { get; set; }

        public DateTime MeasurementDate { get; set; }

        public float Temperature { get; set; }
    }
}

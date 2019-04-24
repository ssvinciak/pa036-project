using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace pa036.db.Entities
{
    public class Measurement
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Key { get; set; }

        // TODO: add other properties for
    }
}

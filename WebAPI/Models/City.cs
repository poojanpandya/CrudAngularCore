using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class City
    {
        [Key]
        public int CityId { get; set; }

        [ForeignKey("State")]
        [Required]
        public int StateId { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        [Required]
        public string CityName { get; set; }
    }
}

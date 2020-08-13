using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class State
    {
        [Key]
        public int StateId { get; set; }

       
        [ForeignKey("Country")]
        [Required]
        public int CountryId { get; set; }


        [Column(TypeName = "nvarchar(100)")]
        [Required]
        public string StateName { get; set; }
    }
}

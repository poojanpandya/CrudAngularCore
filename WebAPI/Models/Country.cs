using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Country
    {    
            [Key]
            public int CountryId { get; set; }
            [Required]
            [Column(TypeName = "nvarchar(100)")]
            public string CountryName { get; set; }
        
    }
}

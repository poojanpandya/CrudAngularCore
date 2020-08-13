using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class PaymentDetail
    {
        [Key]
        public int PMId { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(100)")]
        public string CardOwnerName { get; set; }
        [Required]
        [Column(TypeName = "varchar(16)")]
        public string CardNumber { get; set; }
        [Required]
        [Column(TypeName = "varchar(5)")]
        public string ExpirationDate { get; set; }
        [Required]
        [Column(TypeName = "varchar(3)")]
        public string CVV { get; set; }
        [ForeignKey("Country")]
        [Required]
        [Column(TypeName = "int")]
        public int CountryId { get; set; }
        [ForeignKey("State")]
        [Required]
        [Column(TypeName = "int")]
        public int StateId { get; set; }
        [ForeignKey("City")]
        [Required]
        [Column(TypeName = "int")]
        public int CityId { get; set; }
        [Column(TypeName = "int")]
        public int Gender { get; set; }
        [Column(TypeName = "nvarchar(MAX)")]
        public string Address { get; set; }


    }
}

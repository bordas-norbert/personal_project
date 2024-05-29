using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Controllers.Models
{
    public class Addresses
    {
        public int Client_id { get; set; }
        [Key]
        public int Address_id { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public short Number { get; set; }


    }
}

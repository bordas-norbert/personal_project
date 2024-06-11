using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Controllers.Models
{
    public class Orders
    {
        [Key]
        [Column("order_id")]
        public int OrderId { get; set; }
        [Column("client_id")]
        public int ClientId { get; set; }
        [Column("order_date")]
        public DateTime OrderDate { get; set; }
        public string Comment { get; set; }
        [Column("shipper_id")]
        public int ShipperId { get; set; }
        [Column("address_id")]
        public int AddressId { get; set; }
    }
}

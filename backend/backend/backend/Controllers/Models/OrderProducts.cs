using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Controllers.Models
{
    [Table("order_products")]
    public class OrderProducts
    {
        [Key]
        [Column("order_id")]
        public int OrderId { get; set; }
        [Column("product_id")]
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        [Column("unit_price")]
        public decimal UnitPrice { get; set; }

    }
}

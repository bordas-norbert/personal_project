using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Controllers.Models
{
    public class Products
    {
        [Key]
        [Column("product_id")]
        public int ProductId { get; set; }
        
        [Column("category_id")]
        public int CategoryId { get; set; }
        [Column("quantity_in_stock")]
        public int QuantityInStock { get; set; }
        public string Name { get; set; }
        [Column("unit_price")]
        public decimal UnitPrice { get; set; }

    }
}

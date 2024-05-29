using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Controllers.Models
{
    public class Categories
    {
        [Key]
        [Column("category_id")]
        public int CategoryId { get; set; }
        [Column("name")]
        public string CategoryName { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Controllers.Models
{
    public class Coupons
    {
        [Key]
        [Column("coupon_id")]
        public int CouponId { get; set; }
        [Column("client_id")]
        public int ClientId { get; set; }
        [Column("percentage_discount")]
        public decimal PercentageDiscount { get; set; }
        [Column("coupon_code")]
        public string CouponCode { get; set; }
    }
}

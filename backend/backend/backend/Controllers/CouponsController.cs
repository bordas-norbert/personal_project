using backend.Controllers.Models;
using backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CouponsController : Controller
    {
        private readonly BackendDbContext _backendDbContext;
        public CouponsController(BackendDbContext backendDbContext)
        {
            _backendDbContext = backendDbContext;
        }

        [HttpPost]
        public async Task<IActionResult> AddCoupon(Coupons coupon)
        {
            await _backendDbContext.Coupons.AddAsync(coupon);
            await _backendDbContext.SaveChangesAsync();
            return Ok(coupon);
        }
        [HttpPost]
        [Route("validate")]
        public async Task<IActionResult> ValidateCoupon([FromBody] string[] data)
        {
            var clientId = int.Parse(data[0]);
            var couponCode = data[1];

            var coupon = await _backendDbContext.Coupons.FirstOrDefaultAsync(c => c.CouponCode == couponCode && c.ClientId == clientId);
            if (coupon == null)
            {
                return NotFound();
            }
            _backendDbContext.Coupons.Remove(coupon);
            await _backendDbContext.SaveChangesAsync();
            return Ok(coupon.PercentageDiscount);
        }
    }
}

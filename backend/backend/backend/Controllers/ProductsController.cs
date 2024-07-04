using backend.Controllers.Models;
using backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : Controller
    {
        private readonly BackendDbContext _backendDbContext;
        public ProductsController(BackendDbContext backendDbContext)
        {
            _backendDbContext = backendDbContext;
        }
        [HttpPost]
        public async Task<IActionResult> AddProduct([FromBody] Products product)
        {
            await _backendDbContext.Products.AddAsync(product);
            await _backendDbContext.SaveChangesAsync();
            return Ok(product);
        }
        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
            var products = await _backendDbContext.Products.ToListAsync();
            return Ok(products);
        }
    }
}

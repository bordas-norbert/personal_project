using backend.Controllers.Models;
using backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class OrdersController : Controller
    {
        private readonly BackendDbContext _backendDbContext;
        public OrdersController(BackendDbContext backendDbContext)
        {
            _backendDbContext = backendDbContext;
        }
        [HttpPost]
        public async Task<IActionResult> AddOrder([FromBody] OrderRequest orderRequest)
        {
            if (ModelState.IsValid)
            {
                using var transaction = await _backendDbContext.Database.BeginTransactionAsync();
                var order = orderRequest.Order;
                order.OrderDate = DateTime.Now;
                var products = orderRequest.Products;
                var quantities = orderRequest.Quantities;
                try
                {
                    await _backendDbContext.Orders.AddAsync(order);
                    await _backendDbContext.SaveChangesAsync();

                    int generatedOrderId = order.OrderId;
                    int counter = 0;
                    foreach(var product in products)
                    {
                        var orderProduct = new OrderProducts
                        {
                            OrderId = generatedOrderId,
                            ProductId = product.ProductId,
                            Quantity = quantities[counter],
                            UnitPrice = product.UnitPrice
                        };
                        await _backendDbContext.OrderProducts.AddAsync(orderProduct);
                        counter++;
                    }

                    await _backendDbContext.SaveChangesAsync();

                    await transaction.CommitAsync();

                    return Ok("Succesfully added the order and the products");
                }

                catch (Exception ex) 
                {
                    await transaction.RollbackAsync();
                    throw ex;
                }
            }
            return Ok(orderRequest);
        }
    }
}

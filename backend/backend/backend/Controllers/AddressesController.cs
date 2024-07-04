using backend.Controllers.Models;
using backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController] 
    [Route("api/[controller]")]
    public class AddressesController : Controller
    {
        
        private readonly BackendDbContext _backendDbContext;
        public AddressesController(BackendDbContext backendDbContext)
        {
            _backendDbContext = backendDbContext;
        }

        [HttpPost]
        public async Task<IActionResult> AddAddress([FromBody]Addresses clientAddress)
        {
            await _backendDbContext.Addresses.AddAsync(clientAddress);
            await _backendDbContext.SaveChangesAsync();
            return Ok(clientAddress);
        }
        [HttpGet]
        [Route("{clientId:int}")]
        public async Task<IActionResult> GetAllAddresses(string clientId)
        {
            
            var addresses = await _backendDbContext.Addresses.Where(a => a.Client_id == int.Parse(clientId)).ToListAsync();
            return Ok(addresses);
        }
        [HttpPut]
        public async Task<IActionResult> UpdateAddress(Addresses newAddress)
        {
            var address = await _backendDbContext.Addresses.FindAsync(newAddress.Address_id);

            if (address == null)
                return NotFound();

            address.Address_id = newAddress.Address_id;
            address.Client_id = newAddress.Client_id;
            address.City = newAddress.City;
            address.Street = newAddress.Street;
            address.Number = newAddress.Number;

            await _backendDbContext.SaveChangesAsync();

            return Ok(address);


        }
        [HttpDelete]
        [Route("{address_id:int}")]
        public async Task<IActionResult> DeleteAddress([FromRoute]int address_id)
        {
            var adr = await _backendDbContext.Addresses.FindAsync(address_id);

            if (adr == null)
                return NotFound();

            _backendDbContext.Addresses.Remove(adr);
            await _backendDbContext.SaveChangesAsync();

            return Ok();
        }
    }
}

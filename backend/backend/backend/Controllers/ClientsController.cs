using backend.Controllers.Models;
using backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json.Nodes;

namespace backend.Controllers
{
    [ApiController] //it won't be having any views
    [Route("api/[controller]")]
    public class ClientsController : Controller
    {
        private readonly BackendDbContext _backendDbContext;
        public ClientsController(BackendDbContext backendDbContext)
        {
            _backendDbContext = backendDbContext; 
        }

        [HttpGet]
        public async Task<IActionResult> GetAllClients()
        {
            var clients = await _backendDbContext.Clients.ToListAsync();
            return Ok(clients);
        }

        [HttpPost]
        public async Task<IActionResult> AddClient([FromBody] Clients clientRequest)
        {
            if(clientRequest == null)
            {
                return BadRequest();
            }
            await _backendDbContext.Clients.AddAsync(clientRequest);
            await _backendDbContext.SaveChangesAsync();
            return Ok(clientRequest);
        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> GetClient([FromRoute] int id)
        {
            var client = await _backendDbContext.Clients.FirstOrDefaultAsync(x => x.ClientId == id);

            if(client == null)
            {
                return NotFound();
            }
            return Ok(client);
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> LoginClient(string[] arr)
        {
            var x = arr;

            
            var client = await _backendDbContext.Clients.FirstOrDefaultAsync(x => x.Password == arr[1] && x.Username == arr[0]);

            if (client == null)
                return NotFound();

            return Ok(client);
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> UpdateClient([FromRoute] int id, Clients updateClient)
        {
            var client = await _backendDbContext.Clients.FindAsync(id);

            if(client == null)
            {
                return NotFound();
            }

            client.Email = updateClient.Email;
            client.FullName = updateClient.FullName;
            client.PhoneNumber = updateClient.PhoneNumber;
            client.Username = updateClient.Username;
            client.Password = updateClient.Password;

            await _backendDbContext.SaveChangesAsync();

            return Ok(client);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> DeleteClient([FromRoute] int id)
        {
            var client = await _backendDbContext.Clients.FindAsync(id);

            if (client == null)
                return NotFound();

            _backendDbContext.Clients.Remove(client);
            await _backendDbContext.SaveChangesAsync();

            return Ok();
        }
    }
}

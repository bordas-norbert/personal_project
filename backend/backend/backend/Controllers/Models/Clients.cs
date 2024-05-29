using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Controllers.Models
{
    public class Clients
    {
        [Key]
        [Column("client_id")]
        public int ClientId { get; set; }
        public string Password { get; set; }
        [Column("full_name")]
        public string FullName { get; set; }
        public string Email { get; set; }
        [Column("phone_number")]
        public string PhoneNumber { get; set; }
        public string Username { get; set; }
        [Column("user_role")]
        public string UserRole { get; set; }
       
    }
}

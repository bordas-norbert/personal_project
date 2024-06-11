namespace backend.Controllers.Models
{
    public class OrderRequest
    {
        public Orders Order { get; set; }
        public List<Products> Products { get; set; }
        public List<int> Quantities { get; set; }
    }
}

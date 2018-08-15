using System.ComponentModel.DataAnnotations;

namespace Bookstore.API.Dtos
{
    public class ReturnBookDto
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Author { get; set; }

        public decimal Price { get; set; }

        public int Quantity { get; set; }
    }
}
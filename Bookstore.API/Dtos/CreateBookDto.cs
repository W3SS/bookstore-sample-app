using System.ComponentModel.DataAnnotations;

namespace Bookstore.API.Dtos
{
    public class CreateBookDto
    {
        [Required]
        public string Title { get; set; }

        [Required]
        public string Author { get; set; }

        [Required]
        public decimal Price { get; set; }

        [Required]
        [Range(0, 1000)]
        public int Quantity { get; set; }
    }
}
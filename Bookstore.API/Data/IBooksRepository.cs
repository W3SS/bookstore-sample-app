using System.Collections.Generic;
using System.Threading.Tasks;
using Bookstore.API.Dtos;
using Bookstore.API.Models;

namespace Bookstore.API.Data
{
    public interface IBooksRepository
    {
        Task Add(Book book);

        Task<IEnumerable<Book>> GetBooks();

        Task<Book> GetById(int id);

        void Remove(Book book);

        Task<bool> SaveAll();
    }
}
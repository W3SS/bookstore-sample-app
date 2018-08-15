using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bookstore.API.Dtos;
using Bookstore.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Bookstore.API.Data
{
    public class BooksRepository : IBooksRepository
    {
        private readonly DataContext context;

        public BooksRepository(DataContext context)
        {
            this.context = context;
        }

        public async Task Add(Book book)
        {
            await this.context.Books.AddAsync(book);
        }

        public async Task<IEnumerable<Book>> GetBooks()
        {
            var books = await this.context.Books.ToListAsync();
            return books;
        }

        public async Task<Book> GetById(int id)
        {
            var book = await this.context.Books.FirstOrDefaultAsync(x => x.Id == id);
            return book;
        }

        public void Remove(Book book)
        {
            this.context.Books.Remove(book);
        }

        public async Task<bool> SaveAll()
        {
            return await context.SaveChangesAsync() > 0;
        }
    }
}
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Bookstore.API.Data;
using Bookstore.API.Dtos;
using Bookstore.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Bookstore.API.Controllers
{
    [Route("api/[controller]")]
    public class BooksController : Controller
    {
        private readonly IBooksRepository repo;
        private readonly IMapper mapper;

        public BooksController(IBooksRepository repo, IMapper mapper)
        {
            this.repo = repo;
            this.mapper = mapper;
        }

        // GET api/books
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var books = await this.repo.GetBooks();

            var booksToReturn = mapper.Map<IEnumerable<ReturnBookDto>>(books);

            return Ok(booksToReturn);
        }

        // GET api/books/5
        [HttpGet("{id}", Name = "GetById")]
        public async Task<IActionResult> GetById(int id)
        {
            var book = await this.repo.GetById(id);

            if (book == null)
            {
                return NotFound();
            }

            var bookToReturn = this.mapper.Map<ReturnBookDto>(book);

            return Ok(bookToReturn);
        }

        // POST api/books
        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]CreateBookDto bookToCreate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var book = mapper.Map<Book>(bookToCreate);

            await this.repo.Add(book);

            var bookToReturn = mapper.Map<ReturnBookDto>(book);

            if (await this.repo.SaveAll())
            {
                return CreatedAtRoute("GetById", new { id = bookToReturn.Id }, bookToReturn);
            }

            throw new Exception("Failed to create book!");
        }

        // PUT api/books/5
        [Authorize]
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody]CreateBookDto updatedBook)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var bookFromRepo = await this.repo.GetById(id);

            if (bookFromRepo == null)
            {
                return NotFound();
            }

            this.mapper.Map(updatedBook, bookFromRepo);

            if (await this.repo.SaveAll())
            {
                return NoContent();
            }

            throw new Exception($"Failed to update book {id}!");
        }

        // DELETE api/books/5
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var book = await this.repo.GetById(id);

            if (book == null)
            {
                return NotFound();
            }

            this.repo.Remove(book);

            if (await this.repo.SaveAll())
            {
                return NoContent();
            }

            throw new Exception($"Failed to delete book {id}");
        }

        [Authorize]
        [HttpPost("{id}")]
        public async Task<IActionResult> Order(int id)
        {
            var book = await this.repo.GetById(id);

            if (book == null)
            {
                return NotFound();
            }

            if (book.Quantity < 1)
            {
                return this.BadRequest("Item is out of stock.");
            }

            book.Quantity--;

            if (await this.repo.SaveAll())
            {
                return Ok(book.Quantity);
            }

            throw new Exception($"Failed to order book {id}!");
        }
    }
}

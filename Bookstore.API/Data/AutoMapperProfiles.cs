using System.Linq;
using AutoMapper;
using Bookstore.API.Dtos;
using Bookstore.API.Models;

namespace Bookstore.API.Data
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<CreateBookDto, Book>();
            CreateMap<Book, ReturnBookDto>();
        }
    }
}
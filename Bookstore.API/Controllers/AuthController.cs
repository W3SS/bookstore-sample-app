using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Bookstore.API.Data;
using Bookstore.API.Dtos;
using Bookstore.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Bookstore.API.Controllers
{
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly IAuthRepository repository;
        private readonly IConfiguration config;

        public AuthController(IAuthRepository repository, IConfiguration config)
        {
            this.repository = repository;
            this.config = config;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody]RegisterUserDto registerUserDto)
        {   
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if(!string.IsNullOrEmpty(registerUserDto?.Username))
            {
                registerUserDto.Username = registerUserDto.Username.ToLower();
            }

            if (await repository.UserExists(registerUserDto.Username))
            {
                ModelState.AddModelError("Username", "Username is taken.");
                return BadRequest(ModelState);
            }

            var userModel = new User
            {
                Username = registerUserDto.Username
            };

            var registeredUser = await repository.Register(userModel, registerUserDto.Password);

            return this.StatusCode(201);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody]LoginUserDto loginUserDto)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await repository.Login(loginUserDto.Username.ToLower(), loginUserDto.Password);

            if(user == null)
            {
                return BadRequest("Invalid username or password!");
            }

            var token = this.CreateJwtToken(user);

            return Ok(new {token});
        }

        private string CreateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(config.GetSection("AppSettings:Token").Value);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.Username.ToString()),
                }),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha512Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}

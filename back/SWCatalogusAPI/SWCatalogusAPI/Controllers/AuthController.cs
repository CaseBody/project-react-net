using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;

namespace SWCatalogusAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly DataContext dataContext;
        private readonly IConfiguration configuration;

        public AuthController(DataContext dataContext, IConfiguration configuration)
        {
            this.dataContext = dataContext;
            this.configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<ActionResult<Gebruiker>> Register(GebruikerDto request)
        {
            IQueryable<Gebruiker> dataGebruiker = dataContext.Gebruikers.Where(g => g.Name == request.Name);
            if (dataGebruiker.Count() != 0)
            {
                return BadRequest();
            }

            Gebruiker gebruiker = new Gebruiker();
            CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);

            gebruiker.Name = request.Name;
            gebruiker.PasswordHash = passwordHash;
            gebruiker.PasswordSalt = passwordSalt;

            dataContext.Gebruikers.Add(gebruiker);
            dataContext.SaveChanges();

            return Ok(gebruiker);
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(GebruikerDto request)
        {
            IQueryable<Gebruiker> dataGebruiker = dataContext.Gebruikers.Where(g => g.Name == request.Name);
            if (dataGebruiker.Count() == 0)
            {
                return NotFound("Gebruiker niet gevonden");
            }

            var gebruiker = dataGebruiker.First();
            if (!VerifyPasswordHash(request.Password, gebruiker.PasswordHash, gebruiker.PasswordSalt))
            {
                return BadRequest("Naam en wachtwoord komen niet overeen");
            }

            return Ok(CreateJWT(gebruiker));
        }

        private string CreateJWT(Gebruiker gebruiker)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, gebruiker.Id.ToString())
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(configuration.GetSection("AppSettings:Token").Value));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: cred);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }
    }
}

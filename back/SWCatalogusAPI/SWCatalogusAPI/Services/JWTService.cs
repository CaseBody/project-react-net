using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;

namespace SWCatalogusAPI.Services
{
    public class JWTService
    {
        private string secretKey;
        public JWTService(string secretKey)
        {
            this.secretKey = secretKey;
        }
        public string CreateJWT(Gebruiker gebruiker)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim("gebruiker", gebruiker.Id.ToString())
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(secretKey));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: cred);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public bool ValidateAndReadJWT(string token, out ClaimsPrincipal? decodedToken)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var validationParameters = GetValidationParameters();

                SecurityToken securityToken;
                decodedToken = tokenHandler.ValidateToken(token, validationParameters, out securityToken);

                return true;
            }
            catch
            {
                decodedToken = null;
                return false;
            }
        }

        private  TokenValidationParameters GetValidationParameters()
        {
            return new TokenValidationParameters()
            {
                ValidateLifetime = true,
                ValidateAudience = false,
                ValidateIssuer = false,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey))
            };
        }


    }
}

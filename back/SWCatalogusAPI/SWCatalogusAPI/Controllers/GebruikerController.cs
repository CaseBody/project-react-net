using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SWCatalogusAPI.Services;
using System.Security.Claims;

namespace SWCatalogusAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GebruikerController : ControllerBase
    {
        private JWTService jwtService;
        private readonly DataContext dataContext;
        public GebruikerController(IConfiguration configuration, DataContext dataContext)
        {
            jwtService = new JWTService(configuration.GetSection("AppSettings:Token").Value);
            this.dataContext = dataContext;
        }

        [HttpGet]
        public async Task<ActionResult<Gebruiker>> GetGebruiker(string id, string token)
        {
            if (jwtService.ValidateAndReadJWT(token, out ClaimsPrincipal? validatedToken))
            {
                try
                {
                    var user = validatedToken.Claims.First(c => c.Type == "gebruiker").Value;

                    if (user != id)
                    {
                        return BadRequest();
                    }

                    var gebruiker = await dataContext.Gebruikers.FindAsync(int.Parse(id));
                    if (gebruiker == null)
                        return NotFound();

                    return Ok(gebruiker);
                }
                catch
                {
                    return BadRequest();
                }

            }
            else
            {
                return Unauthorized("JWT was invalid.");
            }
        }

        [HttpGet("opgeslagen")]
        public async Task<ActionResult<List<Item>>> GetOpgeslagenItems(string id, string token)
        {
            if (jwtService.ValidateAndReadJWT(token, out ClaimsPrincipal? validatedToken))
            {
                try
                {
                    var user = validatedToken.Claims.First(c => c.Type == "gebruiker").Value;

                    if (user != id)
                    {
                        return BadRequest();
                    }

                    var items = dataContext.OpgeslagenItems.Where(i => i.GebruikerId == int.Parse(id));
                    if (items == null)
                        return NotFound();

                    var list_opgeslagen = new List<OpgeslagenItem>(items);
                    List<Item> films = new List<Item>();
                    foreach (var item in list_opgeslagen)
                    {
                        var x = dataContext.Items.Where(i => i.Id == item.ItemId).FirstOrDefault();
                        if (x != null)
                        {
                            films.Add(x);
                        }

                    }

                    return Ok(films);
                }
                catch
                {
                    return BadRequest();
                }

            }
            else
            {
                return Unauthorized("JWT was invalid.");
            }
        }
    }
}

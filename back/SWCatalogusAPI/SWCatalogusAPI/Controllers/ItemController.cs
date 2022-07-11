using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SWCatalogusAPI.Models;

namespace SWCatalogusAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<List<Item>>> Get()
        {
            var i = new List<Item>();
            return Ok(i);
        }
    }
}

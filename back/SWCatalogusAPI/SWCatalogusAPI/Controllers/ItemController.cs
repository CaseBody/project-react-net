using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace SWCatalogusAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly DataContext dataContext;

        public ItemController(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        [HttpGet]
        public async Task<ActionResult<List<Item>>> Get()
        {
            return Ok(await dataContext.Items.ToListAsync());
        }

        [HttpGet("id")]
        public async Task<ActionResult<List<Item>>> Get(int id)
        {
            var item = await dataContext.Items.FindAsync(id);
            if (item == null)
                return NotFound();

            return Ok(item);
        }
    }
}

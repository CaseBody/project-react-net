using Microsoft.EntityFrameworkCore;

namespace SWCatalogusAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        public DbSet<Item> Items { get; set; }
        public DbSet<Gebruiker> Gebruikers { get; set; }
        public DbSet<OpgeslagenItem> OpgeslagenItems { get; set; }

    }
}

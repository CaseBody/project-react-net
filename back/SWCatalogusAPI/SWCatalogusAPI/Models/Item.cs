namespace SWCatalogusAPI.Models
{
    public class Item
    {
        public int Id { get; set; }
        public string Titel { get; set; } = string.Empty;
        public string Categorie { get; set; } = string.Empty;
        public int UitgaveJaar { get; set; }
    }
}

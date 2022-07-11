using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SWCatalogusAPI.Migrations
{
    public partial class AddAfbeelding : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Afbeelding",
                table: "Items",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Afbeelding",
                table: "Items");
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Home.Shopping.Migrations
{
    /// <inheritdoc />
    public partial class RenameShopppingListItem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_ShoppingItems",
                table: "ShoppingItems");

            migrationBuilder.RenameTable(
                name: "ShoppingItems",
                newName: "ShoppingListItems");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ShoppingListItems",
                table: "ShoppingListItems",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_ShoppingListItems",
                table: "ShoppingListItems");

            migrationBuilder.RenameTable(
                name: "ShoppingListItems",
                newName: "ShoppingItems");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ShoppingItems",
                table: "ShoppingItems",
                column: "Id");
        }
    }
}

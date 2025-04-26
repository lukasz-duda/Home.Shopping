using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Home.Shopping.Migrations
{
    /// <inheritdoc />
    public partial class ItemInShoppingCart : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AddedToCartBy",
                table: "ShoppingListItems",
                type: "longtext",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "InShoppingCart",
                table: "ShoppingListItems",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "TimeAddedToCart",
                table: "ShoppingListItems",
                type: "datetime(6)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AddedToCartBy",
                table: "ShoppingListItems");

            migrationBuilder.DropColumn(
                name: "InShoppingCart",
                table: "ShoppingListItems");

            migrationBuilder.DropColumn(
                name: "TimeAddedToCart",
                table: "ShoppingListItems");
        }
    }
}

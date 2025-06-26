using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Home.Shopping.Migrations
{
    /// <inheritdoc />
    public partial class CorrectCharset : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"ALTER TABLE MatchFragment
MODIFY `Name` longtext CHARACTER SET utf8mb4;
ALTER TABLE MatcherGroups
MODIFY `Name` longtext CHARACTER SET utf8mb4;
ALTER TABLE ShoppingListItems
MODIFY `Name` longtext CHARACTER SET utf8mb4;");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}

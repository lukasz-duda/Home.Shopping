using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Home.Shopping.Migrations
{
    /// <inheritdoc />
    public partial class AddMatchFragmentName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "MatchFragment",
                type: "longtext",
                nullable: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "MatchFragment");
        }
    }
}

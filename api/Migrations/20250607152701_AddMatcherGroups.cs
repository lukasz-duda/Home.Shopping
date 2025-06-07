using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Home.Shopping.Migrations
{
    /// <inheritdoc />
    public partial class AddMatcherGroups : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MatcherGroups",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    Name = table.Column<string>(type: "longtext", nullable: false),
                    OrdinalNumber = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MatcherGroups", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "MatchFragment",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    MatchString = table.Column<string>(type: "longtext", nullable: false),
                    Priority = table.Column<int>(type: "int", nullable: false),
                    MatcherGroupId = table.Column<Guid>(type: "char(36)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MatchFragment", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MatchFragment_MatcherGroups_MatcherGroupId",
                        column: x => x.MatcherGroupId,
                        principalTable: "MatcherGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_MatchFragment_MatcherGroupId",
                table: "MatchFragment",
                column: "MatcherGroupId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MatchFragment");

            migrationBuilder.DropTable(
                name: "MatcherGroups");
        }
    }
}

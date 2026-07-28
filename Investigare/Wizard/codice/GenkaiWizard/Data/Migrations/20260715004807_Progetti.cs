using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GenkaiWizard.Data.Migrations
{
    /// <inheritdoc />
    public partial class Progetti : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Progetti",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    UtenteId = table.Column<string>(type: "TEXT", nullable: false),
                    Titolo = table.Column<string>(type: "TEXT", maxLength: 120, nullable: false),
                    PassoCorrente = table.Column<int>(type: "INTEGER", nullable: false),
                    Demo = table.Column<bool>(type: "INTEGER", nullable: false),
                    CreatoIl = table.Column<DateTime>(type: "TEXT", nullable: false),
                    AggiornatoIl = table.Column<DateTime>(type: "TEXT", nullable: false),
                    StatoJson = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Progetti", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Progetti_AggiornatoIl",
                table: "Progetti",
                column: "AggiornatoIl");

            migrationBuilder.CreateIndex(
                name: "IX_Progetti_UtenteId",
                table: "Progetti",
                column: "UtenteId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Progetti");
        }
    }
}

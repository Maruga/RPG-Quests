using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GenkaiWizard.Data.Migrations
{
    /// <inheritdoc />
    public partial class Personaggi : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Personaggi",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    UtenteId = table.Column<string>(type: "TEXT", nullable: false),
                    Nome = table.Column<string>(type: "TEXT", maxLength: 120, nullable: false),
                    PassoCorrente = table.Column<int>(type: "INTEGER", nullable: false),
                    CreatoIl = table.Column<DateTime>(type: "TEXT", nullable: false),
                    AggiornatoIl = table.Column<DateTime>(type: "TEXT", nullable: false),
                    StatoJson = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Personaggi", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Personaggi_AggiornatoIl",
                table: "Personaggi",
                column: "AggiornatoIl");

            migrationBuilder.CreateIndex(
                name: "IX_Personaggi_UtenteId",
                table: "Personaggi",
                column: "UtenteId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Personaggi");
        }
    }
}

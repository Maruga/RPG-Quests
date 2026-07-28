using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace GenkaiWizard.Data;

public class ApplicationDbContext : IdentityDbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<ProgettoAvventura> Progetti => Set<ProgettoAvventura>();
    public DbSet<Personaggio> Personaggi => Set<Personaggio>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.Entity<ProgettoAvventura>(e =>
        {
            e.HasIndex(p => p.UtenteId);
            e.HasIndex(p => p.AggiornatoIl);
        });
        builder.Entity<Personaggio>(e =>
        {
            e.HasIndex(p => p.UtenteId);
            e.HasIndex(p => p.AggiornatoIl);
        });
    }
}

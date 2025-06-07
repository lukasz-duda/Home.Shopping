using Home.Shopping.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace Home.Shopping.Infrastructure;

public class ShoppingDbContext(DbContextOptions<ShoppingDbContext> options) : DbContext(options)
{
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<MatcherGroup>()
            .HasMany(mg => mg.MatchFragments)
            .WithOne()
            .OnDelete(DeleteBehavior.Cascade);
    }

    public DbSet<ShoppingListItem> ShoppingListItems { get; set; }

    public DbSet<MatcherGroup> MatcherGroups { get; set; }
}
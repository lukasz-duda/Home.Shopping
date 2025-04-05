using Microsoft.EntityFrameworkCore;

namespace Home.Shopping;

public class ShoppingDbContext(DbContextOptions<ShoppingDbContext> options) : DbContext(options)
{
    public DbSet<ShoppingListItem> ShoppingListItems { get; set; }
}
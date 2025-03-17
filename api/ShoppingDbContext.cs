using Microsoft.EntityFrameworkCore;

namespace Home.Shopping;

public class ShoppingDbContext : DbContext
{
    public ShoppingDbContext(DbContextOptions<ShoppingDbContext> options)
        : base(options)
    {
    }
}
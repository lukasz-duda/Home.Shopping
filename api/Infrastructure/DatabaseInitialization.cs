using Home.Shopping.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace Home.Shopping;

public static class DatabaseInitialization
{
    public static async Task UpdateDatabaseAsync(this IHost app)
    {
        using (var scope = app.Services.CreateScope())
        {
            var db = scope.ServiceProvider.GetRequiredService<ShoppingDbContext>();
            await db.Database.MigrateAsync();
        }
    }
}
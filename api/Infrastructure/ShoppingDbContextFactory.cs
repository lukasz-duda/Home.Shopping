using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Home.Shopping.Infrastructure;

public class ShoppingDbContextFactory : IDesignTimeDbContextFactory<ShoppingDbContext>
{
    public ShoppingDbContext CreateDbContext(string[] args)
    {
        IConfigurationRoot config = new ConfigurationBuilder()
            .AddJsonFile("appsettings.Development.json")
            .AddEnvironmentVariables()
            .Build();

        var optionsBuilder = new DbContextOptionsBuilder<ShoppingDbContext>();

        string connectionString = config.GetConnectionString();
        optionsBuilder.UseMySQL(connectionString);

        return new ShoppingDbContext(optionsBuilder.Options);
    }
}
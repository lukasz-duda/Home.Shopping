using Microsoft.AspNetCore.SignalR;

namespace Home.Shopping;

public class ShoppingHub : Hub
{
    public List<ShoppingListItem> GetItems(ShoppingDbContext dbContext)
    {
        List<ShoppingListItem> shoppingList = dbContext.ShoppingItems.ToList();
        return shoppingList;
    }

    public async Task AddItem(string name, ShoppingDbContext dbContext)
    {
        var item = new ShoppingListItem
        {
            Id = Guid.NewGuid(),
            Name = name,
        };

        dbContext.ShoppingItems.Add(item);
        await dbContext.SaveChangesAsync();

        await Clients.All.SendAsync("ItemAdded", item);
    }

    public async Task RemoveItem(Guid itemId, ShoppingDbContext dbContext)
    {
        ShoppingListItem? foundItem = await dbContext.ShoppingItems.FindAsync(itemId);

        if (foundItem != null)
        {
            dbContext.ShoppingItems.Remove(foundItem);
            await dbContext.SaveChangesAsync();
        }

        await Clients.All.SendAsync("ItemRemoved", itemId);
    }
}
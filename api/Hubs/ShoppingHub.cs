using Microsoft.AspNetCore.SignalR;

namespace Home.Shopping;

public class ShoppingHub : Hub
{
    public List<ShoppingListItem> GetItems(ShoppingDbContext dbContext)
    {
        List<ShoppingListItem> shoppingList = dbContext.ShoppingListItems.ToList();
        return shoppingList;
    }

    public async Task AddItem(string name, ShoppingDbContext dbContext)
    {
        var item = new ShoppingListItem
        {
            Id = Guid.NewGuid(),
            Name = name,
        };

        dbContext.ShoppingListItems.Add(item);
        await dbContext.SaveChangesAsync();

        await Clients.All.SendAsync("ItemAdded", item);
    }

    public async Task RemoveItem(Guid itemId, ShoppingDbContext dbContext)
    {
        ShoppingListItem? foundItem = await dbContext.ShoppingListItems.FindAsync(itemId);

        if (foundItem != null)
        {
            dbContext.ShoppingListItems.Remove(foundItem);
            await dbContext.SaveChangesAsync();
        }

        await Clients.All.SendAsync("ItemRemoved", itemId);
    }
}
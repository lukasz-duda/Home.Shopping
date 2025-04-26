using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

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

    public async Task AddToCart(Guid itemId, ShoppingDbContext dbContext)
    {
        ShoppingListItem? foundItem = await dbContext.ShoppingListItems.FindAsync(itemId);

        if (foundItem != null)
        {
            foundItem.InShoppingCart = true;
            foundItem.TimeAddedToCart = DateTime.UtcNow;
            foundItem.AddedToCartBy = Context.User?.Identity?.Name;
            await dbContext.SaveChangesAsync();
            await Clients.All.SendAsync("ItemAddedToCart", foundItem);
        }

    }

    public async Task RemoveFromCart(Guid itemId, ShoppingDbContext dbContext)
    {
        ShoppingListItem? foundItem = await dbContext.ShoppingListItems.FindAsync(itemId);

        if (foundItem != null)
        {
            foundItem.InShoppingCart = false;
            foundItem.TimeAddedToCart = null;
            foundItem.AddedToCartBy = null;
            await dbContext.SaveChangesAsync();
            await Clients.All.SendAsync("ItemRemovedFromCart", foundItem);
        }

    }

    public async Task FinishShopping(ShoppingDbContext dbContext)
    {
        var itemsInShoppingCart = await dbContext.ShoppingListItems.Where(item => item.InShoppingCart).ToListAsync();

        foreach (var item in itemsInShoppingCart)
        {
            dbContext.ShoppingListItems.Remove(item);
        }
        await dbContext.SaveChangesAsync();

        await Clients.All.SendAsync("ShoppingFinished");
    }
}
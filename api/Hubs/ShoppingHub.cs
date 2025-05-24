using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace Home.Shopping;

public class ShoppingHub(ShoppingDbContext dbContext) : Hub
{
    public List<ShoppingListItem> GetItems()
    {
        List<ShoppingListItem> shoppingList = dbContext.ShoppingListItems.ToList();
        return shoppingList;
    }

    public async Task AddItem(string name)
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

    public async Task RemoveItem(Guid itemId)
    {
        ShoppingListItem? foundItem = await dbContext.ShoppingListItems.FindAsync(itemId);

        if (foundItem != null)
        {
            dbContext.ShoppingListItems.Remove(foundItem);
            await dbContext.SaveChangesAsync();
            await Clients.All.SendAsync("ItemRemoved", itemId);
        }
    }

    public async Task ChangeItem(ShoppingListItem changed)
    {
        ShoppingListItem? foundItem = await dbContext.ShoppingListItems.FindAsync(changed.Id);

        if (foundItem != null)
        {
            foundItem.Name = changed.Name;
            await dbContext.SaveChangesAsync();
            await Clients.All.SendAsync("ItemChanged", foundItem);
        }
    }

    public async Task AddToCart(Guid itemId)
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

    public async Task RemoveFromCart(Guid itemId)
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

    public async Task FinishShopping()
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
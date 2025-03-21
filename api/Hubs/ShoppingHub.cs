using Microsoft.AspNetCore.SignalR;

namespace Home.Shopping;

public class ShoppingHub : Hub
{
    public void AddItem(string item)
    {
        Clients.All.SendAsync("ItemAdded", item);
    }
}
namespace Home.Shopping
{
    public class ShoppingListItem
    {
        public required Guid Id { get; set; }
        public required string Name { get; set; }
        public bool InShoppingCart { get; set; }
        public DateTime? TimeAddedToCart { get; set; }
        public string? AddedToCartBy { get; set; }
    }
}
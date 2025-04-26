export interface ShoppingListItem {
  id: string;
  name: string;
  inShoppingCart: boolean;
  timeAddedToCart: string | null;
  addedToCartBy: string | null;
}

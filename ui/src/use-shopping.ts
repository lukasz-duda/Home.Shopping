import * as signalR from "@microsoft/signalr";
import { useCallback, useEffect, useRef, useState } from "react";
import { polishLocale } from "./locale";
import { ShoppingListItem } from "./model";

const apiUrl = import.meta.env.VITE_API_URL;

const { shoppingPlanning } = polishLocale;

export interface ShoppingProps {
  onInfo(text: string): void;
}

export interface Shopping {
  items: ShoppingListItem[];
  addItem: (itemName: string) => void;
  addToCart: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  finishShopping: () => void;
}

export function useShopping({ onInfo }: ShoppingProps): Shopping {
  const [items, setItems] = useState<ShoppingListItem[]>([]);

  const connectionRef = useRef<signalR.HubConnection | null>(null);

  const refreshItems = useCallback(
    function () {
      connectionRef.current
        ?.invoke("GetItems")
        .then((items: ShoppingListItem[]) => {
          setItems(items);
          onInfo(shoppingPlanning.itemsRefreshed);
        });
    },
    [onInfo],
  );

  function addItem(itemName: string) {
    connectionRef.current?.invoke("AddItem", itemName);
  }

  const itemAdded = useCallback(
    function (item: ShoppingListItem) {
      setItems((prevItems) => [...prevItems, item]);
      onInfo(shoppingPlanning.itemAdded);
    },
    [onInfo],
  );

  function addToCart(itemId: string) {
    connectionRef.current?.invoke("AddToCart", itemId);
  }

  function itemAddedToCart(updatedItem: ShoppingListItem) {
    setItems((prevItems) =>
      prevItems.map((prevItem) => {
        return prevItem.id === updatedItem.id ? updatedItem : prevItem;
      }),
    );
  }

  function removeFromCart(itemId: string) {
    connectionRef.current?.invoke("RemoveFromCart", itemId);
  }

  function itemRemovedFromCart(updatedItem: ShoppingListItem) {
    setItems((prevItems) =>
      prevItems.map((prevItem) => {
        return prevItem.id === updatedItem.id ? updatedItem : prevItem;
      }),
    );
  }

  function finishShopping() {
    connectionRef.current?.invoke("FinishShopping");
  }

  function shoppingFinished() {
    setItems((prevItems) => prevItems.filter((item) => !item.inShoppingCart));
  }

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${apiUrl}/shopping`)
      .withAutomaticReconnect()
      .build();

    connectionRef.current = connection;

    connection.start().then(refreshItems);
    connection.onreconnected(refreshItems);
    connection.on("ItemAdded", itemAdded);
    connection.on("ItemAddedToCart", itemAddedToCart);
    connection.on("ItemRemovedFromCart", itemRemovedFromCart);
    connection.on("ShoppingFinished", shoppingFinished);

    return () => {
      connection.stop();
    };
  }, [itemAdded, refreshItems]);

  const result: Shopping = {
    items,
    addItem,
    addToCart,
    removeFromCart,
    finishShopping,
  };

  return result;
}

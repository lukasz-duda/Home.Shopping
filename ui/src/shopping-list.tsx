import { useEffect } from "react";

import * as signalR from "@microsoft/signalr";

const apiUrl = import.meta.env.VITE_API_URL;

export function ShoppingList() {
    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl(`${apiUrl}/shopping`)
            .build();

        connection.start();

        return () => {
            connection.stop();
        }
    }, []);

    return <></>;
}
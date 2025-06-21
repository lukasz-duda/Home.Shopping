import { createContext } from "react";
import { loadingUser } from "./user-api";

export const UserContext = createContext(loadingUser);

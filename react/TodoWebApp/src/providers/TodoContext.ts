import { createContext } from "react";
import type { useTodoData } from "../hooks/useTodoData";

export const TodoContext = createContext<ReturnType<typeof useTodoData> | null>(
	null,
);

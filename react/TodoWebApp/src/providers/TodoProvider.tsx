import type { ReactNode } from "react";
import { useTodoData } from "../hooks/useTodoData";
import { TodoContext } from "./TodoContext";

export const TodoProvider = ({ children }: { children: ReactNode }) => {
	const value = useTodoData();
	return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

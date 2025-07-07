import { useContext } from "react";
import { TodoContext } from "../providers/TodoContext";

export const useTodoDataContext = () => {
	const context = useContext(TodoContext);
	if (!context) {
		throw new Error("useTodoDataContext must be used within TodoProvider");
	}
	return context;
};

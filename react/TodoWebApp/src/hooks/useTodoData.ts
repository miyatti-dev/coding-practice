import { useCallback, useState } from "react";

export type Todo = {
	id: number;
	text: string;
	completed: boolean;
};

const initTodoList: Array<Todo> = [
	{
		id: 0,
		text: "洗濯物をたたむ",
		completed: false,
	},
	{
		id: 1,
		text: "食器を洗う",
		completed: true,
	},
	{
		id: 2,
		text: "ゴミを出す",
		completed: true,
	},
	{
		id: 3,
		text: "風呂掃除",
		completed: false,
	},
	{
		id: 4,
		text: "パンを買いに行く",
		completed: false,
	},
	{
		id: 5,
		text: "電球をかえる",
		completed: false,
	},
	{
		id: 6,
		text: "塾の送り迎え",
		completed: true,
	},
	{
		id: 7,
		text: "ご飯を炊く",
		completed: false,
	},
	{
		id: 8,
		text: "ご飯を炊く2",
		completed: false,
	},
	{
		id: 9,
		text: "ご飯を炊く3",
		completed: false,
	},
	{
		id: 10,
		text: "ご飯を炊く4",
		completed: false,
	},
];

const createTodoList = (todoList: Array<Todo>) => {
	const todoListLength = todoList.length;
	const incompleteTodoList = [];
	const completeTodoList = [];

	for (let i = 0; i < todoListLength; i++) {
		const todo = todoList[i];
		if (todo.completed === true) {
			completeTodoList.push(todo);
		} else {
			incompleteTodoList.push(todo);
		}
	}

	return {
		todoList,
		incompleteTodoList,
		completeTodoList,
	};
};

export const useTodoData = () => {
	const [todoData, setTodoData] = useState(createTodoList(initTodoList));

	const completeTodo = useCallback((todoId: number) => {
		setTodoData((prev) => {
			const updatedTodoList = prev.todoList.map((todo) =>
				todo.id === todoId ? { ...todo, completed: true } : todo,
			);

			return createTodoList(updatedTodoList);
		});
	}, []);

	const incompleteTodo = useCallback((todoId: number) => {
		setTodoData((prev) => {
			const updatedTodoList = prev.todoList.map((todo) =>
				todo.id === todoId ? { ...todo, completed: false } : todo,
			);

			return createTodoList(updatedTodoList);
		});
	}, []);

	const addTodo = useCallback((todoText: string) => {
		const getMaxId = (todoList: Todo[]): number => {
			if (todoList.length === 0) return 0;

			return Math.max(...todoList.map((todo) => todo.id));
		};

		setTodoData((prev) => {
			const maxId = getMaxId(prev.todoList);

			const updatedTodoList = prev.todoList.concat({
				id: maxId + 1,
				text: todoText,
				completed: false,
			});

			return createTodoList(updatedTodoList);
		});
	}, []);

	const deleteTodo = useCallback((todoId: number) => {
		setTodoData((prev) => {
			const updatedTodoList = prev.todoList.filter(
				(todo) => todo.id !== todoId,
			);

			return createTodoList(updatedTodoList);
		});
	}, []);

	return { ...todoData, completeTodo, incompleteTodo, addTodo, deleteTodo };
};

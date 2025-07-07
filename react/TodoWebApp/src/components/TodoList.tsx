import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import type { Todo } from "../hooks/useTodoData";
import { useTodoDataContext } from "../hooks/useTodoDataContext";

type Props = {
	todoList: Todo[];
};

export const TodoList = ({ todoList }: Props) => {
	const navigate = useNavigate();
	const { completeTodo, incompleteTodo } = useTodoDataContext();

	const onClickListItemButton = useCallback(() => {
		navigate("/detail");
	}, [navigate]);

	return (
		<List sx={{ width: "100%", bgcolor: "background.paper" }}>
			{todoList?.map((todo: Todo) => {
				const labelId = `checkbox-list-label-${todo.id}`;

				return (
					<ListItem key={todo.id} disablePadding>
						<ListItemIcon>
							<Checkbox
								edge="start"
								checked={todo.completed}
								onChange={(_event, checked) => {
									if (checked) {
										completeTodo?.(todo.id);
									} else {
										incompleteTodo?.(todo.id);
									}
								}}
							/>
						</ListItemIcon>
						<ListItemButton onClick={onClickListItemButton} dense>
							<ListItemText id={labelId} primary={`${todo.text}`} />
						</ListItemButton>
					</ListItem>
				);
			})}
		</List>
	);
};

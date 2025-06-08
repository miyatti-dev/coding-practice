import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import type { Todo } from "../hooks/useTodoData";

type Props = {
	todoList: Todo[];
};

export const TodoList = ({ todoList }: Props) => {
	const [checked, setChecked] = React.useState([0]);

	const handleToggle = (value: number) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	return (
		<List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
			{todoList?.map((todo: Todo) => {
				const labelId = `checkbox-list-label-${todo.id}`;

				return (
					<ListItem key={todo.id} disablePadding>
						<ListItemButton onClick={handleToggle(todo.id)} dense>
							<ListItemIcon>
								<Checkbox edge="start" checked={checked.includes(todo.id)} />
							</ListItemIcon>
							<ListItemText id={labelId} primary={`${todo.text}`} />
						</ListItemButton>
					</ListItem>
				);
			})}
		</List>
	);
};

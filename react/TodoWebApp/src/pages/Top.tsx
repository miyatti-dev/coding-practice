import AppBar from "@mui/material/AppBar";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React from "react";
import { TabPanel } from "../components/TabPanel";
import { TodoList } from "../components/TodoList";
import { useTodoData } from "../hooks/useTodoData";

export const Top = () => {
	const [activeTabIndex, setActiveTabIndex] = React.useState(0);
	const {
		todoList,
		incompleteTodoList,
		completeTodoList,
		completeTodo,
		incompleteTodo,
	} = useTodoData();

	const handleActiveTabChange = (
		_event: React.SyntheticEvent,
		newValue: number,
	) => {
		setActiveTabIndex(newValue);
	};

	return (
		<>
			<AppBar position="static">
				<Tabs
					value={activeTabIndex}
					onChange={handleActiveTabChange}
					indicatorColor="secondary"
					textColor="inherit"
					variant="fullWidth"
					aria-label="full width tabs"
					sx={{
						"& .MuiTabs-indicator": {
							backgroundColor: "#FFCC00",
						},
					}}
				>
					<Tab label="未完了" />
					<Tab label="完了" />
					<Tab label="全て" />
				</Tabs>
			</AppBar>
			<TabPanel activeTabIndex={activeTabIndex} index={0}>
				<TodoList todoList={incompleteTodoList} completeTodo={completeTodo} />
			</TabPanel>
			<TabPanel activeTabIndex={activeTabIndex} index={1}>
				<TodoList todoList={completeTodoList} incompleteTodo={incompleteTodo} />
			</TabPanel>
			<TabPanel activeTabIndex={activeTabIndex} index={2}>
				<TodoList
					todoList={todoList}
					completeTodo={completeTodo}
					incompleteTodo={incompleteTodo}
				/>
			</TabPanel>
		</>
	);
};

import "./App.css";
import CommentIcon from "@mui/icons-material/Comment";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import * as React from "react";

interface TabPanelProps {
	children?: React.ReactNode;
	dir?: string;
	index: number;
	value: number;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			tabIndex={-1}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }} tabIndex={-1}>
					<Typography tabIndex={-1}>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

function a11yProps(index: number) {
	return {
		id: `full-width-tab-${index}`,
		"aria-controls": `full-width-tabpanel-${index}`,
	};
}

function App() {
	const [checked, setChecked] = React.useState([0]);

	const theme = useTheme();
	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

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
		<>
			<Box sx={{ bgcolor: "background.paper", width: "100vw" }}>
				<AppBar position="static">
					<Tabs
						value={value}
						onChange={handleChange}
						indicatorColor="secondary"
						textColor="inherit"
						variant="fullWidth"
						aria-label="full width tabs example"
						sx={{
							"& .MuiTabs-indicator": {
								backgroundColor: "#FFCC00",
							},
						}}
					>
						<Tab label="Item One" {...a11yProps(0)} />
						<Tab label="Item Two" {...a11yProps(1)} />
						<Tab label="Item Three" {...a11yProps(2)} />
					</Tabs>
				</AppBar>
				<TabPanel value={value} index={0} dir={theme.direction}>
					Item One
					<List
						sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
					>
						{[0, 1, 2, 3].map((value) => {
							const labelId = `checkbox-list-label-${value}`;

							return (
								<ListItem key={value} disablePadding>
									<ListItemButton onClick={handleToggle(value)} dense>
										<ListItemIcon>
											<Checkbox
												edge="start"
												checked={checked.includes(value)}
											/>
										</ListItemIcon>

										<ListItemText
											id={labelId}
											primary={`Line item ${value + 1}`}
										/>
									</ListItemButton>
								</ListItem>
							);
						})}
					</List>
				</TabPanel>
				<TabPanel value={value} index={1} dir={theme.direction}>
					Item Two
				</TabPanel>
				<TabPanel value={value} index={2} dir={theme.direction}>
					Item Three
				</TabPanel>
			</Box>
		</>
	);
}

export default App;

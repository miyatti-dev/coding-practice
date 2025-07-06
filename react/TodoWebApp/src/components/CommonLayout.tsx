import MenuIcon from "@mui/icons-material/Menu";
import {
	AppBar,
	Box,
	IconButton,
	Menu,
	MenuItem,
	MenuList,
	Toolbar,
} from "@mui/material";
import { type MouseEvent, useState } from "react";
import { Link, Outlet } from "react-router-dom";

export const CommonLayout = () => {
	const [anchorNav, setAnchorNav] = useState<null | HTMLElement>(null);
	const openMenu = (event: MouseEvent<HTMLElement>) => {
		setAnchorNav(event.currentTarget);
	};
	const closeMenu = () => {
		setAnchorNav(null);
	};

	return (
		<Box sx={{ bgcolor: "background.paper", width: "100vw" }}>
			<AppBar position="static">
				<Toolbar>
					<IconButton color="inherit" edge="start" onClick={openMenu}>
						<MenuIcon />
					</IconButton>
					<Menu
						open={Boolean(anchorNav)}
						onClose={closeMenu}
						anchorEl={anchorNav}
					>
						<MenuList>
							<MenuItem onClick={closeMenu}>
								<Link to="/.">Home</Link>
							</MenuItem>
							<MenuItem onClick={closeMenu}>
								<Link to="/add-todo">AddTodo</Link>
							</MenuItem>
						</MenuList>
					</Menu>
				</Toolbar>
			</AppBar>
			<Outlet />
		</Box>
	);
};

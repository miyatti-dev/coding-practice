import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";

export const CommonLayout = () => {
	return (
		<Box sx={{ bgcolor: "background.paper", width: "100vw" }}>
			<Outlet />
		</Box>
	);
};

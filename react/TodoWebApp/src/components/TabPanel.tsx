import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	activeTabIndex: number;
}

export const TabPanel = (props: TabPanelProps) => {
	const { children, activeTabIndex, index } = props;

	return (
		<div
			role="tabpanel"
			hidden={activeTabIndex !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			tabIndex={-1}
		>
			{activeTabIndex === index && (
				<Box sx={{ p: 3 }} tabIndex={-1}>
					<Typography tabIndex={-1}>{children}</Typography>
				</Box>
			)}
		</div>
	);
};

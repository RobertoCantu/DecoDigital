import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import { AccountBalance, ExitToApp, Inventory } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { PATH_DASHBOARD } from "../routes/paths";

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: "flex-end",
}));

const drawerWidth = 240;

function DashboardSidebar({ open, handleSidebarClose }: any) {
	const theme = useTheme();

	return (
		<Drawer
			sx={{
				width: drawerWidth,
				flexShrink: 0,
				"& .MuiDrawer-paper": {
					width: drawerWidth,
					boxSizing: "border-box",
				},
			}}
			variant="persistent"
			anchor="left"
			open={open}
		>
			<DrawerHeader>
				<Avatar
					alt="Remy Sharp"
					src="/static/images/avatar/1.jpg"
					sx={{ width: 128, height: 128, margin: "auto", p: 4, m: 4 }}
				/>
				<IconButton onClick={handleSidebarClose} sx={{ m: 0, p: 0 }}>
					{theme.direction === "ltr" ? (
						<ChevronLeftIcon />
					) : (
						<ChevronRightIcon />
					)}
				</IconButton>
			</DrawerHeader>
			<Divider />
			<List>
				{["Catálogo", "Estado de cuenta"].map((text, index) => (
					<ListItem key={text} disablePadding>
						<ListItemButton href={PATH_DASHBOARD.general.clientAccount}>
							<ListItemIcon>
								{index % 2 === 0 ? <Inventory /> : <AccountBalance />}
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
			<Divider />
			<List>
				{["Cerrar sesión"].map((text, index) => (
					<ListItem key={text} disablePadding>
						<ListItemButton onClick={handleSidebarClose}>
							<ListItemIcon>
								{index % 2 === 0 ? <ExitToApp /> : <MailIcon />}
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Drawer>
	);
}

export default DashboardSidebar;

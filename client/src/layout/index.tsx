import React, { useState } from "react";
// Routing
import { Outlet } from "react-router-dom";
// Material UI
import {
	styled,
	useTheme,
	Container,
	Box,
	AppBar,
	Toolbar,
	Typography,
	Menu,
	MenuItem,
	IconButton,
} from "@mui/material";

// Components
import DashboardNavbar from "./DashboardNavbar";
import DashboardSidebar from "./DashboardSidebar";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
	open?: boolean;
}>(({ theme, open }) => ({
	flexGrow: 1,
	padding: theme.spacing(3),
	transition: theme.transitions.create("margin", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	marginLeft: `-${drawerWidth}px`,
	...(open && {
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	}),
}));

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: "flex-end",
}));

function DashboardLayout() {
	const [open, setOpen] = useState(false);
	return (
		<RootStyle>
			<DashboardNavbar openSidebar={() => setOpen(true)} open={open} />
			<DashboardSidebar open={open} handleSidebarClose={() => setOpen(false)} />
			<Main open={open}>
				<DrawerHeader />
				<Outlet />
			</Main>
		</RootStyle>
	);
}

export default DashboardLayout;

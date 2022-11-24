import React from "react";
import { RegisterForm } from "../../components/authentication/register";
// Routing
import { Link as RouterLink } from "react-router-dom";
import { PATH_AUTH } from "../../routes/paths";

// UI
import { makeStyles } from "@mui/material/styles";
import { Box, Card, Stack, Container, Typography, Link } from "@mui/material";

import DecoLogo from "../../assets/DecoLogo.jpeg";

const root: any = {
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	height: "100vh",
};

const mainContainer: any = {
	display: "flex",
	flexDirection: "column",
	justifyContent: "center",
	alignItems: "center",
};

const loginLink: any = {
	display: "flex",
	alignItems: "center",
	marginTop: 24,
};

function Register() {
	return (
		<div style={root}>
			<Container maxWidth="xl" style={mainContainer}>
				<Card sx={{ padding: 5 }}>
					<Stack direction="column" alignItems="center" sx={{ mb: 5 }}>
						{/* <Box sx={{ flexGrow: 1 }}> */}
							<Typography variant="h4" component="h1" gutterBottom align="center">
								Registrar nueva cuenta en Deco Digital
							</Typography>
							<img src={DecoLogo} width="200" />

							<Typography variant="body1" gutterBottom>
								Ingresa tus datos
							</Typography>
						{/* </Box> */}
					</Stack>
					<RegisterForm />
				</Card>
				<div style={loginLink}>
					<Typography variant="body2">¿Ya tienes una cuenta? &nbsp;</Typography>
					<Link
						underline="none"
						variant="subtitle2"
						component={RouterLink}
						to={PATH_AUTH.login}
					>
						Iniciar Sesión
					</Link>
				</div>
			</Container>
		</div>
	);
}

export default Register;

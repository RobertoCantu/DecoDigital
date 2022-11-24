// Components
import { LoginForm } from "../../components/authentication/login";

// Routing
import { Link as RouterLink } from "react-router-dom";
import { PATH_AUTH } from "../../routes/paths";

// UI
import { makeStyles } from "@mui/material/styles";
import {
	Box,
	Card,
	Stack,
	Container,
	Typography,
	Link,
	Avatar,
} from "@mui/material";

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

const registerLink: any = {
	registerLink: {
		display: "flex",
		alignItems: "center",
		marginTop: 24,
	},
};

function Login() {
	return (
		<div style={root}>
			<Container maxWidth="sm" style={mainContainer}>
				<Card sx={{ padding: 5 }}>
					<Stack direction="column" alignItems="center" sx={{ mb: 5 }}>
						{/* <Box sx={{ flexGrow: 1, width:'100%'}}> */}
							<Typography variant="h4" gutterBottom align="center">
								Iniciar Sesión a Deco Digital
							</Typography>
							{/* <Box sx={{ width: "100%" }}>
								<Avatar
									variant={"rounded"}
									alt="Logo"
									src={DecoLogo}
									style={{
										width: 100,
										height: 100,
									}}
								/>
							</Box> */}
							<img src={DecoLogo} width="200" />
							<Typography sx={{ color: "text.secondary" }}>
								Ingresa tus datos
							</Typography>
						{/* </Box> */}
					</Stack>
					<LoginForm />
				</Card>
				<div style={registerLink}>
					<Typography variant="body2">¿No tienes una cuenta?&nbsp;</Typography>
					<Link
						underline="none"
						variant="subtitle2"
						component={RouterLink}
						to={PATH_AUTH.register}
					>
						Crear una cuenta
					</Link>
				</div>
			</Container>
		</div>
	);
}

export default Login;

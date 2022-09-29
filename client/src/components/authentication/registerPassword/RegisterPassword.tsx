import React from "react";
import {
  Grid,
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Button,
  Container,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import './RegisterPassword.scss';

const theme = createTheme();

function RegisterPassword() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md" className="container">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1>Codigo verificado</h1>
          <p>Ingrese su nueva contraseña</p>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            
            <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="password"
                        name="password"
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        autoFocus
                      />
                    </Grid> 
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="confirm-password"
                        label="Confirm Password"
                        name="confirm-password"
                        autoComplete="password"
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    href="/auth/login" // <--- Quitar esto una vez se programe el registro
                    >Register</Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
export default RegisterPassword;

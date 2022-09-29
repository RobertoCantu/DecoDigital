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
import './RegisterCode.scss';
const theme = createTheme();

function RegisterCode() {
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
          <div className="">
            <h1>Confirmación enviada</h1>
            <p>Ingresa el codigo que enviamos a su numero telefonico</p>
          </div>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="code"
                  label="Verify Code"
                  name="code"
                  autoComplete="code"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              href="/auth/register/password"
            >
              Verify
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
export default RegisterCode;

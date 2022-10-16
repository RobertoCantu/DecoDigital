import React, {useState} from "react";
import {
  Grid,
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Alert,
} from "@mui/material";

import * as Yup from "yup";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Formik, Form, FormikHelpers } from "formik";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";

import "./RegisterForm.scss";

const theme = createTheme();
const RegisterSchema = Yup.object().shape({
  email: Yup.string().email("El correo debe ser valido.").required("Se requiere un correo."),
  password: Yup.string().required("Se requiere una contraseña."),
});

function RegisterForm() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xl" className="container">
        <div className="app__register-head">
          <h1>Deco Digital</h1>
          <h2>Crear Cuenta Nueva</h2>
        </div>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="NUC" value="1" />
                    <Tab label="Contract #" value="2" />
                  </TabList>
                </Box>

                {/* Tabs  */}
                <TabPanel value="1">
                  <Grid container spacing={5}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="nuc"
                        name="nuc"
                        required
                        fullWidth
                        id="firstName"
                        label="NUC"
                        autoFocus
                        className="input"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="telephone"
                        label="Telephone"
                        name="telephone"
                        autoComplete="telephone"
                        className="input"
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    href="/auth/register/code" // <--- Quitar esto una vez se programe el registro
                  >
                    Sign Up
                  </Button>
                </TabPanel>

                {/* By contract number ------------------- */}
                <TabPanel value="2">
                  {" "}
                  <Grid container spacing={5}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="given-name"
                        name="contract"
                        required
                        fullWidth
                        id="contract"
                        label="Contract #"
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        id="city"
                        label="Municipio"
                        name="city"
                        autoComplete="family-name"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="telephone"
                        label="Telephone"
                        name="telephone"
                        autoComplete="telephone"
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    href="/auth/register/code" // <--- Quitar esto una vez se programe el registro
                  >
                    Sign Up
                  </Button>
                </TabPanel>
              </TabContext>
            </Box>

            <Grid
              container
              justifyContent="flex-end"
              className="app__register-footer"
            >
              <Grid item>
                <Link href="/auth/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
export default RegisterForm;

// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Tab from '@mui/material/Tab';
// import TabContext from '@mui/lab/TabContext';
// import TabList from '@mui/lab/TabList';
// import TabPanel from '@mui/lab/TabPanel';

// export default function LabTabs() {
// const [value, setValue] = React.useState('1');

// const handleChange = (event: React.SyntheticEvent, newValue: string) => {
//   setValue(newValue);
// };

//   return (
//     <Box sx={{ width: '100%', typography: 'body1' }}>
//       <TabContext value={value}>
//         <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//           <TabList onChange={handleChange} aria-label="lab API tabs example">
//             <Tab label="Item One" value="1" />
//             <Tab label="Item Two" value="2" />
//             <Tab label="Item Three" value="3" />
//           </TabList>
//         </Box>
//         <TabPanel value="1">Item One</TabPanel>
//         <TabPanel value="2">Item Two</TabPanel>
//         <TabPanel value="3">Item Three</TabPanel>
//       </TabContext>
//     </Box>
//   );
// }

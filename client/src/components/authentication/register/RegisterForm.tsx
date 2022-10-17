import React, { useState } from "react";
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
  Stack,
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
import { ValueAccessor } from "@ionic/angular/directives/control-value-accessors/value-accessor";
import { LoadingButton } from "@mui/lab";
import { PHONE_REGEX } from "../../../utils/regex";

const theme = createTheme();

// Interfaces
interface InitialValuesNUC {
  nuc: string;
  phone: string;
  afterSubmit?: string;
}
interface InitialValuesContract {
  city: string;
  contract: string;
  phone: string;
  afterSubmit?: string;
}

//Schemas
const RegisterSchemaNUC = Yup.object().shape({
  nuc: Yup.string().required("Se requiere un NUC"),
  phone: Yup.string()
    .min(10, "El número de celular debe ser de 10 dígitos")
    .required("Se requiere un número de celular."),
});

const RegisterSchemaContract = Yup.object().shape({
  city: Yup.string().required("Se requiere un municipio"),
  contract: Yup.string().required("Se requiere un numero de contrato"),
  phone: Yup.string()
    .min(10, "El número de celular debe ser de 10 dígitos")
    .required("Se requiere un número de celular."),
});

function RegisterForm() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });
  };

  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div>
      <TabContext value={value}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab label="NUC" value="1" />
          <Tab label="# Contrato" value="2" />
        </TabList>

        <TabPanel value="1">
          <Formik
            initialValues={{
              nuc: "",
              phone: "",
              contract: "",
              city: "",
            }}
            validationSchema={RegisterSchemaNUC}
            onSubmit={async (
              values: InitialValuesNUC,
              { resetForm, setErrors }: FormikHelpers<InitialValuesNUC>
            ) => {
              try {
              } catch (error: any) {
                resetForm();
                setErrors({ afterSubmit: error.message });
              }
            }}
          >
            {({
              handleChange,
              values,
              errors,
              touched,
              isSubmitting,
              setFieldValue,
            }) => (
              <Form>
                <Stack spacing={2}>
                  {errors.afterSubmit && (
                    <Alert severity="error">{errors.afterSubmit}</Alert>
                  )}
                  <TextField
                    fullWidth
                    autoComplete="nuc"
                    type="text"
                    label="NUC"
                    name="nuc"
                    value={values.nuc}
                    onChange={handleChange}
                    error={Boolean(touched.nuc && errors.nuc)}
                    helperText={touched.nuc && errors.nuc}
                  />
                  <TextField
                    fullWidth
                    autoComplete="phone"
                    type="text"
                    label="Celular"
                    name="phone"
                    value={values.phone}
                    onChange={(e) => {
                      e.preventDefault();
                      const value = e.target.value.replace(PHONE_REGEX, "");
                      setFieldValue("phone", value);
                    }}
                    error={Boolean(touched.phone && errors.phone)}
                    helperText={touched.phone && errors.phone}
                  />
                  <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                  >
                    Registrate
                  </LoadingButton>
                </Stack>
              </Form>
            )}
          </Formik>
        </TabPanel>

        <TabPanel value="2">
          <Formik
            initialValues={{
              nuc: "",
              phone: "",
              contract: "",
              city: "",
            }}
            validationSchema={RegisterSchemaContract}
            onSubmit={async (
              values: InitialValuesContract,
              { resetForm, setErrors }: FormikHelpers<InitialValuesContract>
            ) => {
              try {
              } catch (error: any) {
                resetForm();
                setErrors({ afterSubmit: error.message });
              }
            }}
          >
            {({
              handleChange,
              values,
              errors,
              touched,
              isSubmitting,
              setFieldValue,
            }) => (
              <Form>
                <Stack spacing={2}>
                  {errors.afterSubmit && (
                    <Alert severity="error">{errors.afterSubmit}</Alert>
                  )}
                  <TextField
                    fullWidth
                    autoComplete="contract"
                    type="text"
                    label="# Contrato"
                    name="contract"
                    value={values.contract}
                    onChange={handleChange}
                    error={Boolean(touched.contract && errors.contract)}
                    helperText={touched.contract && errors.contract}
                  />
                  <TextField
                    fullWidth
                    autoComplete="city"
                    type="text"
                    label="Municipio"
                    name="city"
                    value={values.city}
                    onChange={handleChange}
                    error={Boolean(touched.city && errors.city)}
                    helperText={touched.city && errors.city}
                  />
                  <TextField
                    fullWidth
                    autoComplete="phone"
                    type="text"
                    label="Celular"
                    name="phone"
                    value={values.phone}
                    onChange={(e) => {
                      e.preventDefault();
                      const value = e.target.value.replace(PHONE_REGEX, "");
                      setFieldValue("phone", value);
                    }}
                    error={Boolean(touched.phone && errors.phone)}
                    helperText={touched.phone && errors.phone}
                  />
                  <LoadingButton
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                  >
                    Registrate
                  </LoadingButton>
                </Stack>
              </Form>
            )}
          </Formik>
        </TabPanel>
      </TabContext>
    </div>

    // <ThemeProvider theme={theme}>
    //   <Container component="main" maxWidth="xl" className="container">
    //     <div className="app__register-head">
    //       <h1>Deco Digital</h1>
    //       <h2>Crear Cuenta Nueva</h2>
    //     </div>
    //     <CssBaseline />
    //     <Box
    //       sx={{
    //         marginTop: 0,
    //         display: "flex",
    //         flexDirection: "column",
    //         alignItems: "center",
    //       }}
    //     >
    //       <Box
    //         component="form"
    //         noValidate
    //         onSubmit={handleSubmit}
    //         sx={{ mt: 3 }}
    //       >
    //         <Box sx={{ width: "100%", typography: "body1" }}>
    //           <TabContext value={value}>
    //             <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
    //               <TabList
    //                 onChange={handleChange}
    //                 aria-label="lab API tabs example"
    //               >
    //                 <Tab label="NUC" value="1" />
    //                 <Tab label="Contract #" value="2" />
    //               </TabList>
    //             </Box>

    //             {/* Tabs  */}
    //             <TabPanel value="1">
    //               <Grid container spacing={5}>
    //                 <Grid item xs={12} sm={6}>
    //                   <TextField
    //                     autoComplete="nuc"
    //                     name="nuc"
    //                     required
    //                     fullWidth
    //                     id="firstName"
    //                     label="NUC"
    //                     autoFocus
    //                     className="input"
    //                   />
    //                 </Grid>
    //                 <Grid item xs={12} sm={6}>
    //                   <TextField
    //                     required
    //                     fullWidth
    //                     id="telephone"
    //                     label="Telephone"
    //                     name="telephone"
    //                     autoComplete="telephone"
    //                     className="input"
    //                   />
    //                 </Grid>
    //               </Grid>
    //               <Button
    //                 type="submit"
    //                 fullWidth
    //                 variant="contained"
    //                 sx={{ mt: 3, mb: 2 }}
    //                 href="/auth/register/code" // <--- Quitar esto una vez se programe el registro
    //               >
    //                 Sign Up
    //               </Button>
    //             </TabPanel>

    //             {/* By contract number ------------------- */}
    //             <TabPanel value="2">
    //               {" "}
    //               <Grid container spacing={5}>
    //                 <Grid item xs={12} sm={6}>
    //                   <TextField
    //                     autoComplete="given-name"
    //                     name="contract"
    //                     required
    //                     fullWidth
    //                     id="contract"
    //                     label="Contract #"
    //                     autoFocus
    //                   />
    //                 </Grid>
    //                 <Grid item xs={12} sm={6}>
    //                   <TextField
    //                     required
    //                     fullWidth
    //                     id="city"
    //                     label="Municipio"
    //                     name="city"
    //                     autoComplete="family-name"
    //                   />
    //                 </Grid>
    //                 <Grid item xs={12}>
    //                   <TextField
    //                     required
    //                     fullWidth
    //                     id="telephone"
    //                     label="Telephone"
    //                     name="telephone"
    //                     autoComplete="telephone"
    //                   />
    //                 </Grid>
    //               </Grid>
    //               <Button
    //                 type="submit"
    //                 fullWidth
    //                 variant="contained"
    //                 sx={{ mt: 3, mb: 2 }}
    //                 href="/auth/register/code" // <--- Quitar esto una vez se programe el registro
    //               >
    //                 Sign Up
    //               </Button>
    //             </TabPanel>
    //           </TabContext>
    //         </Box>

    //         <Grid
    //           container
    //           justifyContent="flex-end"
    //           className="app__register-footer"
    //         >
    //           <Grid item>
    //             <Link href="/auth/login" variant="body2">
    //               Already have an account? Sign in
    //             </Link>
    //           </Grid>
    //         </Grid>
    //       </Box>
    //     </Box>
    //   </Container>
    // </ThemeProvider>
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

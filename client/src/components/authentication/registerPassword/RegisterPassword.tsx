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
  Alert,
  Stack,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import * as Yup from "yup";
import { Formik, Form, FormikHelpers } from "formik";
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { Icon } from '@iconify/react';

const theme = createTheme();

interface RegisterPasswordProps {
  password: string;
  confirmPassword: string;
  afterSubmit?: string;
}

const registerPasswordSchema = Yup.object().shape({
  password: Yup.string().required("Se requiere una contraseña"),
  confirmPassword: Yup.string().required("Se requiere una contraseña"),
});

function RegisterPassword() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const onClickShowPassword = () => setShowPassword(!showPassword)
  const onClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword)

  return (
    <div>
      <Formik
        initialValues={{
          password: "",
          confirmPassword: "",
        }}
        validationSchema={registerPasswordSchema}
        onSubmit={async (
          values: RegisterPasswordProps,
          { resetForm, setErrors }: FormikHelpers<RegisterPasswordProps>
        ) => {
          try {
            // await login(values.email, values.password);
            // enqueueSnackbar('¡Bienvenido!', {
            //   variant: 'success',
            //   action: (key) => (
            //     <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            //       <Icon icon={closeFill} />
            //     </MIconButton>
            //   )
            // });
          } catch (error: any) {
            resetForm();
            //Falta agregar useRef
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
                autoComplete="password"
                type={showPassword ? 'text' : 'password'}
                label="Contraseña"
                name="password"
                value={values.password}
                inputProps={{ minLength: 8 }}
                onChange={handleChange}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end" onClick={onClickShowPassword}>
                        <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                fullWidth
                autoComplete="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                label="Confirmar Contraseña"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                helperText={touched.confirmPassword && errors.confirmPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end" onClick={onClickShowConfirmPassword}>
                        <Icon icon={showConfirmPassword ? eyeFill : eyeOffFill} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                Iniciar Sesión
              </LoadingButton>
            </Stack>
          </Form>
        )}
      </Formik>
    </div>
    // <ThemeProvider theme={theme}>
    //   <Container component="main" maxWidth="md" className="container">
    //     <CssBaseline />
    //     <Box
    //       sx={{
    //         marginTop: 8,
    //         display: "flex",
    //         flexDirection: "column",
    //         alignItems: "center",
    //       }}
    //     >
    //       <h1>Codigo verificado</h1>
    //       <p>Ingrese su nueva contraseña</p>
    //       <Box
    //         component="form"
    //         noValidate
    //         onSubmit={handleSubmit}
    //         sx={{ mt: 3 }}
    //       >

    //         <Grid container spacing={2}>
    //                 <Grid item xs={12}>
    //                   <TextField
    //                     autoComplete="password"
    //                     name="password"
    //                     required
    //                     fullWidth
    //                     id="password"
    //                     label="Password"
    //                     autoFocus
    //                   />
    //                 </Grid>
    //                 <Grid item xs={12}>
    //                   <TextField
    //                     required
    //                     fullWidth
    //                     id="confirm-password"
    //                     label="Confirm Password"
    //                     name="confirm-password"
    //                     autoComplete="password"
    //                   />
    //                 </Grid>
    //               </Grid>
    //               <Button
    //                 type="submit"
    //                 fullWidth
    //                 variant="contained"
    //                 sx={{ mt: 3, mb: 2 }}
    //                 href="/auth/login" // <--- Quitar esto una vez se programe el registro
    //                 >Register</Button>
    //       </Box>
    //     </Box>
    //   </Container>
    // </ThemeProvider>
  );
}
export default RegisterPassword;

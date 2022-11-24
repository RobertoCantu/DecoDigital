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
const api = 'http://localhost:3000/api';
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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fail, setFail] = useState(false);
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

            if(values.password != values.confirmPassword){
              setErrors({ confirmPassword: "Las contraseñas no coinciden" });
              return;
            }
            const token = localStorage.getItem('registerToken');
            
            const requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json',
              Authorization: 'Bearer ' + token},
              body: JSON.stringify({ password: values.password })
            };

            await fetch(`${api}/user/register/password`, requestOptions).then(response => response.json()).then(data => {
              if(data.ok){
                setSuccess(true);
                localStorage.removeItem('registerToken');
                setTimeout(() => {
                  window.location.href = '/auth/login';
                }, 1500);

              }else{
                setFail(true);
              }
            });


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
              {success && (
                <Alert severity="success">Usuario creado con exito</Alert>
              )}
              {fail && (
                <Alert severity="error">Usuario ya registrado</Alert>
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
                // onChange check values if equal
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
  );
}
export default RegisterPassword;

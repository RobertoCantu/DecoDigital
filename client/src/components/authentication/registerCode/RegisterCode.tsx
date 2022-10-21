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
  Alert,
  Stack,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import "./RegisterCode.scss";
import * as Yup from "yup";
import { Formik, Form, FormikHelpers } from "formik";
import { LoadingButton } from "@mui/lab";

const theme = createTheme();
const api = window.api;
interface RegisterCodeProps {
  code: string;
  afterSubmit?: string;
}

const veriFyCodeSchema = Yup.object().shape({
  code: Yup.string()
    .min(6, "El codigo debe tener al menos 6 caracteres")
    .required("El codigo de verfificación es requerido"),
});

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
    <div>
      <Formik
        initialValues={{
          code: "",
        }}
        validationSchema={veriFyCodeSchema}
        onSubmit={async (
          values: RegisterCodeProps,
          { resetForm, setErrors }: FormikHelpers<RegisterCodeProps>
        ) => {
          try {
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
                autoComplete="code"
                type="text"
                label="Codigo de verificación"
                name="code"
                value={values.code}
                inputProps={{ maxLength: 6 }}
                onChange={handleChange}
                error={Boolean(touched.code && errors.code)}
                helperText={touched.code && errors.code}
              />

              <LoadingButton
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                Verificar Codigo
              </LoadingButton>
            </Stack>
          </Form>
        )}
      </Formik>
    </div>
  );
}
export default RegisterCode;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { LoadingButton } from "@mui/lab";
import { PHONE_REGEX } from "../../../utils/regex";
import { RegisterCode } from "../../authentication/registerCode";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { authentication } from "../../../firebase-config";

const theme = createTheme();
const api = window.api;
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
interface RegisterCodeProps {
  code: string;
  afterSubmit?: string;
}

const veriFyCodeSchema = Yup.object().shape({
  code: Yup.string()
    .min(6, "El codigo debe tener al menos 6 caracteres")
    .required("El codigo de verfificación es requerido"),
});

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
  const navigate = useNavigate();
  const [verifyCode, setVerifyCode] = useState(false);
  const [nuc, setNuc] = useState("");
  const [phone, setPhone] = useState("");
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

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response: any) => {},
      },
      authentication
    );
  };

  return (
    <>
      {verifyCode ? (
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
                const confirmationResult = window.confirmationResult;

                confirmationResult
                  .confirm(values.code)
                  .then(async (result: any) => {
                    // fetch user to register

                    navigate("/auth/register/password");
                  })
                  .catch((error: any) => {
                    console.log(error);
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
      ) : (
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
                    const requestOptions = {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        nuc: values.nuc,
                        phone: values.phone,
                      }),
                    };

                    await fetch(
                      "http://localhost:3000/api/user/register",
                      requestOptions
                    )
                      .then((response) => response.json())
                      .then((data) => {
                        if (!data.ok) {
                          setErrors({ afterSubmit: data.message });
                        } else {
                          generateRecaptcha();
                          let appVerifier = window.recaptchaVerifier;
                          signInWithPhoneNumber(
                            authentication,
                            "+526563529786",
                            appVerifier
                          )
                            .then(async (confirmationResult) => {
                              window.confirmationResult = confirmationResult;
                              console.log("Si se pudó", confirmationResult);
                              localStorage.setItem("registerToken", data.token);
                              setNuc(values.nuc);
                              setPhone(values.phone);
                              setVerifyCode(true);

                              // navigate("/auth/register/code", { replace: true });
                            })
                            .catch((error) => {
                              console.log(error);
                              // destroy recaptcha 
                              window.recaptchaVerifier.clear();
                            });
                        }
                      });

                    // go to next page

                    // print values
                    // navigate("/auth/register/password", { replace: true });

                    //fetch user to register
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
                        inputProps={{ maxLength: 10 }}
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
                        inputProps={{ maxLength: 10 }}
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
          <div id="recaptcha-container"></div>
        </div>
      )}
    </>
  );
}

export default RegisterForm;

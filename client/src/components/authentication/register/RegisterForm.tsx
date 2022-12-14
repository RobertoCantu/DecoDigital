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
import { useSnackbar } from "notistack";
import { MIconButton } from "../../@material-extend";
import { Icon } from "@iconify/react";
import closeFill from "@iconify/icons-eva/close-fill";

const theme = createTheme();
const api = "http://localhost:3000/api";
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
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
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

  /*
    Function para generar el captcha para verificar que el usuario no sea un bot y poder enviar el sms
  */
  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response: any) => {},
      },
      authentication //Configuracion del proyecto de firebase
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
                const confirmationResult = window.confirmationResult; //Se obtiene el resultado de la confirmacion del codigo
                //Funcion para verificar el codigo
                confirmationResult
                  .confirm(values.code)
                  .then(async (result: any) => {
                    // fetch user to register
                    enqueueSnackbar("¡Codigo verificado con exito!", {
                      variant: "success",
                      action: (key) => (
                        <MIconButton
                          size="small"
                          onClick={() => closeSnackbar(key)}
                        >
                          <Icon icon={closeFill} />
                        </MIconButton>
                      ),
                    });
                    //Se dirigira a la pagina de registro de contraseña
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
              {/* <Tab label="# Contrato" value="2" /> */}
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
                      `${api}/user/register`,
                      // "http://localhost:3000/api/user/register",
                      requestOptions
                    )
                      .then((response) => response.json())
                      .then((data) => {
                        if (!data.ok) {
                          setErrors({ afterSubmit: data.message });
                        } else {
                          generateRecaptcha(); //Genera el captcha para verificar que el usuario no sea un bot
                          let appVerifier = window.recaptchaVerifier;
                          signInWithPhoneNumber(
                            authentication, 
                            "+528113231175", //Numero de telefono, aqui se debe de hacer dinamigo con el numero de telefono que se envia en el body
                            appVerifier
                          )
                            .then(async (confirmationResult) => {
                              window.confirmationResult = confirmationResult; //objeto de confirmacion para verificar el codigo
                              localStorage.setItem("registerToken", data.token); //Guarda el token obtenido del backend que incluye el NUC y el telefono
                              setNuc(values.nuc); //Guarda el NUC 
                              setPhone(values.phone); //Guarda el telefono
                              setVerifyCode(true); //Cambia el estado para mostrar el componente de verificacion de codigo

                              // navigate("/auth/register/code", { replace: true });
                            })
                            .catch((error) => {
                              console.log(error);
                              // destroy recaptcha
                              window.recaptchaVerifier.clear();
                            });
                        }
                      });

                    enqueueSnackbar("¡Se ha enviado un codigo a tu celular!", {
                      variant: "success",
                      action: (key) => (
                        <MIconButton
                          size="small"
                          onClick={() => closeSnackbar(key)}
                        >
                          <Icon icon={closeFill} />
                        </MIconButton>
                      ),
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

            {/* <TabPanel value="2">
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
            </TabPanel> */}
          </TabContext>
          {/* Contenedor del captcha  */}
          <div id="recaptcha-container"></div> 
        </div>
      )}
    </>
  );
}

export default RegisterForm;

import { useState } from 'react'
import * as Yup from 'yup'

// Hooks
import useAuth from '../../../hooks/useAuth';

// UI
import { Formik, Form, FormikHelpers } from 'formik'
import { TextField, Stack, IconButton, InputAdornment, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import closeFill from '@iconify/icons-eva/close-fill';
import { MIconButton } from '../../@material-extend';
import { useSnackbar } from 'notistack';

//Utils
import {PHONE_REGEX} from '../../../utils/regex';

// Interfaces 
interface InitialValues {
  phone: string;
  password: string;
  afterSubmit?: string;
};

// Schemas 
const LoginSchema = Yup.object().shape({
  phone: Yup.string().min(10, 'El número de celular debe ser de 10 dígitos').required('Se requiere un número de celular.'),
  password: Yup.string().required('Se requiere una contraseña.')
});

function LoginForm() {
  // States
  const [showPassword, setShowPassword] = useState(false);

  // Context
  const context = useAuth();
  const {login} = context;

  // Snackbar helpers
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  // Functions 
  // This function toggle password view 
  const onClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  }

  return (
    <div>
    <Formik
      initialValues={{
        phone: '',
        password: '',
      }}
      validationSchema={LoginSchema}
      onSubmit={async (
        values: InitialValues,
        { resetForm, setErrors }: FormikHelpers<InitialValues>
      ) => {
        try {
          await login(values.phone, values.password);
          enqueueSnackbar('¡Bienvenido!', {
            variant: 'success',
            action: (key) => (
              <MIconButton size="small" onClick={() => closeSnackbar(key)}>
                <Icon icon={closeFill} />
              </MIconButton>
            )
          });
        } catch (error:any){
          resetForm();
          //Falta agregar useRef
          setErrors({ afterSubmit: error.message });
        }
      }}
    >
      {({handleChange, values, errors, touched, isSubmitting, setFieldValue}) => (
        <Form>
          <Stack spacing={2}>
            {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}
            <TextField
              fullWidth
              autoComplete="phone"
              type="text"
              label="Celular"
              name= "phone"
              value = {values.phone}
              inputProps={{ maxLength: 10 }}
              onChange={e => {
                e.preventDefault();
                const value = e.target.value.replace(PHONE_REGEX, "")
                setFieldValue("phone", value);
              }}
              error={Boolean(touched.phone && errors.phone)}
              helperText={touched.phone && errors.phone}
            />
            <TextField
              fullWidth
              autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              label="Contraseña"
              name= "password"
              value= {values.password}
              onChange = {handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={onClickShowPassword}>
                      <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
            <LoadingButton
              fullWidth
              size='large'
              type='submit'
              variant='contained'
              loading={isSubmitting}
            >
              Iniciar Sesión
            </LoadingButton>
          </Stack>
        </Form>
      )
      }
        
    </Formik>
  </div>
  )
}

export default LoginForm
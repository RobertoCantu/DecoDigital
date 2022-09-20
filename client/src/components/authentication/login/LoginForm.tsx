import { useState } from 'react'
import * as Yup from 'yup'


// UI
import { Formik, Form, FormikHelpers } from 'formik'
import { TextField, Stack, IconButton, InputAdornment, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';

// Interfaces 
interface InitialValues {
  email: string;
  password: string;
  afterSubmit?: string;
};

// Schemas 
const LoginSchema = Yup.object().shape({
  email: Yup.string().email('El correo debe ser valido.').required('Se requiere un correo.'),
  password: Yup.string().required('Se requiere una contraseña.')
});

function LoginForm() {
  // States
  const [showPassword, setShowPassword] = useState(false);

  // Functions 
  // This function toggle password view 
  const onClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  }

  return (
    <div>
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={LoginSchema}
      onSubmit={async (
        values: InitialValues,
        { resetForm, setErrors }: FormikHelpers<InitialValues>
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
        } catch (error:any){
          resetForm();
          //Falta agregar useRef
          setErrors({ afterSubmit: error.message });
        }
      }}
    >
      {({handleChange, values, errors, touched, isSubmitting}) => (
        <Form>
          <Stack spacing={2}>
            {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}
            <TextField
              fullWidth
              autoComplete="email"
              type="email"
              label="Correo electrónico"
              name= "email"
              value = {values.email}
              onChange = {handleChange}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
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
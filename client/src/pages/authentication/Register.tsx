import React from "react";
import { RegisterForm } from "../../components/authentication/register";
// Routing
import { Link as RouterLink } from "react-router-dom";

// UI
import { makeStyles } from "@mui/material/styles";
import { Box, Card, Stack, Container, Typography, Link } from "@mui/material";


const root:any = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  height: '100vh'
}

const mainContainer:any = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
}


function Register() {
  return (
    <div style={root}>
    <Container maxWidth="xl" style={mainContainer}>
      <Card sx={{padding:5}}>
        <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
          <Box sx={{flexGrow:1}}>
            <Typography variant="h4" component="h1" gutterBottom>
              Registrar nueva cuenta en Deco Digital
            </Typography>
            <Typography variant="body1" gutterBottom>
              Ingresa tus datos
            </Typography>
          </Box>
        </Stack>
        <RegisterForm />
      </Card>
    </Container>
    </div>
  );
}

export default Register;

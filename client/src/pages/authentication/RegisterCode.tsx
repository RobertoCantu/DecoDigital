import React from 'react'
import {RegisterCode} from '../../components/authentication/registerCode'
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
function RegisterCodeForm() {
  return (
    <div style={root}>
    <Container maxWidth="xl" style={mainContainer}>
      <Card sx={{padding:5}}>
        <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
          <Box sx={{flexGrow:1}}>
            <Typography variant="h4" component="h1" gutterBottom>
              Codigo de verificación enviado
            </Typography>
            <Typography variant="body1" gutterBottom>
              Ingrese el codigo que enviamos a su numero telefonico
            </Typography>
          </Box>
        </Stack>
        <RegisterCode />
      </Card>
    </Container>
    </div>
  )
}

export default RegisterCodeForm
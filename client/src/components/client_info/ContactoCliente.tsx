import React from "react";
import { Container, Grid, Box } from "@mui/material";

type Props = {};

const ContactoCliente = (props: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 4,
        bgcolor: "#BBDEFB",
        mt: 3,
        mb: 3,
        borderRadius: 1,
      }}
    >
      <div style={{ paddingBottom: "0.5em" }}>
        <strong>Teléfono:</strong>
        <span>813125659</span>
      </div>
      <div style={{ paddingBottom: "0.5em" }}>
        <strong>Correo(s):</strong>
        <span> correo@gmail.com</span>
      </div>
      <div style={{ paddingBottom: "0.5em" }}>
        <strong>Redes sociales:</strong>
        <span></span>
      </div>
    </Box>
  );
};

export default ContactoCliente;

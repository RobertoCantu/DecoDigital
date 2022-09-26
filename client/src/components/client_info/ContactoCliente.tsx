import React from "react";
import { Container, Grid, Box } from "@mui/material";

type Props = {};

const ContactoCliente = (props: Props) => {
  return (
    <Grid
      xs={4}
      sx={{
        bgcolor: "#BBDEFB",
        m: 1,
        p: 1,
        width: 1 / 2,
        borderRadius: 1,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", p: 4 }}>
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
    </Grid>
  );
};

export default ContactoCliente;

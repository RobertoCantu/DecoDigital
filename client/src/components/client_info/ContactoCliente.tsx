import React from "react";
import { Container, Grid, Box } from "@mui/material";
import Item from "../Item";

type Props = {
  client?: any;
};

const ContactoCliente = (props: Props) => {
  return (
    <Box
      sx={{
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
        p: 2,
        mt: 3,
        mb: 3,
        borderRadius: 1,
      }}
    >
      <Box sx={{ fontSize: "h5.fontSize", p: 1, pt: 1 }}>
        <strong style={{ color: "#37474f" }}>Datos de contacto</strong>
      </Box>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <strong style={{ padding: "1em", width: "7em" }}>Teléfono:</strong>
        <Item>{props.client.telef1}</Item>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <strong style={{ padding: "1em", width: "7em" }}>Correo(s):</strong>
        <Item> {props.client.correo_1}</Item>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        {/* <strong style={{ padding: "1em", width: "12em" }}>
          Redes sociales:
        </strong> */}
      </div>
    </Box>
  );
};

export default ContactoCliente;

import React from "react";
import { Container, Grid, Box } from "@mui/material";
import Item from "../Item";
type Props = {};

const VendorData = (props: Props) => {
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
      <Box
        sx={{
          fontSize: "h5.fontSize",
          p: 1,
          pt: 2,
        }}
      >
        <strong style={{ color: "#37474f" }}>Datos de vendedor</strong>
      </Box>
      <div
        style={{
          paddingLeft: "1em",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <strong style={{ padding: "1em", width: "9em", textAlign: "right" }}>
          Vendedor:
        </strong>
        <Item> 17286 Maria Luisa Olivo Samaniego</Item>
      </div>
      <div
        style={{
          paddingLeft: "1em",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <strong style={{ padding: "1em", width: "9em", textAlign: "right" }}>
          Subpromotor:
        </strong>
        <Item>166 Juana Castro Guevara</Item>
      </div>
      <div
        style={{
          paddingLeft: "1em",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <strong style={{ padding: "1em", width: "9em", textAlign: "right" }}>
          Promotor:
        </strong>
        <Item>42 Miguel Zamarron Diaz</Item>
      </div>
      <div
        style={{
          paddingLeft: "1em",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <strong style={{ padding: "1em", width: "9em", textAlign: "right" }}>
          Concesionaria:
        </strong>
        <Item>2400 Mercadotecnia Sultana de CV</Item>
      </div>
      <div
        style={{
          paddingLeft: "1em",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <strong style={{ padding: "1em", width: "9em", textAlign: "right" }}>
          Origen de la venta:
        </strong>
        <Item>Cambaceo</Item>
      </div>
    </Box>
  );
};

export default VendorData;

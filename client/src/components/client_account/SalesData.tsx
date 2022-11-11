import React from "react";
import { Container, Grid, Box } from "@mui/material";
import Item from "../Item";
type Props = {};

const SalesData = (props: Props) => {
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
        <strong style={{ color: "#37474f" }}>Datos de venta</strong>
      </Box>
      <div
        style={{
          paddingLeft: "1em",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <strong style={{ padding: "1em", width: "14em", textAlign: "right" }}>
          Div-Ope-Suc-Contrato:
        </strong>
        <Item> 02-20-03-4809</Item>
      </div>
      <div
        style={{
          paddingLeft: "1em",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <strong style={{ padding: "1em", width: "14em", textAlign: "right" }}>
          Fecha de venta:
        </strong>
        <Item>17-06-2012</Item>
      </div>
      <div
        style={{
          paddingLeft: "1em",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <strong style={{ padding: "1em", width: "14em", textAlign: "right" }}>
          Comportamiento: NORMAL
        </strong>
        <Item>01-08-2012</Item>
      </div>
    </Box>
  );
};

export default SalesData;

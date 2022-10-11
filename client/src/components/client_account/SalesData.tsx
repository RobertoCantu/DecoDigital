import React from "react";
import { Container, Grid, Box } from "@mui/material";

type Props = {};

const SalesData = (props: Props) => {
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
        <strong>Div-Ope-Suc-Contrato:</strong>
        <span></span>
      </div>
      <div style={{ paddingBottom: "0.5em" }}>
        <strong>Plan de Venta:</strong>
        <span></span>
      </div>
      <div style={{ paddingBottom: "0.5em" }}>
        <strong>Valor de pago:</strong>
        <span></span>
      </div>
      <div style={{ paddingBottom: "0.5em" }}>
        <strong>Fecha de venta:</strong>
        <span></span>
      </div>
    </Box>
  );
};

export default SalesData;

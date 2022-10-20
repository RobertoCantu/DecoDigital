import React from "react";
import { Container, Grid, Box } from "@mui/material";

type Props = {};

const ZonaHabitacional = (props: Props) => {
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
      <Box sx={{ fontSize: "h5.fontSize", p: 1, pt: 2 }}>
        <strong style={{ color: "#37474f" }}>Zona habitacional</strong>
      </Box>
      <div style={{ paddingLeft: "1em", paddingBottom: "1em" }}>
        <strong>Denominacion:</strong>
        <span></span>
      </div>
      <div style={{ paddingLeft: "1em", paddingBottom: "1em" }}>
        <strong>Nombre:</strong>
        <span></span>
      </div>
      <div style={{ paddingLeft: "1em", paddingBottom: "1em" }}>
        <strong>Zona:</strong>
        <span></span>
      </div>
      <div style={{ paddingLeft: "1em", paddingBottom: "1em" }}>
        <strong>Caraterísticas del domicilio:</strong>
        <span></span>
      </div>
    </Box>
  );
};

export default ZonaHabitacional;

import React from "react";
import { Container, Grid, Box } from "@mui/material";

type Props = {};

const ZonaHabitacional = (props: Props) => {
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
        <strong>Denominacion:</strong>
        <span></span>
      </div>
      <div style={{ paddingBottom: "0.5em" }}>
        <strong>Nombre:</strong>
        <span></span>
      </div>
      <div style={{ paddingBottom: "0.5em" }}>
        <strong>Zona:</strong>
        <span></span>
      </div>
      <div style={{ paddingBottom: "0.5em" }}>
        <strong>Caraterísticas del domicilio:</strong>
        <span></span>
      </div>
    </Box>
  );
};

export default ZonaHabitacional;

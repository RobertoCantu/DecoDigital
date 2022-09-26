import React from "react";
import { Container, Grid, Box } from "@mui/material";

type Props = {};

const ZonaHabitacional = (props: Props) => {
  return (
    <Grid
      xs={4}
      sx={{
        bgcolor: "#BBDEFB",
        m: 1,
        p: 1,
        borderRadius: 1,
        width: 1 / 2,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", p: 4 }}>
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
    </Grid>
  );
};

export default ZonaHabitacional;

import React from "react";
import { Container, Grid, Box } from "@mui/material";
type Props = {};

const ClientInfo = (props: Props) => {
  return (
    <Container maxWidth="lg">
      <Grid
        item
        sx={{
          bgcolor: "#BBDEFB",
          display: "flex",
          flexDirection: "row",
          m: 1,
          p: 1,
          width: 1,
          justifyContent: "center",
          borderRadius: 1,
        }}
      >
        <Grid xs={4} sx={{ display: "flex", flexDirection: "column", p: 2 }}>
          <Box sx={{ display: "flex", flexDirection: "row", pr: 4 }}>
            <div style={{ paddingBottom: "1em" }}>
              <strong>Nombre: </strong>
              <span style={{ paddingRight: "1em" }}>
                José Luis Alvarez Hernández
              </span>
            </div>
            <div>
              <strong>Número único de cliente: </strong>
              <span>22080481</span>
            </div>
          </Box>
          <h3>Dirección</h3>
          <Grid xs={4} sx={{ display: "flex", flexDirection: "row", p: 1 }}>
            <Box sx={{ display: "flex", flexDirection: "column", pr: 4 }}>
              <div style={{ paddingBottom: "1em" }}>
                <strong>Calle y No: </strong>
                <span>Avenida 2094</span>
              </div>
              <div style={{ paddingBottom: "1em" }}>
                <strong>Colonia: </strong>
                <span>Santa Fe Nor Poniente</span>
              </div>
              <div style={{ paddingBottom: "1em" }}>
                <strong>Ciudad:</strong>
                <span>Monterrey</span>
              </div>
              <div style={{ paddingBottom: "1em" }}>
                <strong>País: </strong>
                <span>México</span>
              </div>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", pl: 4 }}>
              <div style={{ paddingBottom: "1em" }}>
                <strong>Entre calles: </strong>
                <span>Calle 1 y Calle 2</span>
              </div>
              <div style={{ paddingBottom: "1em" }}>
                <strong>Municipio: </strong>
                <span>Monterrey</span>
              </div>
              <div style={{ paddingBottom: "1em" }}>
                <strong>Estado:</strong>
                <span>Nuevo León</span>
              </div>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ClientInfo;

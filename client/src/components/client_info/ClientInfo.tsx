import React from "react";
import { Container, Box } from "@mui/material";
import Item from "./Item";
type Props = {};

const ClientInfo = (props: Props) => {
  return (
    <>
      <Container maxWidth="lg" sx={{ boxShadow: 3, pb: 3 }}>
        <Box sx={{ fontSize: "h5.fontSize", p: 1, pt: 2 }}>
          <strong style={{ color: "#37474f" }}>Información del usuario</strong>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            flexDirection: "row",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <span style={{ padding: "1em" }}>Nombre: </span>
            <Item>José Luis Alvarez Hernández</Item>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <span style={{ padding: "1em" }}>Número único de cliente: </span>
            <Item>22080481</Item>
          </div>
        </Box>
        <Box sx={{ fontSize: "h6.fontSize", p: 1, pt: 2 }}>
          <strong style={{ color: "#37474f" }}>Dirección</strong>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            flexDirection: "row",
          }}
        >
          {/* Primer columna */}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <span
                style={{ padding: "1em", width: "7em", textAlign: "right" }}
              >
                Calle y No:{" "}
              </span>
              <Item>1 Avenida 2094</Item>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <span
                style={{ padding: "1em", width: "7em", textAlign: "right" }}
              >
                Colonia:{" "}
              </span>
              <Item>Santa Fe Nor Poniente</Item>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <span
                style={{ padding: "1em", width: "7em", textAlign: "right" }}
              >
                Ciudad:{" "}
              </span>
              <Item>Monterrey</Item>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <span
                style={{ padding: "1em", width: "7em", textAlign: "right" }}
              >
                País:{" "}
              </span>
              <Item>México</Item>
            </div>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <span
                style={{ padding: "1em", width: "8em", textAlign: "right" }}
              >
                Entre calles:
              </span>
              <Item>Calle 1 y Calle 2</Item>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <span
                style={{ padding: "1em", width: "8em", textAlign: "right" }}
              >
                Municipio:{" "}
              </span>
              <Item>Monterrey</Item>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <span
                style={{ padding: "1em", width: "8em", textAlign: "right" }}
              >
                Estado:{" "}
              </span>
              <Item>Nuevo León</Item>
            </div>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default ClientInfo;

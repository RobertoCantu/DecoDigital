import React, { useEffect, useState } from "react";
import { Container, Box } from "@mui/material";
import Item from "../Item";
import { fetchClientInfo } from "../../routes/routes-service";

type Props = {
  client?: any;
};

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
            <Item>
              {props.client.nomter} {props.client.apepaterno}{" "}
              {props.client.apematerno}
            </Item>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <span style={{ padding: "1em" }}>Número único de cliente: </span>
            <Item>{props.client.nuc}</Item>
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
              <Item>{props.client.direc}</Item>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <span
                style={{ padding: "1em", width: "7em", textAlign: "right" }}
              >
                Colonia:{" "}
              </span>
              <Item>{props.client.desccolonia}</Item>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <span
                style={{ padding: "1em", width: "7em", textAlign: "right" }}
              >
                Ciudad:{" "}
              </span>
              <Item>{props.client.descciudad}</Item>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <span
                style={{ padding: "1em", width: "7em", textAlign: "right" }}
              >
                País:{" "}
              </span>
              <Item>{props.client.descpais}</Item>
            </div>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <span
                style={{ padding: "1em", width: "8em", textAlign: "right" }}
              >
                Entre calles:
              </span>
              <Item>{props.client.entre_calles}</Item>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <span
                style={{ padding: "1em", width: "8em", textAlign: "right" }}
              >
                Municipio:{" "}
              </span>
              <Item>{props.client.descmunicipio}</Item>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <span
                style={{ padding: "1em", width: "8em", textAlign: "right" }}
              >
                Estado:{" "}
              </span>
              <Item>{props.client.descestado}</Item>
            </div>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default ClientInfo;

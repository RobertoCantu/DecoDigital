import React, { useState, useEffect } from "react";
import ClientInfo from "./ClientInfo";
import ZonaHabitacional from "./ZonaHabitacional";
import ContactoCliente from "./ContactoCliente";
import { Grid, Box, Container } from "@mui/material";
type Props = {};
type ClientData = {
  nuc: string;
  nomter: string;
  apepaterno: string;
  apematerno: string | null;
  direc: string;
  desccolonia: string;
  descciudad: string;
  entre_calles: string | null;
  descmunicipio: string;
  descestado: string;
  telef1: string;
  correo_1: string | null;
  descpais: string;
};
const ClientGrid = (props: Props) => {
  const [clientInfo, setClientInfo] = useState<ClientData>({
    nuc: "",
    nomter: "",
    apematerno: "",
    apepaterno: "",
    direc: "",
    desccolonia: "",
    descciudad: "",
    entre_calles: "",
    descmunicipio: "",
    descestado: "",
    telef1: "",
    correo_1: "",
    descpais: "",
  });

  useEffect(() => {
    const api = async () => {
      const data = await fetch("http://localhost:3000/api/ruta/client_info", {
        method: "GET",
        headers: new Headers({
          Authorization: "Gearer " + localStorage.getItem("accessToken"),
          "Content-Type": "application/x-www-form-urlencoded",
        }),
      });
      const jsonData = await data.json();
      setClientInfo(jsonData.data);
    };
    api();
  }, []);

  return (
    <div>
      <Container>
        <Grid item xs={12} md={12}>
          <ClientInfo client={clientInfo} />
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={7}>
            <ZonaHabitacional />
          </Grid>
          <Grid item xs={12} md={5}>
            <ContactoCliente client={clientInfo} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ClientGrid;

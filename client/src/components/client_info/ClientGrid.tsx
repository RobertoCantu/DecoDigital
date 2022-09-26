import React from "react";
import ClientInfo from "./ClientInfo";
import ZonaHabitacional from "./ZonaHabitacional";
import ContactoCliente from "./ContactoCliente";
import { Grid, Box, Container } from "@mui/material";
type Props = {};

const ClientGrid = (props: Props) => {
  return (
    <div>
      <ClientInfo />
      <Container maxWidth="lg">
        <Grid sx={{ display: " flex", flexDirection: "row" }}>
          <ZonaHabitacional />
          <ContactoCliente />
        </Grid>
      </Container>
    </div>
  );
};

export default ClientGrid;

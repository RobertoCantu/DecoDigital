import React from "react";
import ClientInfo from "./ClientInfo";
import ZonaHabitacional from "./ZonaHabitacional";
import ContactoCliente from "./ContactoCliente";
import { Grid, Box, Container } from "@mui/material";
type Props = {};

const ClientGrid = (props: Props) => {
  return (
    <div>
      <Container>
        <Grid item xs={12} md={12}>
          <ClientInfo />
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={7}>
            <ZonaHabitacional />
          </Grid>
          <Grid item xs={12} md={5}>
            <ContactoCliente />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ClientGrid;

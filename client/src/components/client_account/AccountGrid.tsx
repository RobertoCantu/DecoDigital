import React from "react";
import SalesData from "./SalesData";
import VendorData from "./VendorData";
import { Container, Grid, Box } from "@mui/material";
import ClientInfo from "../client_info/ClientInfo";

type Props = {};

const AccountGrid = (props: Props) => {
  return (
    <div>
      <ClientInfo />
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={7}>
            <SalesData />
          </Grid>
          <Grid item xs={12} md={5}>
            <VendorData />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default AccountGrid;

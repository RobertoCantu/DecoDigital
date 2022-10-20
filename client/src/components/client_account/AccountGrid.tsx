import React from "react";
import SalesData from "./SalesData";
import VendorData from "./VendorData";
import { Container, Grid, Box } from "@mui/material";
import ClientInfo from "../client_info/ClientInfo";
import AccountBalances from "./AccountBalances";
import AccountPaymentBreakdown from "./AccountPaymentBreakdown";

type Props = {};

const AccountGrid = (props: Props) => {
  return (
    <div>
      <Container>
        <ClientInfo />
        <Grid container spacing={2}>
          <Grid item xs={12} md={7}>
            <SalesData />
          </Grid>
          <Grid item xs={12} md={5}>
            <VendorData />
          </Grid>
        </Grid>
        <AccountBalances />
        <AccountPaymentBreakdown />
      </Container>
    </div>
  );
};

export default AccountGrid;

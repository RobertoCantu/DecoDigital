import React from "react";
import { Container, Grid, Box } from "@mui/material";
import AccountPaymentBreakdownTable from "./AccountPaymentBreakdownTable";
import AccountPaymentDueTable from "./AccountPaymentDueTable";

type Props = {};

const AccountPaymenDue = (props: Props) => {
  return (
    <Box
      sx={{
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
        p: 2,
        mt: 3,
        mb: 3,
        borderRadius: 1,
      }}
    >
      <Box
        sx={{
          fontSize: "h5.fontSize",
          p: 1,
          pt: 2,
        }}
      >
        <strong style={{ color: "#37474f" }}>Historial de pagos</strong>
      </Box>
      <div
        style={{
          paddingLeft: "1em",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      ></div>
      <AccountPaymentDueTable />
    </Box>
  );
};

export default AccountPaymenDue;

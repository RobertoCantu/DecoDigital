import React from "react";
import { Container, Grid, Box } from "@mui/material";

type Props = {};

const VendorData = (props: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 4,
        bgcolor: "#BBDEFB",
        mt: 3,
        mb: 3,
        borderRadius: 1,
      }}
    >
      <div style={{ paddingBottom: "0.5em" }}>
        <strong>Vendedor:</strong>
        <span>17286 Maria Luisa Oliva Samaniego</span>
      </div>
      <div style={{ paddingBottom: "0.5em" }}>
        <strong>Subpromotor:</strong>
        <span> 166 Juana Castro Guevara</span>
      </div>
      <div style={{ paddingBottom: "0.5em" }}>
        <strong>Promotor:</strong>
        <span>42 Miguel Zamarron Diaz</span>
      </div>
      <div style={{ paddingBottom: "0.5em" }}>
        <strong>Concesionaria: </strong>
        <span>2400 Mercadotecnia Sultana de CV</span>
      </div>
    </Box>
  );
};

export default VendorData;

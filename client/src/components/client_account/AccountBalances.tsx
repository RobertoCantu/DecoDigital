import React from "react";
import { Container, Grid, Box } from "@mui/material";
import Item from "../Item";
import AccountTable from "./AccountTable";
type Props = {};

const AccountBalances = (props: Props) => {
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
        <strong style={{ color: "#37474f" }}>Saldos</strong>
      </Box>
      <div
        style={{
          paddingLeft: "1em",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row" }}>
          <strong
            style={{
              padding: "1em",
              textAlign: "right",
            }}
          >
            Comportamiento:
          </strong>
          <Item> NORMAL</Item>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <strong
            style={{
              padding: "1em",
              textAlign: "right",
            }}
          >
            Fecha del siguiente pago:
          </strong>
          <Item> 12-05-20</Item>
        </div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <strong
            style={{
              padding: "1em",
              textAlign: "right",
            }}
          >
            Día de pago:
          </strong>
          <Item> 12-05-20</Item>
        </div>
      </div>
      <div
        style={{
          paddingLeft: "1em",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row" }}>
          <strong
            style={{
              padding: "1em",
              textAlign: "right",
            }}
          >
            Días vencidos periodo:
          </strong>
          <Item> _</Item>
        </div>
      </div>
      <AccountTable />
      <div>
        <Box
          sx={{
            fontSize: "h5.fontSize",
            p: 1,
            pt: 2,
          }}
        >
          <strong style={{ color: "#37474f" }}>Referencia a prepagos</strong>
        </Box>
        <div
          style={{
            paddingLeft: "1em",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <strong
              style={{
                padding: "1em",
                textAlign: "right",
              }}
            >
              Abono a contrato:
            </strong>
            <Item> $0.00</Item>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default AccountBalances;

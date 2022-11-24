import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(tipo: string, folio: string, fecha: string, pago: number) {
  return {
    tipo,
    folio,
    fecha,
    pago,
  };
}

const rows = [createData("PG", "RB1201529256", "18/07/2012", 280.0)];

export default function AccountPaymentBreakdownTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: 600 }} align="center">
              Tipo
            </TableCell>
            <TableCell style={{ fontWeight: 600 }} align="center">
              Folio&nbsp;
            </TableCell>
            <TableCell style={{ fontWeight: 600 }} align="center">
              Fecha &nbsp;
            </TableCell>
            <TableCell style={{ fontWeight: 600 }} align="center">
              Pago&nbsp;
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.tipo}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{row.tipo}</TableCell>
              <TableCell align="center">{row.folio}</TableCell>
              <TableCell align="center">{row.fecha}</TableCell>
              <TableCell align="center">{row.pago}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

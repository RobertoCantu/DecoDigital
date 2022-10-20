import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(
  tipo: string,
  folio: string,
  fecha: string,
  monto: number,
  capital: number,
  intereses: number,
  iva: number,
  moratorio: number,
  iva_moratorio: number
) {
  return {
    tipo,
    folio,
    fecha,
    monto,
    capital,
    intereses,
    iva,
    moratorio,
    iva_moratorio,
  };
}

const rows = [
  createData(
    "PG",
    "RB1201529256",
    "18/07/2012",
    280.0,
    197.54,
    42.84,
    38.62,
    0.0,
    0.0
  ),
  createData(
    "PG",
    "RB1201529256",
    "18/07/2012",
    280.0,
    197.54,
    42.84,
    38.62,
    0.0,
    0.0
  ),
  createData(
    "PG",
    "RB1201529256",
    "18/07/2012",
    280.0,
    197.54,
    42.84,
    38.62,
    0.0,
    0.0
  ),
  createData(
    "PG",
    "RB1201529256",
    "18/07/2012",
    280.0,
    197.54,
    42.84,
    38.62,
    0.0,
    0.0
  ),
  createData(
    "PG",
    "RB1201529256",
    "18/07/2012",
    280.0,
    197.54,
    42.84,
    38.62,
    0.0,
    0.0
  ),
];

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
              Fecha&nbsp;
            </TableCell>
            <TableCell style={{ fontWeight: 600 }} align="center">
              Monto&nbsp;
            </TableCell>
            <TableCell style={{ fontWeight: 600 }} align="center">
              Capital&nbsp;
            </TableCell>
            <TableCell style={{ fontWeight: 600 }} align="center">
              Intereses&nbsp;
            </TableCell>
            <TableCell style={{ fontWeight: 600 }} align="center">
              IVA&nbsp;
            </TableCell>
            <TableCell style={{ fontWeight: 600 }} align="center">
              Moratorio&nbsp;
            </TableCell>
            <TableCell style={{ fontWeight: 600 }} align="center">
              IVA Moratorio&nbsp;
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
              <TableCell align="center">{row.monto}</TableCell>
              <TableCell align="center">{row.capital}</TableCell>
              <TableCell align="center">{row.intereses}</TableCell>
              <TableCell align="center">{row.iva}</TableCell>
              <TableCell align="center">{row.moratorio}</TableCell>
              <TableCell align="center">{row.iva_moratorio}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

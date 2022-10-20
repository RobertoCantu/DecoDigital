import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(
  concepto: string,
  pago: number,
  vencido: number,
  por_vencer: number
) {
  return { concepto, pago, vencido, por_vencer };
}

const rows = [
  createData("Pagos", 6, 0, 0),
  createData("Capital", 1259.88, 0, 0.04),
  createData("Intereses", 182.16, 0, 0.0),
  createData("IVA", 230.73, 0.0, 0.0),
  createData("Moratorio", 9.45, 0.0, 0.0),
  createData("IVA Moratorio", 1.51, 0.0, 0.0),
  createData("Totales", 1672.77, 0.0, 0.0),
];

export default function AccountTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: 600 }}>Concepto</TableCell>
            <TableCell style={{ fontWeight: 600 }} align="right">
              Pago&nbsp;
            </TableCell>
            <TableCell style={{ fontWeight: 600 }} align="right">
              Vencido&nbsp;
            </TableCell>
            <TableCell style={{ fontWeight: 600 }} align="right">
              Por vencer&nbsp;
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.concepto}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.concepto}
              </TableCell>
              <TableCell align="right">{row.pago}</TableCell>
              <TableCell align="right">{row.vencido}</TableCell>
              <TableCell align="right">{row.por_vencer}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

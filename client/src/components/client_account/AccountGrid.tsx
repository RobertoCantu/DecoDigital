import React, { useState, useEffect } from "react";
import SalesData from "./SalesData";
import VendorData from "./VendorData";
import { Container, Grid, Box } from "@mui/material";
import ClientInfo from "../client_info/ClientInfo";
import AccountBalances from "./AccountBalances";
import AccountPaymentBreakdown from "./AccountPaymentBreakdown";
import AccountPaymenDue from "./AccountPaymenDue";
import { useParams } from "react-router-dom";

// Components
//import Breadcrumb from '../Breadcrumb'
type ClientData = {
  nuc: string;
  nomter: string;
  apepaterno: string;
  apematerno: string | null;
  direc: string;
  desccolonia: string;
  descciudad: string;
  entre_calles: string | null;
  descmunicipio: string;
  descestado: string;
  telef1: string;
  correo_1: string | null;
  descpais: string;
};

type Props = {};

const AccountGrid = (props: Props) => {
  const id = useParams();
  console.log(id);
  const [clientInfo, setClientInfo] = useState<ClientData>({
    nuc: "",
    nomter: "",
    apematerno: "",
    apepaterno: "",
    direc: "",
    desccolonia: "",
    descciudad: "",
    entre_calles: "",
    descmunicipio: "",
    descestado: "",
    telef1: "",
    correo_1: "",
    descpais: "",
  });

  const customHeaders: any = {
    Authorization: "Bearer " + localStorage.getItem("accessToken"),
    "Content-Type": "application/x-www-form-urlencoded",
    nuc: localStorage.getItem("nuc"),
  };
  useEffect(() => {
    const api = async () => {
      const data = await fetch("http://localhost:3000/api/ruta/client_info", {
        method: "GET",
        headers: customHeaders,
      });
      const jsonData = await data.json();
      setClientInfo(jsonData.data);
    };
    api();
  }, []);
  return (
    <div>
      <Container sx={{marginTop: 5}}>
        {/* <Breadcrumb/> */}
        <ClientInfo client={clientInfo} />
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
        <AccountPaymenDue />
      </Container>
    </div>
  );
};

export default AccountGrid;

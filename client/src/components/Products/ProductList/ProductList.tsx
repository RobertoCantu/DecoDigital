import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import TextareaAutosize from "@mui/material/TextareaAutosize";

import { Container } from "@mui/system";
import "./ProductList.scss";

const api = "http://localhost:3000/api";

async function reportProduct(id: number, contract: string, message: string) {
  const body = {
    contract,
    message,
  };
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-token": localStorage.getItem("accessToken") || "",
    },
    body: JSON.stringify(body),
  };

  await fetch(`${api}/mail/report/product/${id}`, fetchOptions);
  //   await fetch(`${api}/mail/report/product/${id}`, fetchOptions).then((res) => {
  // 	console.log(res);
  //   });
}
interface SimpleDialogProps {
  open: boolean;
  onClose: (value: string) => void;
  message: string;
}

function ReportModal(props: SimpleDialogProps) {
  const { onClose, open } = props;
  const [message, setMessage] = useState("");
  const handleClose = () => {
    onClose("close");
  };
  const handleReport = () => {
    onClose(message);
  };

  return (
    <Dialog onClose={handleClose} open={open} className="modal">
      <DialogTitle className="modal-title">Report Product</DialogTitle>
      <TextareaAutosize
        className="modal-textarea"
        aria-label="empty textarea"
        placeholder="Place your report here..."
        style={{ minHeight: 50 }}
        onChange={(e) => setMessage(e.target.value)}
      />
      <div className="buttons">
        <Button
          className="button cancel"
          variant="outlined"
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button className="button" variant="contained" onClick={handleReport}>
          Report
        </Button>
      </div>
    </Dialog>
  );
}

function ProductList() {
  //const [products, setProducts] = useState([{ title: "test", contract: 0 }]);

  const products = [
    { title: "Product 1", contract: 1 },
    { title: "Product 2", contract: 2 },
    { title: "Product 3", contract: 3 },
    { title: "Product 4", contract: 4 },
    { title: "Product 5", contract: 5 },
    { title: "Product 6", contract: 6 },
    { title: "Product 7", contract: 7 },
    { title: "Product 8", contract: 8 },
    { title: "Product 9", contract: 9 },
    { title: "Product 10", contract: 10 },
    { title: "Product 11", contract: 11 },
    { title: "Product 12", contract: 12 },
    { title: "Product 13", contract: 13 },
    { title: "Product 14", contract: 14 },
    { title: "Product 15", contract: 15 },
    { title: "Product 16", contract: 16 },
  ];
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(-1);
  const [contract, setContract] = useState("");
  const [message, setMessage] = useState("");

  const handleClickOpen = (id: number, contract: string) => {
    setId(id);
    setContract(contract);
    setOpen(true);
  };

  const handleClickClose = (message: string) => {
    setOpen(false);
    setMessage(message);
    if (message !== "close") {
      reportProduct(id, contract, message);
    }
  };

  // useEffect(() => {
  //   //setProducts(product);
  // }, [{ title: "test", contract: 0 }]);

  return (
    <>
      <div className="container">
        <div className="products">
          {products?.map((product, index) => (
            <Card
              key={index}
              sx={{ width: 1 / 5, height: 150 }}
              className="product"
            >
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {product.title}
                </Typography>
                <Typography variant="body2">
                  Contract: {product.contract}
                </Typography>
              </CardContent>
              <CardActions className="buttons">
                <Button
                  variant="outlined"
                  size="medium"
                  color="warning"
                  sx={{ color: "red" }}
                  onClick={() =>
                    // reportProduct(product.contract, product.title, "hola")
                    handleClickOpen(product.contract, product.title)
                  }
                >
                  Report
                </Button>
                <Button variant="contained" size="medium">
                  See More
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
        <ReportModal open={open} onClose={handleClickClose} message={message} />
      </div>
    </>
  );
}

export default ProductList;

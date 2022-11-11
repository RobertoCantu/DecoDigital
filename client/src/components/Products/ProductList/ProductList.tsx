import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import "./ProductList.scss";

type Props = {
  product?: any;
};

type Product = {
  Contrato: number;
  Descripcion: string;
};

function ProductList(props: Props) {
  const [products, setProducts] = useState<Product[]>([
    {
      Contrato: 0,
      Descripcion: "",
    },
  ]);

  useEffect(() => {
    const api = async () => {
      const customHeaders: any = {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
        "Content-Type": "application/x-www-form-urlencoded",
        nuc: localStorage.getItem("nuc"),
      };
      const data = await fetch("http://localhost:3000/api/ruta/products", {
        method: "GET",
        headers: customHeaders,
      });
      const jsonData = await data.json();
      if (Object.prototype.toString.call(jsonData) === "[object Array]") {
        setProducts(jsonData.data);
      } else {
        setProducts([jsonData.data]);
      }
    };
    api();
  }, []);

  function reportProduct(contrato: number, descripcion: string) {
    console.log(contrato, descripcion);
  }

  return (
    <>
      <div className="container">
        <div className="products">
          {products?.map((product: Product, index: number) => (
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
                  {product.Descripcion}
                </Typography>
                <Typography variant="body2">
                  Contract: {product.Contrato}
                </Typography>
              </CardContent>
              <CardActions className="buttons">
                <Button
                  variant="outlined"
                  size="medium"
                  color="warning"
                  sx={{ color: "red" }}
                  onClick={() =>
                    reportProduct(product.Contrato, product.Descripcion)
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
      </div>
    </>
  );
}

export default ProductList;

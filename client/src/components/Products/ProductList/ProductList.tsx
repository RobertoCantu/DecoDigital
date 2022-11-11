import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import "./ProductList.scss";


function reportProduct(id:number, contract: string){
	console.log(id);
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
									onClick={() => reportProduct(product.contract, product.title)}
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

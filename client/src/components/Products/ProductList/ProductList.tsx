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
import { useNavigate } from "react-router-dom";

type Props = {
	product?: any;
};

type Product = {
	Contrato: number;
	Descripcion: string;
};

// function reportProduct(contrato: number, descripcion: string) {
//   console.log(contrato, descripcion);
// }

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

//const [products, setProducts] = useState([{ title: "test", contract: 0 }]);

function ProductList(props: Props) {
	const navigate = useNavigate();
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
										// reportProduct(product.Contrato, product.Descripcion, "hola")
										handleClickOpen(product.Contrato, product.Descripcion)
									}
								>
									Reportar
								</Button>
								<Button
									variant="contained"
									size="medium"
									onClick={() => {
										navigate("1");
									}}
								>
									Ver mas
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

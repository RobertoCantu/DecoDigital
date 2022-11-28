import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import CircularProgress from '@mui/material/CircularProgress';
import { LoadingButton } from '@mui/lab';

import { Container } from '@mui/system';
import './ProductList.scss';
import { useNavigate } from 'react-router-dom';

import { useSnackbar } from 'notistack';
import { MIconButton } from '../../@material-extend';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';


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

const api = 'http://localhost:3000/api';

async function reportProduct(id: number, contract: string, message: string) {
	const body = {
		contract,
		message,
	};
	const fetchOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
			'x-token': localStorage.getItem('accessToken') || '',
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
  id:any;
  contract:any;
  setOpen:any;
}

function ReportModal(props: SimpleDialogProps) {
  // Snackbar helpers
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const { onClose, open, id, contract, setOpen } = props;
  const [loading, setLoading] = useState(false)
	const [message, setMessage] = useState('');
	const handleClose = () => {
		onClose('close');
	};
	const handleReport = () => {
		onClose(message);
	};

  const handleReportSubmit = async () => {
    setLoading(true);
    const response = await reportProduct(id, contract, message)
    setLoading(false);
    setOpen(false);
    enqueueSnackbar('¡Correo enviado con exito!', {
      variant: 'success',
      action: (key) => (
        <MIconButton size="small" onClick={() => closeSnackbar(key)}>
          <Icon icon={closeFill} />
        </MIconButton>
      )
    });
  }

	return (
		<Dialog onClose={handleClose} open={open} className='modal'>
			<DialogTitle className='modal-title'>Reportar Producto</DialogTitle>
			<TextareaAutosize
				className='modal-textarea'
				aria-label='empty textarea'
				placeholder='Escribe tu reporte aqui...'
				style={{ minHeight: 50 }}
				onChange={(e) => setMessage(e.target.value)}
			/>
			<div className='buttons'>
				<Button
					className='button cancel'
					variant='outlined'
					onClick={handleClose}
				>
					Cancelar
				</Button>
				<LoadingButton loading={loading} className='button' variant='contained' onClick={handleReportSubmit}>
					Reportar
				</LoadingButton>
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
			Descripcion: '',
		},
	]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const controller = new AbortController();
		const api = async () => {
			const customHeaders: any = {
				Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
				'Content-Type': 'application/x-www-form-urlencoded',
				nuc: localStorage.getItem('nuc'),
			};

			try {
				const data = await fetch('http://localhost:3000/api/ruta/products', {
					method: 'GET',
					headers: customHeaders,
					signal: controller.signal,
				});
				const jsonData = await data.json();
				if (Object.prototype.toString.call(jsonData) === '[object Array]') {
					setProducts(jsonData.data);
					console.log(jsonData);
					setLoading(false);
				} else {
					console.log(jsonData);

					setProducts([jsonData.data]);
					setLoading(false);
				}
			} catch (err) {
				console.log(err);
				//setLoading(false);
			}
		};
		api();
		return () => {
			controller.abort();
		};
	}, []);

	const [open, setOpen] = useState(false);
	const [id, setId] = useState(-1);
	const [contract, setContract] = useState('');
	const [message, setMessage] = useState('');

	const handleClickOpen = (id: number, contract: string) => {
		setId(id);
		setContract(contract);
		setOpen(true);
	};

	const handleClickClose = (message: string) => {
		setOpen(false);
		setMessage(message);
		if (message !== 'close') {
			reportProduct(id, contract, message);
		}
	};

	return (
		<>
			<div className='container'>
				<div className='products'>
					{products?.map((product: Product, index: number) => (
						<Card
							key={index}
							sx={{ width: 1 / 5, height: 150 }}
							className='product'
						>
							<CardContent>
								{loading ? (
									<Box sx={{ display: 'flex' }}>
										<CircularProgress sx={{}} />
									</Box>
								) : (
									<>
										<Typography
											sx={{ fontSize: 14 }}
											color='text.secondary'
											gutterBottom
										>
											{product.Descripcion}
										</Typography>
										<Typography variant='body2'>
											Contract: {product.Contrato}
										</Typography>
									</>
								)}
							</CardContent>
							<CardActions className='buttons'>
								<Button
									variant='outlined'
									size='medium'
									color='warning'
									sx={{ color: 'red' }}
									onClick={() =>
										// reportProduct(product.Contrato, product.Descripcion, "hola")
										handleClickOpen(product.Contrato, product.Descripcion)
									}
								>
									Reportar
								</Button>
								<Button
									variant='contained'
									size='medium'
									onClick={() => {
										navigate('1');
									}}
								>
									Ver mas
								</Button>
							</CardActions>
						</Card>
					))}
				</div>
				<ReportModal open={open} onClose={handleClickClose} message={message} id={id} contract={contract} setOpen={setOpen} />
			</div>
		</>
	);
}

export default ProductList;

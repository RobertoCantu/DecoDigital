import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

// icons
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import { MIconButton } from './components/@material-extend';


const notistackRef:any = React.createRef();
const onClickDismiss = (key: any) => () => { 
    notistackRef.current.closeSnackbar(key);
}
const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SnackbarProvider
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        ref={notistackRef}
        action={(key) => (
          <MIconButton size="small" onClick={onClickDismiss(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )}
      >
        <App />
      </SnackbarProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

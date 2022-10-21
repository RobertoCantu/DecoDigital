import {useEffect} from 'react'
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

function useLogout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    logout().then(() => {     
      navigate('/');
    }).catch((error) =>  {
      console.error(error);
      enqueueSnackbar('Unable to logout', { variant: 'error' });
    });
  }, []);

  return null;
}

export default useLogout
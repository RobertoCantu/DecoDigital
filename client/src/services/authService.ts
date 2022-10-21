// utils
import axios from '../utils/axios';

export async function login(phone:string,password:string)
{
  return new Promise(async (resolve,reject) => {
    const url = '/api/ruta/login';

    try {
      const response =  await axios.post(url, {
        phone,
        password,
      });
      resolve(response.data)
    } catch(err){
      reject(err);
    }
  });
}

export async function register(nuc:string, phone: number)
{
  return new Promise(async (resolve,reject) => {
    const url = '/users/createUser';

    try {
      const response =  await axios.post(url, {
        nuc,
        phone
      });

      resolve(response.data)

    } catch(err){
      reject(err);
    }
  });
}
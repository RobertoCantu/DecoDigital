// utils
import axios from '../utils/axios';

export async function login(phone:number,password:string)
{
  return new Promise(async (resolve,reject) => {
    const url = '/users/login';

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

export async function register(firstName: string, lastName: string, email:string, phone:string, password: string)
{
  return new Promise(async (resolve,reject) => {
    const url = '/users/createUser';

    try {
      const response =  await axios.post(url, {
        email,
        phone,
        "name": firstName,
        lastName,
        password,
      });

      resolve(response.data)

    } catch(err){
      reject(err);
    }
  });
}
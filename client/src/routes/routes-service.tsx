import axios from "axios";

export async function fetchClientInfo() {
  console.log(localStorage.getItem("accessToken"));
  return new Promise(async (resolve, reject) => {
    const url = `http://localhost:3000/api/ruta/client_info`;
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      });
      console.log(response.data);
      resolve(response.data);
    } catch (err) {
      reject(err);
    }
  });
}

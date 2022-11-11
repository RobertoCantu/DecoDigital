import axios from "axios";

export async function fetchClientInfo() {
  const url = `http://localhost:3000/api/ruta/client_info`;
  fetch(url, {
    method: "get",
    headers: new Headers({
      Authorization: "Gearer " + localStorage.getItem("accessToken"),
      "Content-Type": "application/x-www-form-urlencoded",
    }),
  }).then((res) => res.json);
}

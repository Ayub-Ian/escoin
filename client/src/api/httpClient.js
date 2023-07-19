import axios from "axios";

const API_URL = "http://localhost:3000";

const getToken = () => {
    const token = localStorage.getItem('token')
    return token ? token : null;
}

const client = () =>
  axios.create({
    baseURL: API_URL,
    timeout: 60000,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + getToken(),
    },
  });


export default client
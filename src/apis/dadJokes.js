import axios from "axios";
const BASE_URL = "https://icanhazdadjoke.com";

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json",
    // prettier-ignore
    "Accept": "application/json",
  },
});

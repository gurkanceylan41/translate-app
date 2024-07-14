import axios from "axios";

export default axios.create({
  baseURL: "https://text-translator2.p.rapidapi.com",
  headers: {
    "x-rapidapi-key": "d0e15ac2c8msh52e217e5beedbdap125aa1jsnb7ae30d32411",
    "x-rapidapi-host": "text-translator2.p.rapidapi.com",
  },
});

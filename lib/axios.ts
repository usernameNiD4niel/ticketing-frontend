import Axios from "axios";

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    // Authorization: "Bearer 24|lWwCeyAF2C0PNT1uFSbnR4wKDKJuVrhgBaO0QQno0323c3ca",
    // "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axios;

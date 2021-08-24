import axios from "axios";
import { config } from "../config";
import { store } from '../store';

const api = axios.create({
  baseURL: config.backendUrl,
});

api.interceptors.request.use(config => {
  const { address, signature } = store.getState().auth.user;
  config.headers.signature = signature;
  config.headers.address = address;
  return config;
})

export { api };

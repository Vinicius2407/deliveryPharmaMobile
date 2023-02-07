import axios from "axios";
import { Buffer } from "buffer";

export let api = axios.create({
  // baseURL: `http://54.94.145.24:8080/`,
  baseURL: `http://192.168.0.106:8080/`,
  timeout: 5000,
  timeoutErrorMessage: "Excedido o tempo",
});

export const setHeadersAuthorization = (basicAuth: string) => {
  const encodedToken = Buffer.from(basicAuth).toString("base64");
  api.defaults.headers.common["Authorization"] = `Basic ${encodedToken}`;
};

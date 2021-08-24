import { api } from "./api";

export const deposit = (data) => api.post('/deposit', data);
export const placeOrder = (data) => api.post('/placeOrder', data)
export const cancelOrder = (data) => api.post('/cancelOrder', data);
export const getBalances = () => api.get('/getBalances').then(res => res.data);
export const getOrders = () => api.get('/getOrders').then(res => res.data);
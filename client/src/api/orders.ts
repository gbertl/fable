import axios from '../axios';
import { apiRoutes } from '../routes';
import { Order } from '../types';

export const createOrder = (newOrder: Order) =>
  axios.post(apiRoutes.orderList, newOrder);

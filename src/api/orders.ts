import axios from '../axios';
import { Order } from '../types';

export const createOrder = (newOrder: Order) => axios.post('/orders', newOrder);

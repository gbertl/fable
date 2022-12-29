import axios from '../axios';
import Order from '../types/order';

const createOrder = (newOrder: Order) => axios.post('/orders', newOrder);

export default createOrder;

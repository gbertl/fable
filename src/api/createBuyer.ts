import axios from '../axios';
import { Buyer } from '../types';

const createBuyer = (newBuyer: Buyer) => {
  return axios.post('/buyers', newBuyer);
};

export default createBuyer;

import axios from '../axios';
import { Buyer } from '../types';

const updateBuyer = (id: string, newBuyer: Buyer) =>
  axios.put(`/buyers/${id}`, newBuyer);

export default updateBuyer;

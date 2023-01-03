import axios from '../axios';
import { Buyer } from '../types';

export const createBuyer = (newBuyer: Buyer) => axios.post('/buyers', newBuyer);

export const getBuyer = (id: string, populate?: string[]) => {
  // populate[0]=orders
  let populateQuery = '';

  populate?.forEach((p, idx) => {
    populateQuery +=
      idx === 0 ? `?populate[${idx}]=${p}` : `&populate[${idx}]=${p}`;
  });

  return axios.get(`/buyers/${id}${populateQuery || ''}`);
};

export const updateBuyer = (id: string, newBuyer: Buyer) =>
  axios.put(`/buyers/${id}`, newBuyer);

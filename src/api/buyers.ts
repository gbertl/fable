import { generatePath } from 'react-router-dom';
import axios from '../axios';
import { apiRoutes } from '../routes';
import { Buyer } from '../types';

export const createBuyer = (newBuyer: Buyer) =>
  axios.post(apiRoutes.buyerList, newBuyer);

export const getBuyer = (id: string, populate?: string[]) => {
  // populate[0]=orders
  let populateQuery = '';

  populate?.forEach((p, idx) => {
    populateQuery +=
      idx === 0 ? `populate[${idx}]=${p}` : `&populate[${idx}]=${p}`;
  });

  return axios.get(
    `${generatePath(apiRoutes.buyerDetail, {
      id,
    })}?${populateQuery}`
  );
};

export const updateBuyer = ({
  id,
  newBuyer,
}: {
  id: string;
  newBuyer: Buyer;
}) =>
  axios.put(
    generatePath(apiRoutes.buyerDetail, {
      id,
    }),
    newBuyer
  );

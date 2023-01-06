import { generatePath } from 'react-router-dom';
import axios from '../axios';
import { apiRoutes } from '../routes';
import { Buyer } from '../types';

export const createBuyer = (newBuyer: Buyer) =>
  axios.post(apiRoutes.buyerList, newBuyer);

export const getBuyer = ({
  id,
  populate,
  limit,
}: {
  id: string;
  populate?: string[];
  limit?: Object[];
}) => {
  // populate[0]=orders
  let populateQuery = '';

  populate?.forEach((p, idx) => {
    populateQuery +=
      idx === 0 ? `?populate[${idx}]=${p}` : `&populate[${idx}]=${p}`;
  });

  // limit[0][orders]=2
  let limitQuery = '';

  limit?.forEach((l, idx) => {
    for (const [key, value] of Object.entries(l)) {
      limitQuery += `&limit[${idx}][${key}]=${value}`;
    }
  });

  console.log(limitQuery);

  return axios.get(
    `${generatePath(apiRoutes.buyerDetail, {
      id,
    })}${populateQuery}${limitQuery}`
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

import axios from '../axios';

const getBuyer = (id: string, populate?: string[]) => {
  // populate[0]=orders
  let populateQuery = '';

  populate?.forEach((p, idx) => {
    populateQuery +=
      idx === 0 ? `?populate[${idx}]=${p}` : `&populate[${idx}]=${p}`;
  });

  return axios.get(`/buyers/${id}${populateQuery || ''}`);
};

export default getBuyer;

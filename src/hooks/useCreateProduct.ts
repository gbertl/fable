import { useAuth0 } from '@auth0/auth0-react';
import { AxiosError, AxiosResponse } from 'axios';
import { Query, useMutation, useQueryClient } from 'react-query';

import { NewProduct } from '../typings';
import * as api from '../api';

const useCreateProduct = (onSuccess?: () => any, onError?: () => any) => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse, AxiosError, NewProduct>(
    async (values) => {
      const token = await getAccessTokenSilently();
      return api.createProduct(values, token);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('products');

        if (onSuccess) {
          onSuccess();
        }
      },
      onError,
    }
  );
};

export default useCreateProduct;

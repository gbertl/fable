import { useAuth0 } from '@auth0/auth0-react';
import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from 'react-query';

import { NewProduct } from '../types';
import * as api from '../api';
import { Product, UpdateProduct } from '../types';

export const useCreateProduct = (
  onSuccess?: () => any,
  onError?: () => any
) => {
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

export const useUpdateProduct = (
  onSuccess?: () => any,
  onError?: () => any
) => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  return useMutation<
    AxiosResponse<Product>,
    AxiosError,
    { id: string; product: UpdateProduct }
  >(
    async ({ id, product }) => {
      const token = await getAccessTokenSilently();
      return api.updateProduct(id, product, token);
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

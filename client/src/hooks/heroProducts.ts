import { useAuth0 } from '@auth0/auth0-react';
import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from 'react-query';

import { UpdateHeroProduct, NewHeroProduct } from '../types';
import * as api from '../api';

export const useCreateHeroProduct = (
  onSuccess?: () => any,
  onError?: () => any
) => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse, AxiosError, NewHeroProduct>(
    async (values) => {
      const token = await getAccessTokenSilently();

      return api.createHeroProduct(values, token);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('heroProducts');

        if (onSuccess) {
          onSuccess();
        }
      },
      onError,
    }
  );
};

export const useUpdateHeroProduct = (
  onSuccess?: () => any,
  onError?: () => any
) => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  return useMutation<
    AxiosResponse,
    AxiosError,
    { id: string; heroProduct: UpdateHeroProduct }
  >(
    async ({ id, heroProduct }) => {
      const token = await getAccessTokenSilently();

      return api.updateHeroProduct(id, heroProduct, token);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('heroProducts');

        if (onSuccess) {
          onSuccess();
        }
      },
      onError,
    }
  );
};

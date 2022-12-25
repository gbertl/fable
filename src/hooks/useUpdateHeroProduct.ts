import { useAuth0 } from '@auth0/auth0-react';
import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, useQueryClient } from 'react-query';

import { UpdateHeroProduct } from '../typings';
import * as api from '../api';

const useUpdateHeroProduct = (onSuccess?: () => any, onError?: () => any) => {
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

export default useUpdateHeroProduct;

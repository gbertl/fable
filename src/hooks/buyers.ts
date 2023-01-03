import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';

import * as api from '../api';
import { Buyer } from '../types';

export const useCreateBuyer = (
  onSuccess?: () => void,
  onError?: () => void
) => {
  return useMutation<AxiosResponse<Buyer>, AxiosError, Buyer>(api.createBuyer, {
    onSuccess,
    onError,
  });
};

export const useGetBuyer = (
  id: string,
  populate?: string[],
  onSuccess?: () => void,
  onError?: () => void
) => {
  return useQuery<Buyer>(
    ['buyer', id],
    async ({ queryKey }) => {
      const { data } = await api.getBuyer(queryKey[1] as string, populate);
      return data;
    },
    { onSuccess, onError, enabled: !!id }
  );
};

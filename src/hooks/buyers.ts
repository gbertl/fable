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

export const useGetBuyer = ({
  id,
  populate = [],
  limit = [],
  onSuccess,
  onError,
}: {
  id: string;
  populate?: string[];
  limit?: Object[];
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  let qk = ['buyer', id];

  if (populate.length) {
    qk.push(populate.join(''));
  }

  return useQuery<Buyer>(
    qk,
    async ({ queryKey }) => {
      const { data } = await api.getBuyer({
        id: queryKey[1] as string,
        populate,
        limit,
      });
      return data;
    },
    { onSuccess, onError, enabled: !!id }
  );
};

export const useUpdateBuyer = (
  onSuccess?: () => void,
  onError?: () => void
) => {
  return useMutation<
    AxiosResponse<Buyer>,
    AxiosError,
    { id: string; newBuyer: Buyer }
  >(api.updateBuyer, {
    onSuccess,
    onError,
  });
};

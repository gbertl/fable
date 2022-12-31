import { useQuery } from 'react-query';
import { getBuyer } from '../api';
import { Buyer } from '../types';

const useGetBuyer = (
  id: string,
  populate?: string[],
  onSuccess?: () => void,
  onError?: () => void
) => {
  return useQuery<Buyer>(
    ['buyer', id],
    async ({ queryKey }) => {
      const { data } = await getBuyer(queryKey[1] as string, populate);
      return data;
    },
    { onSuccess, onError, enabled: !!id }
  );
};

export default useGetBuyer;

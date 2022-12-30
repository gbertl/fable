import { useQuery } from 'react-query';
import { getBuyer } from '../api';
import { Buyer } from '../types';

const useGetBuyer = (
  email: string,
  populate: string[],
  onSuccess?: () => void,
  onError?: () => void
) => {
  return useQuery<Buyer>(
    ['buyer', email],
    async ({ queryKey }) => {
      const { data } = await getBuyer(queryKey[1] as string, populate);
      return data;
    },
    { onSuccess, onError }
  );
};

export default useGetBuyer;

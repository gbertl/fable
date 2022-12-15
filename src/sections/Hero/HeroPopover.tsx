import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

import axios from '../../axios';
import { Product } from '../../typings';

interface Props {
  productId: number;
}

const HeroPopover = ({ productId }: Props) => {
  const { data: product } = useQuery<Product>(
    ['product', productId],
    async ({ queryKey }) => {
      const { data } = await axios.get(`/products/${queryKey[1]}`);
      return data;
    }
  );

  return (
    <div className="hero__popover flex items-center absolute top-[25%] left-full w-max z-[9999] bg-white before:absolute before:left-0 before:top-1/2 before:-translate-x-full before:-translate-y-1/2 before:w-0 before:h-0 before:border-t-[12px] before:border-t-transparent before:border-b-[12px] before:border-b-transparent before:border-r-[12px] before:border-r-gray2">
      <div className="bg-gray2 p-5">
        <img src={product?.image} alt="" className="w-40" />
      </div>

      <div className="px-6">
        <h1 className="text-base font-normal mb-2">{product?.name}</h1>
        <ul className="text-xs text-gray mb-6">
          <li>
            Collection:{' '}
            <span className="font-medium uppercase">{product?.collection}</span>
          </li>
          <li>
            Article: <span className="font-medium">H0146027</span>
          </li>
        </ul>
        <ul className="flex text-sm gap-4 mb-8">
          <li>
            Size: <span className="font-medium uppercase">{product?.size}</span>
          </li>
          <li className="flex items-center gap-2">
            Color:{' '}
            <div
              className="w-4 h-4 border border-dark"
              style={{
                background: product?.color,
              }}
            ></div>
          </li>
        </ul>
        <div className="flex justify-between text-sm">
          <span>
            Price: <span className="font-medium">₱{product?.price}</span>
          </span>
          <Link
            to={`/products/${product?.id}`}
            className="font-medium text-gray hover:text-dark"
          >
            Show more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroPopover;

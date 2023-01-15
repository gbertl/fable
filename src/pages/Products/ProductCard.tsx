import { Link, generatePath } from 'react-router-dom';
import { Skeleton } from '@mui/material';
import { useMediaQuery } from 'react-responsive';

import { Product } from '../../types';
import { ImgLoaded } from '.';
import { appRoutes } from '../../routes';

interface Props {
  product: Product;
  imgsLoaded: ImgLoaded[];
  setImgsLoaded: React.Dispatch<React.SetStateAction<ImgLoaded[]>>;
}

const ProductCard = ({ product, imgsLoaded, setImgsLoaded }: Props) => {
  const isMobile = useMediaQuery({ query: '(max-width: 576px)' });

  return (
    <div>
      <Link
        to={generatePath(appRoutes.productDetail, {
          id: product._id,
        })}
      >
        {!imgsLoaded.find((il) => il.product === product._id)?.loaded && (
          <Skeleton
            variant="rectangular"
            height={isMobile ? 149 : 427}
            sx={{ marginBottom: '0.75rem' }}
          />
        )}

        <img
          src={product.imageUrl}
          alt=""
          className={`bg-gray2 mb-3 w-full object-contain ${
            !imgsLoaded.find((il) => il.product === product._id)?.loaded
              ? 'h-0'
              : 'h-auto'
          }
            `}
          onLoad={() =>
            setImgsLoaded((prevImgsLoaded) =>
              prevImgsLoaded.map((pil) =>
                pil.product === product._id ? { ...pil, loaded: true } : pil
              )
            )
          }
        />
      </Link>
      <div className="text-center">
        <h5 className="text-xs md:text-lg mb-1 text-gray">{product.name}</h5>
        <span className="text-sm md:text-xl font-medium">₱{product.price}</span>
      </div>
    </div>
  );
};

export default ProductCard;

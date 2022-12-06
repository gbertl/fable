import { HashLink } from 'react-router-hash-link';
import './style.scss';

interface Props {
  className: string;
  productCollection?: string;
  productCategory?: string;
}

const BreadCrumb = ({
  className,
  productCollection,
  productCategory,
}: Props) => {
  return (
    <ul className={`breadcrumb ${className}`}>
      <li>
        <HashLink
          to={`/#${productCollection
            ?.toLowerCase()
            .split(' ')
            .join('-')}-section`}
        >
          {productCollection}
        </HashLink>
      </li>
      <li>&#8212;</li>
      <li>
        <HashLink to={`/#${productCategory?.toLowerCase()}-section`}>
          {productCategory}
        </HashLink>
      </li>
    </ul>
  );
};

export default BreadCrumb;

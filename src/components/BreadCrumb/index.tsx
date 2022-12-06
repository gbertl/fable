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
        <a href="#">{productCollection}</a>
      </li>
      <li>&#8212;</li>
      <li>
        <a href="#">{productCategory}</a>
      </li>
    </ul>
  );
};

export default BreadCrumb;

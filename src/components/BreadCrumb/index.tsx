import './style.scss';

interface Props {
  className: string;
}

const BreadCrumb = ({ className }: Props) => {
  return (
    <ul className={`breadcrumb ${className}`}>
      <li>
        <a href="#">Fable of Colors</a>
      </li>
      <li>&#8212;</li>
      <li>
        <a href="#">Shorts</a>
      </li>
    </ul>
  );
};

export default BreadCrumb;

import './style.scss';

const BreadCrumb = () => {
  return (
    <ul className="breadcrumb">
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

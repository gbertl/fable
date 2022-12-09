import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import './style.scss';

interface Link {
  title: string;
  url: string;
}

interface Props {
  className?: string;
  links: Link[];
}

const BreadCrumb = ({ className, links }: Props) => {
  return (
    <ul className={`breadcrumb ${className ? className : ''}`}>
      {links.map((l, idx) => (
        <React.Fragment key={idx}>
          <li>
            {l.url.includes('#') ? (
              <HashLink to={l.url}>{l.title}</HashLink>
            ) : (
              <Link to={l.url}>{l.title}</Link>
            )}
          </li>
          {idx < links.length - 1 && <li>&#8212;</li>}
        </React.Fragment>
      ))}
    </ul>
  );
};

export default BreadCrumb;

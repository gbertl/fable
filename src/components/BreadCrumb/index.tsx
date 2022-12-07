import React from 'react';
import { HashLink } from 'react-router-hash-link';
import './style.scss';

interface Link {
  title: string;
  url?: string;
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
            <HashLink
              to={
                l.url
                  ? l.url
                  : `/#${l.title?.toLowerCase().split(' ').join('-')}-section`
              }
            >
              {l.title}
            </HashLink>
          </li>
          {idx < links.length - 1 && <li>&#8212;</li>}
        </React.Fragment>
      ))}
    </ul>
  );
};

export default BreadCrumb;

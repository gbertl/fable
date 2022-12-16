import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

interface Link {
  title: string;
  url: string;
}

interface Props {
  className?: string;
  links: Link[];
}

const BreadCrumb = ({ className = '', links }: Props) => {
  return (
    <ul
      className={`flex gap-4 text-xs font-medium mt-3 mb-5 md:mb-3 capitalize ${className}`}
    >
      {links.map((link, idx) => (
        <React.Fragment key={idx}>
          <li>
            {link.url.includes('#') ? (
              <HashLink
                to={link.url}
                scroll={(el) =>
                  setTimeout(
                    () => el.scrollIntoView({ behavior: 'smooth' }),
                    100
                  )
                }
              >
                {link.title}
              </HashLink>
            ) : (
              <Link to={link.url}>{link.title}</Link>
            )}
          </li>
          {idx < links.length - 1 && <li>&#8212;</li>}
        </React.Fragment>
      ))}
    </ul>
  );
};

export default BreadCrumb;

import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import Favicon from '../media/favicon.png';

const Seo = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            description
            siteUrl
            title
          }
        }
      }
    `
  );

  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{site.siteMetadata.title}</title>
      <meta name="description" content={site.siteMetadata.description} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0"
      />
      <link rel="canonical" href={site.siteMetadata.siteUrl} />
      <link rel="icon" type="image/png" href={Favicon} sizes="32x32" />
    </Helmet>
  );
};

export default Seo;

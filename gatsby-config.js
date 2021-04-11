module.exports = {
  siteMetadata: {
    title: 'wojciechlasak',
    siteUrl: 'https://wojciechlasak.github.io/',
    description: `Wojciech Lasak web developer`,
  },
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/media/',
      },
      __key: 'images',
    },
  ],
};

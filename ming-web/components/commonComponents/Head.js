import React from 'react';
import Head from 'next/head';

export default () => {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <Head>

      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta
        name="viewport"
        content="
          width=device-width,
          initial-scale=1.0,
          maximum-scale=1.0,
          user-scalable=no,
          shrink-to-fit=no
        "
      />

      <title>Ming</title>
      <meta name="author" content="Ming" />

      <link rel="stylesheet" href="/static/dist/css/bootstrap.min.css" />
      <link rel="stylesheet" href="/static/dist/css/font-awesome.min.css" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans|PT+Mono" />
      <link rel="stylesheet" href="/static/css/index.css" />

    </Head>
  );
};

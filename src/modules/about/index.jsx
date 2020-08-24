import React from 'react';

const AbountBundle = React.lazy(() => import(
  /* webpackChunkName: 'about' */
  /* webpackPrefetch: true */
  './about'
));

export default () => (
  <React.Suspense fallback={ <div>Загрузка...</div> }>
    <AbountBundle />
  </React.Suspense>
);

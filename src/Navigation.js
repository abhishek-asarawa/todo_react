import React from 'react';
import { Route, Routes } from 'react-router-dom';
import map from 'lodash/map';

import routes from './routes';
import NotFound from './views/NotFound';

const Navigation = () => {
  return (
    <Routes>
      {map(routes, (route, index) => {
        const { component: Component, ...rest } = route;
        return <Route {...rest} key={index} element={<Component />} />;
      })}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Navigation;

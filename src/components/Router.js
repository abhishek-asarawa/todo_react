import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const Router = (props) => {
  const { component: Component, ...rest } = props;

  return (
    <Route {...rest} render={(matchProps) => <Component {...matchProps} />} />
  );
};

Router.propTypes = {
  component: PropTypes.any.isRequired
};

export default Router;

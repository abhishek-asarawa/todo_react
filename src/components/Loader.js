import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Dimmer, Loader } from 'semantic-ui-react';

const LoaderCompo = ({ id, text, size = 'small' }) => {
  const loaders = useSelector((state) => state.loaderReducer);

  return (
    <Dimmer active={loaders[id]}>
      <Loader size={size} indeterminate>
        {text ? text : 'Loading'}
      </Loader>
    </Dimmer>
  );
};

LoaderCompo.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,
  size: PropTypes.string
};

export default LoaderCompo;

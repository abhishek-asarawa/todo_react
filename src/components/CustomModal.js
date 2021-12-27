import React from 'react';
import PropTypes from 'prop-types';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

import Loader from './Loader';

function CustomModal({
  open,
  handleClose,
  handleSubmit,
  icon,
  successButtonText,
  successButtonDisabled,
  cancelButtonText,
  title,
  children,
  loaderId
}) {
  return (
    <Modal closeIcon open={open} onClose={handleClose}>
      {loaderId && <Loader id={loaderId} size="medium" />}
      <Header icon={icon ? icon : 'archive'} content={title} />
      <Modal.Content>{children}</Modal.Content>
      <Modal.Actions>
        <Button color="red" onClick={handleClose}>
          <Icon name="remove" /> {cancelButtonText ? cancelButtonText : 'No'}
        </Button>
        <Button
          color="green"
          disabled={successButtonDisabled}
          onClick={handleSubmit}
        >
          <Icon name="checkmark" />{' '}
          {successButtonText ? successButtonText : 'Yes'}
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

CustomModal.propTypes = {
  cancelButtonText: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  icon: PropTypes.string,
  open: PropTypes.bool.isRequired,
  successButtonText: PropTypes.string,
  successButtonDisabled: PropTypes.bool,
  title: PropTypes.string.isRequired,
  loaderId: PropTypes.string
};

export default CustomModal;

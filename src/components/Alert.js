import React from 'react';
import PropTypes from 'prop-types';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

function Alert({ open, handleClose, title, description, handleSubmit, icon }) {
  return (
    <Modal basic onClose={handleClose} open={open} size="small">
      <Header icon>
        <Icon name={icon ? icon : 'warning sign'} />
        {title}
      </Header>
      <Modal.Content>
        <p>{description}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button basic color="red" inverted onClick={handleClose}>
          <Icon name="remove" /> No
        </Button>
        <Button color="green" inverted onClick={handleSubmit}>
          <Icon name="checkmark" /> Yes
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

Alert.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  icon: PropTypes.string
};

export default Alert;

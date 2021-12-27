import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Form } from 'semantic-ui-react';
import { CustomModal } from '../../../components';

const TaskForm = ({
  task,
  open,
  handleClose,
  handleSubmitData,
  isUpdate = false
}) => {
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [formError, setFormError] = useState({
    title: false,
    description: false
  });
  const [submitDisable, setSubmitDisable] = useState(false);

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const checkError = (name, value) => {
    if (name === 'title') return value.length < 5 || value.length > 50;
    if (name === 'description') return value.length < 10 || value.length > 120;
    return false;
  };

  const handleFormError = (e) => {
    const { name, value } = e.target;
    setFormError((prev) => ({
      ...prev,
      [name]: checkError(name, value)
    }));
  };

  useEffect(() => {
    let haveError = Object.values(formError).some((value) => value);
    if (!haveError) {
      for (let key in formData) {
        if (checkError(key, formData[key])) {
          haveError = true;
          break;
        }
      }
    }
    if (haveError) setSubmitDisable(true);
    else setSubmitDisable(false);
  }, [formData, formError]);

  useEffect(() => {
    if (!open) {
      setFormData({ title: '', description: '' });
      setFormError({
        title: false,
        description: false
      });
    }
  }, [open]);

  useEffect(() => {
    let title, description;
    if (!isEmpty(task)) {
      if (task.title) title = task.title;
      if (task.description) description = task.description;
      setFormData((prev) => ({ ...prev, title, description }));
    }
  }, [task]);

  return (
    <CustomModal
      handleClose={handleClose}
      handleSubmit={() => handleSubmitData(formData)}
      icon="flipboard"
      open={open}
      title={isUpdate ? 'Update Task' : 'Create Task'}
      cancelButtonText="Cancel"
      successButtonText={isUpdate ? 'Update' : 'Create'}
      successButtonDisabled={submitDisable}
    >
      <Form>
        <Form.Input
          error={
            formError.title
              ? {
                  content: 'Title must be between then 5-50 char long',
                  pointing: 'above'
                }
              : false
          }
          fluid
          label="Title"
          placeholder="Task title"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleFormData}
          onBlur={handleFormError}
        />
        <Form.Input
          error={
            formError.description
              ? {
                  content: 'Description must be between 10-120 char long.',
                  pointing: 'above'
                }
              : false
          }
          fluid
          label="Description"
          placeholder="Task description"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleFormData}
          onBlur={handleFormError}
        />
      </Form>
    </CustomModal>
  );
};

TaskForm.propTypes = {
  task: PropTypes.object,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmitData: PropTypes.func.isRequired,
  isUpdate: PropTypes.bool
};

export default TaskForm;

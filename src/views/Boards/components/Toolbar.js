import axios from 'axios';
import isObject from 'lodash/isObject';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Grid, Header, Button, Form } from 'semantic-ui-react';
import { CustomModal } from '../../../components';
import { addBoard } from '../../../redux/actions/board';
import { openSnack } from '../../../redux/actions/snack';
import { startLoading, stopLoading } from '../../../redux/actions/loader';

const endpoint = `${process.env.REACT_APP_URL}/board`;

const Toolbar = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [formError, setFormError] = useState({
    title: false,
    description: false
  });
  const [submitDisable, setSubmitDisable] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  const createBoard = async () => {
    try {
      // set loader
      dispatch(startLoading('createBoard'));

      const data = { ...formData };
      const response = await axios.post(endpoint, data);

      if (response.status === 200) {
        const { data } = response.data;
        if (isObject(data))
          dispatch(
            addBoard({
              ...data,
              tasksAgg: { total: 0, pending: 0, completed: 0 }
            })
          );
      }
    } catch (err) {
      console.error(err);
      dispatch(openSnack('Facing error in creating board'));
    }
    handleClose();
    dispatch(stopLoading('createBoard'));
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

  return (
    <Grid columns={2}>
      <Grid.Row style={{ margin: '20px 10px' }}>
        <Grid.Column floated="left" style={{ paddingLeft: '2%' }}>
          <Header as="h1">BOARDS</Header>
        </Grid.Column>
        <Grid.Column floated="right" width={2}>
          <Button
            content="New Board"
            icon="add"
            labelPosition="left"
            onClick={handleOpen}
          />
        </Grid.Column>
      </Grid.Row>
      <CustomModal
        handleClose={handleClose}
        handleSubmit={createBoard}
        icon="flipboard"
        open={open}
        title="Create Board"
        cancelButtonText="Cancel"
        successButtonText="Create"
        successButtonDisabled={submitDisable}
        loaderId="createBoard"
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
            placeholder="Board title"
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
            placeholder="Board description"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleFormData}
            onBlur={handleFormError}
          />
        </Form>
      </CustomModal>
    </Grid>
  );
};

export default Toolbar;

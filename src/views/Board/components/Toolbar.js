import axios from 'axios';
import { has } from 'lodash';
import isObject from 'lodash/isObject';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Grid, Header, Button, Form, Icon } from 'semantic-ui-react';
import { CustomModal } from '../../../components';
import { openSnack } from '../../../redux/actions/snack';
import { addTask } from '../../../redux/actions/task';

const endpoint = `${process.env.REACT_APP_URL}/task`;

const Toolbar = ({ board }) => {
  const navigate = useNavigate();
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

  const createTask = async () => {
    try {
      const data = { ...formData, board: board.id };
      const response = await axios.post(endpoint, data);

      if (response.status === 200) {
        const { data } = response.data;
        if (isObject(data)) dispatch(addTask({ ...data }));
      }
    } catch (err) {
      console.error(err);
      dispatch(openSnack('Facing error in creating board'));
    }
    handleClose();
  };

  const goBack = () => {
    navigate('/', { replace: true });
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

  return (
    <Grid columns={3}>
      <Grid.Row style={{ margin: '20px 10px' }}>
        <Grid.Column floated="left" width={2}>
          <Button animated onClick={goBack}>
            <Button.Content hidden>Back</Button.Content>
            <Button.Content visible>
              <Icon name="arrow left" />
            </Button.Content>
          </Button>
        </Grid.Column>
        <Grid.Column floated="left">
          <Header as="h1" size="huge" textAlign="center">
            {has(board, 'title') ? board.title : 'Board'}
            {has(board, 'description') && (
              <Header.Subheader>{board.description}</Header.Subheader>
            )}
          </Header>
        </Grid.Column>
        <Grid.Column floated="right" width={2}>
          <Button
            content="New Task"
            icon="add"
            labelPosition="left"
            onClick={handleOpen}
          />
        </Grid.Column>
      </Grid.Row>
      <CustomModal
        handleClose={handleClose}
        handleSubmit={createTask}
        icon="flipboard"
        open={open}
        title="Create Task"
        cancelButtonText="Cancel"
        successButtonText="Create"
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
    </Grid>
  );
};

export default Toolbar;

import axios from 'axios';
import { has } from 'lodash';
import isObject from 'lodash/isObject';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Grid, Header, Button, Icon } from 'semantic-ui-react';
import { openSnack } from '../../../redux/actions/snack';
import { addTask } from '../../../redux/actions/task';
import TaskForm from './TaskForm';

const endpoint = `${process.env.REACT_APP_URL}/task`;

const Toolbar = ({ board }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const createTask = async (formData = {}) => {
    try {
      const data = { ...formData, board: board.id };
      const response = await axios.post(endpoint, data);

      if (response.status === 200) {
        const { data } = response.data;
        if (isObject(data)) dispatch(addTask({ ...data }));
      }
    } catch (err) {
      console.error(err);
      dispatch(openSnack('Facing error in creating task'));
    }
    handleClose();
  };

  const goBack = () => {
    navigate('/', { replace: true });
  };

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
      <TaskForm
        handleClose={handleClose}
        open={open}
        task={{}}
        handleSubmitData={createTask}
      />
    </Grid>
  );
};

export default Toolbar;

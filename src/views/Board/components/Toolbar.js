import axios from 'axios';
import { has } from 'lodash';
import isObject from 'lodash/isObject';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Grid, Header, Button, Icon, Dropdown } from 'semantic-ui-react';
import { AlertModal } from '../../../components';
import { deleteBoard, updateBoard } from '../../../redux/actions/board';
import { openSnack } from '../../../redux/actions/snack';
import { addTask } from '../../../redux/actions/task';
import BoardForm from './BoardForm';
import TaskForm from './TaskForm';

const endpoint = `${process.env.REACT_APP_URL}`;

const alertTitle = 'Delete Board ?';
const alertDesc =
  'Deleting a board will delete all its tasks also. You can not undo it. Do you really want to delete board ?';

const Toolbar = ({ board }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [boardForm, setBoardForm] = useState(false);
  const [alertModal, setAlertModal] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOpenBoardForm = () => setBoardForm(true);
  const handleCloseBoardForm = () => setBoardForm(false);

  const handleOpenAlert = () => setAlertModal(true);
  const handleCloseAlert = () => setAlertModal(false);

  const createTask = async (formData = {}) => {
    try {
      const data = { ...formData, board: board.id };
      const response = await axios.post(`${endpoint}/task`, data);

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

  const handleUpdateBoard = async (boardData = {}) => {
    try {
      const data = { ...boardData, board: board.id };
      const response = await axios.put(`${endpoint}/board/${board.id}`, data);

      if (response.status === 200) {
        const { data } = response.data;
        if (data && data[0]) {
          dispatch(updateBoard(data[0]));
          dispatch(openSnack('Board updated'));
        }
      }
      handleCloseBoardForm();
    } catch (err) {
      console.error(err);
      dispatch(openSnack('Facing error in updating board'));
    }
  };

  const handleDeleteBoard = async (boardData = {}) => {
    try {
      const response = await axios.delete(`${endpoint}/board/${board.id}`);

      if (response.status === 200) {
        handleCloseAlert();
        goBack();
        dispatch(deleteBoard(board));
        dispatch(openSnack('Board deleted'));
      }
    } catch (err) {
      console.error(err);
      dispatch(openSnack('Facing error in deleting board'));
    }
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
        <Grid.Column width={2}>
          <Dropdown
            text="More"
            icon="setting"
            floating
            labeled
            button
            className="icon"
          >
            <Dropdown.Menu>
              <Dropdown.Item onClick={handleOpenBoardForm}>
                Edit Board
              </Dropdown.Item>
              <Dropdown.Item onClick={handleOpenAlert}>
                Delete Board
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Grid.Column>
      </Grid.Row>
      <TaskForm
        handleClose={handleClose}
        open={open}
        task={{}}
        handleSubmitData={createTask}
      />
      <BoardForm
        handleClose={handleCloseBoardForm}
        open={boardForm}
        board={board}
        handleSubmitData={handleUpdateBoard}
      />
      <AlertModal
        open={alertModal}
        handleClose={handleCloseAlert}
        title={alertTitle}
        description={alertDesc}
        handleSubmit={() => handleDeleteBoard(board)}
      />
    </Grid>
  );
};

export default Toolbar;

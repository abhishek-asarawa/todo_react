import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { findIndex, has, isEmpty, map, reduce } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { openSnack } from '../../redux/actions/snack';
import {
  deleteTask,
  removeAllTask,
  setTasks,
  updateTask
} from '../../redux/actions/task';
import Toolbar from './components/Toolbar';
import {
  Card,
  Divider,
  Grid,
  Header,
  List,
  Segment,
  Checkbox,
  Icon,
  Button
} from 'semantic-ui-react';
import timeConvertor from '../../helpers/timeConvertor';
import TaskForm from './components/TaskForm';
import { startLoading, stopLoading } from '../../redux/actions/loader';
import { Loader } from '../../components';

const endpoint = `${process.env.REACT_APP_URL}`;

const sections = [
  { title: 'Pending Tasks', id: 'pending' },
  { title: 'Completed Tasks', id: 'completed' }
];

const Board = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boardsReducer);
  const tasks = useSelector((state) => state.tasksReducer);

  const [selectedBoard, setSelectedBoard] = useState({});
  const [notFound, setNotFound] = useState(false);
  const [separatedTasks, setSeparatedTasks] = useState({
    completed: [],
    pending: []
  });
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState({});

  const handleOpen = (task) => {
    setSelectedTask(task);
    setOpen(true);
  };
  const handleClose = () => {
    setSelectedTask({});
    setOpen(false);
  };

  const selectedId = params.id;

  const fetchBoardTasks = useCallback(async () => {
    try {
      // start loader
      dispatch(startLoading('boardUI'));

      const response = await axios.get(`${endpoint}/board/${selectedId}`);

      if (response.status === 200) {
        const { data } = response.data;
        if (has(data, 'tasks')) dispatch(setTasks(data.tasks));
      }
    } catch (err) {
      console.error(err);
      dispatch(openSnack('Facing error in fetching board.'));
    }

    // stop loader
    dispatch(stopLoading('boardUI'));
    // eslint-disable-next-line
  }, [selectedId]);

  const toggleTaskComplete = async (task) => {
    try {
      // start loader
      dispatch(startLoading('boardUI'));
      const { isComplete, id } = task;
      const data = { isComplete: !isComplete };
      const response = await axios.put(`${endpoint}/task/${id}`, data);

      if (response.status === 200) {
        const { data } = response.data;
        if (data && data[0]) dispatch(updateTask(data[0]));
      }
    } catch (err) {
      console.error(err);
      dispatch(openSnack('Facing error in updating task.'));
    }
    // stop loader
    dispatch(stopLoading('boardUI'));
  };

  const updateTaskData = async (task) => {
    try {
      // start loader
      dispatch(startLoading('updateTask'));

      const { title, description } = task;
      const { id } = selectedTask;
      const data = { title, description };
      const response = await axios.put(`${endpoint}/task/${id}`, data);

      if (response.status === 200) {
        const { data } = response.data;
        if (data && data[0]) dispatch(updateTask(data[0]));
      }
      handleClose();
    } catch (err) {
      console.error(err);
      dispatch(openSnack('Facing error in updating task.'));
    }
    // stop loader
    dispatch(stopLoading('updateTask'));
  };

  const handleDeleteTask = async (task) => {
    try {
      // start loader
      dispatch(startLoading('boardUI'));
      const { id } = task;
      if (!id) return dispatch(openSnack('Can not perform delete action'));

      const response = await axios.delete(`${endpoint}/task/${id}`);

      if (response.status === 200) {
        dispatch(deleteTask({ ...task }));
        dispatch(openSnack('Task deleted'));
      }
      handleClose();
    } catch (err) {
      console.error(err);
      dispatch(openSnack('Facing error in updating task.'));
    }
    // stop loader
    dispatch(stopLoading('boardUI'));
  };

  useEffect(() => {
    const index = findIndex(
      boards,
      (board) => board.id.toString() === selectedId.toString()
    );
    if (index === -1) setNotFound(true);
    else {
      setNotFound(false);
      setSelectedBoard({ ...boards[index] });
    }
    // eslint-disable-next-line
  }, [selectedId, boards]);

  useEffect(() => {
    fetchBoardTasks();
  }, [fetchBoardTasks]);

  useEffect(() => {
    const { completed, pending } = reduce(
      tasks,
      (prev, task) => {
        if (task.isComplete)
          return { ...prev, completed: [...prev.completed, { ...task }] };
        return { ...prev, pending: [...prev.pending, { ...task }] };
      },
      { completed: [], pending: [] }
    );
    setSeparatedTasks({ completed, pending });
  }, [tasks]);

  useEffect(() => {
    return () => {
      dispatch(removeAllTask());
    };
    // eslint-disable-next-line
  }, []);

  if (notFound && !isEmpty(boards))
    return (
      <div>
        <h1>{`No Board with id ${selectedId} found`}</h1>
      </div>
    );

  return (
    <div>
      <Loader id="boardUI" size="massive" />
      <Toolbar board={selectedBoard} />
      <Segment padded style={{ minHeight: '650px' }}>
        <Grid columns={2} relaxed="very">
          {sections.map((section) => (
            <Grid.Column key={section.id}>
              <Header as="h3" textAlign="center">
                {section.title}
              </Header>
              <List animated verticalAlign="middle">
                {map(separatedTasks[section.id], (task) => {
                  return (
                    <List.Item key={task.id}>
                      <List.Content>
                        <Card style={{ minWidth: '90%' }}>
                          <Card.Content>
                            <Button
                              icon
                              floated="right"
                              title="Delete"
                              onClick={() => handleDeleteTask(task)}
                            >
                              <Icon color="red" name="delete" />
                            </Button>
                            <Button
                              icon
                              floated="right"
                              title="Update"
                              onClick={() => handleOpen(task)}
                            >
                              <Icon color="blue" name="pencil" />
                            </Button>
                            <Card.Header>{task.title}</Card.Header>
                            <Card.Meta>{`Last change ${timeConvertor(
                              task.updatedAt
                            )}`}</Card.Meta>
                            <Card.Description>
                              {task.description}
                            </Card.Description>
                          </Card.Content>
                          <Card.Content>
                            <Checkbox
                              label="Completed"
                              checked={task.isComplete}
                              onChange={() => toggleTaskComplete({ ...task })}
                            />
                          </Card.Content>
                        </Card>
                      </List.Content>
                    </List.Item>
                  );
                })}
              </List>
            </Grid.Column>
          ))}
        </Grid>
        <Divider vertical fitted />
      </Segment>
      <TaskForm
        open={open}
        handleClose={handleClose}
        task={selectedTask}
        handleSubmitData={updateTaskData}
        isUpdate
      />
    </div>
  );
};

export default Board;

import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { findIndex, has, isEmpty, map, reduce } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { openSnack } from '../../redux/actions/snack';
import { removeAllTask, setTasks, updateTask } from '../../redux/actions/task';
import Toolbar from './components/Toolbar';
import {
  Card,
  Divider,
  Grid,
  Header,
  List,
  Segment,
  Checkbox
} from 'semantic-ui-react';

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

  const selectedId = params.id;

  const fetchBoardTasks = useCallback(async () => {
    try {
      const response = await axios.get(`${endpoint}/board/${selectedId}`);

      if (response.status === 200) {
        const { data } = response.data;
        if (has(data, 'tasks')) dispatch(setTasks(data.tasks));
      }
    } catch (err) {
      console.error(err);
      dispatch(openSnack('Facing error in fetching board.'));
    }
    // eslint-disable-next-line
  }, [selectedId]);

  const toggleTaskComplete = async (task) => {
    try {
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
    // eslint-disable-next-line
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
                            <Card.Header>{task.title}</Card.Header>
                            {/* <Card.Meta>Friends of Elliot</Card.Meta> */}
                            <Card.Description>
                              {task.description}
                            </Card.Description>
                          </Card.Content>
                          <Card.Content floated="right">
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
    </div>
  );
};

export default Board;

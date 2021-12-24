import React from 'react';
import { useDispatch } from 'react-redux';
import { Grid, Header, Button } from 'semantic-ui-react';
import { openSnack } from '../../../redux/actions/snack';

const Toolbar = () => {
  const dispatch = useDispatch();
  const sendMsg = () => {
    dispatch(openSnack('Testing snack'));
  };

  return (
    <Grid columns={2}>
      <Grid.Row style={{ margin: '20px 10px' }}>
        <Grid.Column floated="left">
          <Header as="h1">Boards</Header>
        </Grid.Column>
        <Grid.Column floated="right" width={2}>
          <Button
            content="New Board"
            icon="add"
            labelPosition="left"
            onClick={sendMsg}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Toolbar;

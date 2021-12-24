import React from 'react';
import { Grid, Header, Button } from 'semantic-ui-react';

const Toolbar = () => {
  return (
    <Grid columns={2}>
      <Grid.Row style={{ margin: '20px 10px' }}>
        <Grid.Column floated="left">
          <Header as="h1">Boards</Header>
        </Grid.Column>
        <Grid.Column floated="right" width={2}>
          <Button content="New Board" icon="add" labelPosition="left" />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Toolbar;

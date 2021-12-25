import axios from 'axios';
import { has } from 'lodash';
import isObject from 'lodash/isObject';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Grid, Header, Button, Form, Icon } from 'semantic-ui-react';
import { CustomModal } from '../../../components';
import { addBoard } from '../../../redux/actions/board';
import { openSnack } from '../../../redux/actions/snack';

const endpoint = `${process.env.REACT_APP_URL}/board`;

const Toolbar = ({ board }) => {
  const navigate = useNavigate();

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
          <Button content="New Task" icon="add" labelPosition="left" />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Toolbar;

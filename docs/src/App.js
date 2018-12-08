/* eslint-disable */
import React, { Component } from 'react';
import styled from 'styled-components';
import MdAdd from 'react-icons/lib/md/add';
import MdClose from 'react-icons/lib/md/close';
import {
  FloatingMenu,
  MainButton,
  ChildButton,
} from 'react-floating-button-menu';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    height: '100vh',
  },
  paper: {
    width: '100%',
    maxWidth: 960,
    minHeight: 300,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class App extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }
  state = {
    direction: 'up',
    isOpen: false,
  };

  handleChange = event => {
    this.setState({ direction: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { direction, isOpen } = this.state;
    return (
      <div className={classes.root}>
        <h2>Material Floating Button Menu Demo</h2>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-simple">Age</InputLabel>
          <Select
            value={this.state.direction}
            onChange={this.handleChange}
            inputProps={{
              name: 'direction',
            }}
          >
            <MenuItem value={'up'}>Up</MenuItem>
            <MenuItem value={'down'}>Down</MenuItem>
            <MenuItem value={'left'}>Left</MenuItem>
            <MenuItem value={'right'}>Right</MenuItem>
          </Select>
        </FormControl>
        <Paper className={classes.paper} elevation={4}>
          <FloatingMenu
            slideSpeed={500}
            direction={direction}
            isOpen={isOpen}
          >
            <MainButton
              iconResting={MdAdd}
              iconActive={MdClose}
              iconColor="white"
              backgroundColor="black"
              onClick={() => this.setState({ isOpen: !this.state.isOpen })}
              size={56}
            />
            <ChildButton
              iconButton={MdAdd}
              iconColor="black"
              order={1}
              backgroundColor="white"
              size={40}
              margin={16}
              onClick={() => console.log('First button clicked')}
            />
            <ChildButton
              iconButton={MdAdd}
              iconColor="black"
              order={2}
              backgroundColor="white"
              size={40}
              margin={8}
            />
          </FloatingMenu>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(App);

import React from 'react';
import { AppBar, Toolbar, Button, IconButton, Grid, Paper, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import { withStyles } from '@material-ui/core/styles';

import alasql from 'alasql';

//import './App.css';
import ErrorBoundary from './ErrorBoundary';
import SampleData from './SampleData';
import DataStructure from './dataStructure.js';
import SQLTasks from './SQLTasks';
import SQLInput from './SQLInput';
import SendAnswers from './SendAnswers';

import { maxVariants } from './tasks';

const styles = {
  app: {
    padding: '10px',
  },
  appBar: {
    position: 'relative',
  },
  appToolBar: {
    background: "#4B627C",
  },
  appTitleText: {
    fontFamily: "HeliosCondBold",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "24px",
    lineHeight: "27px",
    letterSpacing: "0.02em",
    textTransform: "uppercase",
    color: "#FFFFFF"
  }
}

class SQLApp extends React.Component {
  constructor (props) {
    super(props);

    //Load or generate new variant
    //console.log('Determin variant');
    let variant = localStorage.getItem('variant');
    if (!variant) {
      variant = Math.floor(Math.random() * maxVariants);
      localStorage.setItem('variant', variant);
    }

    //Load initial data
    //console.log('Load initial data');
    Object.keys(DataStructure).forEach((key) => {
      try {
        alasql(DataStructure[key].SQL);
        alasql(DataStructure[key].SampleData);
        alasql.tables[key].desc = DataStructure[key].desc;
      } catch(e) {}
    });

    //Set initial state
    //console.log('Set initial state');
    this.state = {
      tables: alasql.tables,
      currentVariant: variant
    };

    this.changeTables = this.changeTables.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
    this.handleSendAnswers = this.handleSendAnswers.bind(this);
  }
  
  changeTables(tables) {
    this.setState ({
      tables: tables
    });
  }

  handleMenu() {

  }

  handleSendAnswers() {

  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.app} >
        <AppBar className={classes.appBar}>
          <Toolbar className={classes.appToolBar}>
            <IconButton edge="start" color="inherit" onClick={this.handleMenu} aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography className={classes.appTitleText}>
              Тест для стажеров по SQL
            </Typography>
            <SendAnswers />
          </Toolbar>
        </AppBar>
        <Grid 
          container 
          spacing={1}
          direction="row"
        >
          <Grid className="Tasks" item xs={6}>
            <SQLTasks currentVariant={this.state.currentVariant}/>
            <ErrorBoundary>
              <SQLInput alasql={alasql} changeTables={this.changeTables}/>
            </ErrorBoundary>
          </Grid>
          <Grid className="SampleData" item xs={6}>
            <ErrorBoundary>
              <SampleData tables={alasql.tables} />
            </ErrorBoundary>
          </Grid>
        </Grid>
      </div>
    );
  }
}

//export default SQLApp;
export default withStyles(styles)(SQLApp);

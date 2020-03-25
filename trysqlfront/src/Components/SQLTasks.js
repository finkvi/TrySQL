import React from 'react';
//import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Tooltip from '@material-ui/core/Tooltip';

import tasks from './tasks';

import { withStyles } from '@material-ui/core/styles';

const styles = {
  tasks: {
    fontSize: '10px',
    fontWeight: 'bold',
  },
  variants: {
    fontSize: '10px',
  },
  paper: {
      padding: '5px',
  },
  radio: {
      fontSize: '0.5rem',
  },

};

class TasksRadioButtons extends React.Component {
    constructor (props) {
        super(props);
        this.handleChangeTask = this.handleChangeTask.bind(this);
        this.handleChangeVariant = this.handleChangeVariant.bind(this);
    }
    
    handleChangeTask(e) {
      return this.props.setCurrentTask(e);
    }
    
    handleChangeVariant(e) {
      return this.props.setCurrentVariant(e);
    }
    
    render () {
        return (
          <Grid container 
            direction="row"
            justify="flex-start"
            spacing={1}
          >
            <Grid item xs={9}>
              <Paper className={this.props.classes.paper}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Задания</FormLabel>
                      <RadioGroup aria-label="tasks" name="tasks" value={this.props.currentTask} onChange={this.handleChangeTask} row>
                          {tasks.tasks.map((t, index) => {
                              return (
                                 <FormControlLabel labelPlacement="end" key={index} value={index} 
                                    control={
                                      <Tooltip key={index} title={t.task + '. +' + t.score + ' за решение'} placement="top-start">
                                        <Radio size="small" />
                                      </Tooltip>
                                    } label={'#' + (index+1)} />
                              );
                          })}
                      </RadioGroup>
                  <FormHelperText>{tasks.desc}</FormHelperText>
                </FormControl>
              </Paper>
            </Grid>
            <Grid item xs={3}>
              <Paper className={this.props.classes.paper}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Вариант</FormLabel>
                      <RadioGroup aria-label="variants" name="variants" value={this.props.currentVariant} onChange={this.handleChangeVariant} row>
                          {tasks.tasks[this.props.currentTask].variants.map((v, index) => {
                              return (<FormControlLabel labelPlacement="end" key={index} value={index} 
                                control={<Radio size="small" />} label={'#' +(index + 1)} />);
                          })}
                      </RadioGroup>
                </FormControl>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={this.props.classes.paper}>
                <Typography>
                  {this.props.currentVariant !== '' 
                    ? tasks.tasks[this.props.currentTask].variants[this.props.currentVariant]
                    : 'Выберите вариант задания'
                  }
                </Typography>
              </Paper>
            </Grid>
          </Grid>
      );
    }
}

export default  withStyles(styles)(TasksRadioButtons);
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

import { sqltasks } from './tasks';

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

        this.state = {
          currentTask: 0
        }

        this.handleChangeTask = this.handleChangeTask.bind(this);
    }
    
    handleChangeTask(e) {
      this.setState({
        currentTask: parseInt(e.target.value, 10)
      });
    }
    
    render () {
        return (
          <Grid container 
            direction="row"
            justify="flex-start"
            spacing={1}
          >
            <Grid item xs={12}>
              <Paper className={this.props.classes.paper}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Задания</FormLabel>
                      <RadioGroup aria-label="tasks" name="tasks" value={this.state.currentTask} onChange={this.handleChangeTask} row>
                          {sqltasks.tasks.map((t, index) => {
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
                  <FormHelperText>{sqltasks.desc}</FormHelperText>
                </FormControl>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={this.props.classes.paper}>
                <Typography>
                  {this.props.currentVariant !== '' 
                    ? sqltasks.tasks[this.state.currentTask].variants[this.props.currentVariant]
                    : 'Не указан вариант задания'
                  }
                </Typography>
              </Paper>
            </Grid>
          </Grid>
      );
    }
}

export default  withStyles(styles)(TasksRadioButtons);
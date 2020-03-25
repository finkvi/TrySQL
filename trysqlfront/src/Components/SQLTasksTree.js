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

/*
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
*/


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
  tree: {
    height: 216,
    flexGrow: 1,
    maxWidth: 400,
  },
};

class TasksRadioButtons extends React.Component {
    constructor (props) {
        super(props);
        this.handleChangeTask = this.handleChangeTask.bind(this);
        this.handleChangeVariant = this.handleChangeVariant.bind(this);
        this.handleChangeNode = this.handleChangeNode.bind(this);
        this.handleTreeItemClick = this.handleTreeItemClick.bind(this);
        
        this.state = {
          expanded: []
        };
        
    }
    
    handleChangeTask(e) {
      return this.props.setCurrentTask(e);
    }
    
    handleChangeVariant(e) {
      return this.props.setCurrentVariant(e);
    }
    
    handleChangeNode(event, nodes) {
      console.log(nodes);
      this.setState({
        expanded: nodes
      });
    }
    
    handleTreeItemClick(event) {
      console.log(event);
    }
    
    render () {
        return (
          <div>
            <div>
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
            </div>
            

          </div>
          
      );
    }
}

/*
            <div>
              <Paper className={this.props.classes.paper}>
                <TreeView
                  className={this.props.classes.tree}
                  defaultCollapseIcon={<ExpandMoreIcon />}
                  defaultExpandIcon={<ChevronRightIcon />}
                  expanded={this.state.expanded}
                  onNodeToggle={this.handleChangeNode}
                  onValueChange={this.handleTreeItemClick}
                >
                  <TreeItem nodeId="1" label="Applications">
                    <TreeItem nodeId="2" label="Calendar" />
                    <TreeItem nodeId="3" label="Chrome" />
                    <TreeItem nodeId="4" label="Webstorm" />
                  </TreeItem>
                  <TreeItem nodeId="5" label="Documents">
                    <TreeItem nodeId="6" label="Material-UI">
                      <TreeItem nodeId="7" label="src">
                        <TreeItem nodeId="8" label="index.js" />
                        <TreeItem nodeId="9" label="tree-view.js" />
                      </TreeItem>
                    </TreeItem>
                  </TreeItem>
                </TreeView>
              </Paper>
            </div>

*/

export default  withStyles(styles)(TasksRadioButtons);
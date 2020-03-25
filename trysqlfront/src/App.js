import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import alasql from 'alasql';

//import './App.css';
import ErrorBoundary from './Components/ErrorBoundary';
import Ala from './Components/Ala';
import DataStructure from './Components/dataStructure.js';
import SQLTasks from './Components/SQLTasksTree';
import SQLInput from './Components/SQLInput';

class App extends React.Component {
  
  constructor (props) {
    super(props);
    //Load initiaal data
    Object.keys(DataStructure).forEach((key) => {
        alasql(DataStructure[key].SQL);
        alasql(DataStructure[key].SampleData);
        alasql.tables[key].desc = DataStructure[key].desc;
    });
    
    this.changeTables = this.changeTables.bind(this);
    this.setCurrentTask = this.setCurrentTask.bind(this);
    this.setCurrentVariant = this.setCurrentVariant.bind(this);
    this.saveCurrentSQL = this.saveCurrentSQL.bind(this);
    
    this.state = {
      tables: alasql.tables,
      currentTask: 0,
      currentVariant: 0,
      currentSQL: `SELECT * FROM STAFF
WHERE sex = "F"`,
      //savedSQL: [...Array(5)].map(x=>Array(5).fill(''))
      savedSQL:[]
    };    
  }
  
  saveCurrentSQL() {
    let s = this.state.savedSQL;
    s[this.state.currentTask] = this.state.savedSQL[this.state.currentTask] || [];
    s[this.state.currentTask][this.state.currentVariant] = this.state.currentSQL;
    this.setState ({
      savedSQL: s
    });
  }
  
  changeTables(tables) {
    this.setState ({
      tables: tables
    });
  }
  
  setCurrentTask(e) {
      this.setState({
          currentTask: parseInt(e.target.value, 10)
      });
  }
  
  setCurrentVariant(e) {
      this.setState({
          currentVariant: parseInt(e.target.value, 10)
      });
  }

  render() {
    return (
      <div className="App" style={{ padding: 10 }}>
        <Grid 
          container 
          spacing={1}
          direction="row"
        >
          <Grid className="AppHeader" item xs={12}>
            <Paper>
              <Typography variant="h6">
                Тест для стажеров по SQL
              </Typography>
            </Paper>
          </Grid>
          <Grid className="SampleData" item xs={5}>
            <ErrorBoundary>
              <Ala tables={alasql.tables} />
            </ErrorBoundary>
          </Grid>
          <Grid className="Tasks" item xs={7}>
            <SQLTasks currentTask={this.state.currentTask} currentVariant={this.state.currentVariant} setCurrentTask={this.setCurrentTask} setCurrentVariant={this.setCurrentVariant}/>
            <ErrorBoundary>
              <SQLInput alasql={alasql} changeTables={this.changeTables} saveCurrentSQL={this.saveCurrentSQL}/>
            </ErrorBoundary>
          </Grid>
        </Grid>
      </div>
    );
  }
}

/*

*/

export default App;

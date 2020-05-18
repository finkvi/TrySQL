import React from 'react';

import { Grid, Paper, Typography, Button, RadioGroup, FormControlLabel, Radio, FormLabel }  from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-sql';
import 'prismjs/themes/prism.css';

import DataTableMU from './DataTableMU';

import { maxTasks } from './tasks';

const styles = {
  root: {
    fontSize: '10px',
    fontWeight: 'bold',
  },
  header: {
    fontSize: '10px',
    fontWeight: 'bold',
  },
  rows: {
    fontSize: '10px',
  },
};

function ShowResult(props) {
    //Bad SQL, error
    if (props.res.error) {
        return (
            <Typography>
                {props.res.res}
            </Typography>
        );
    }
    
    //One table
    let r = props.res.res;
    if (Array.isArray(r) && r.length) {
        if ((typeof r[0] === 'object') && (!Array.isArray(r[0]))) {
            return (
                <DataTableMU data={props.res.res}/>
            );                
        } else if ((typeof r[0] === 'object') && (Array.isArray(r[0]))) {
            return (
                r.map ((t, index) => {
                    return (
                        <DataTableMU key={index} data={t}/>
                    ); 
                })
            );
        } else {
            return (
                <Typography>
                    {JSON.stringify(r)}
                </Typography>
            );  
        }
    } else if (typeof r === 'object') {
        return (
            <Typography>
                {JSON.stringify(r)}
            </Typography>
        );        
    } else {
        return (
            <Typography>
                {r}
            </Typography>
        );
    }
}

class SQLInput extends React.Component {
    constructor(props) {
        super(props);

        this.handleRunClick = this.handleRunClick.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleChangeTask = this.handleChangeTask.bind(this);
        
        let answers = [];
        for (let i = 0; i < maxTasks; i++) answers[i] = localStorage.getItem('answer' + i) 
            || '-- SQL код для задания #' + (i + 1)

        if (!localStorage.getItem('answer0')) {
            answers[0] +=`
-- Для примера работы, раскоментируйте этот код и нажмите кнопку Выполнить
/*
SELECT last_name, salary FROM STAFF
WHERE sex = 'F'
*/
`
        }

        this.state = {
            task: 0,
            sql: answers,
            res: "Здесь отображается результат выполнения SQL запроса",
            error: false
        };
    }
    
    handleRunClick(e) {
        //console.log("Run");
        this.props.alasql.promise(this.state.sql[this.state.task])
        .then(res => {
            this.setState({
                res: res,
                error: false
            });
            //console.log(res);
            return this.props.changeTables(this.props.alasql.tables);
        })
        .catch(e => {
            //console.log(e);
            this.setState ({
                res: e.stack.split('\n    at')[0],
                error: true
            });
        });
    }
    
    handleValueChange(e) {
        let sql = this.state.sql;
        sql[this.state.task] = e;

        localStorage.setItem('answer' + this.state.task, e);
        this.setState ({
            sql: sql
        });
    }
    
    handleChangeTask (e) {
        this.setState({
            task: parseInt(e.target.value, 10)
        });
    }
    

    render() {
        return (
            <Grid 
                container 
                spacing={1}
                direction="row"
            >
                <Grid item xs={12}>
                    <Paper>
                        <Typography 
                            variant="h6"
                            align="center"
                        >
                                Решите задание 
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={8}>
                    <Paper 
                        style={{ 
                            padding: 5,
                        }}
                    >
                        <Editor
                            value={this.state.sql[this.state.task]}
                            onValueChange={this.handleValueChange}
                            highlight={code => highlight(code, languages.sql)}
                            padding={10}
                            placeholder="Напишите и запустите SQL"
                            style={{
                              fontFamily: '"Fira code", "Fira Mono", monospace',
                              fontSize: 12,
                              minHeight: 130,
                            }}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={4}>
                    <FormLabel component="legend">Ваши ответы на задания</FormLabel>
                    <RadioGroup aria-label="tasks" name="tasks" value={this.state.task} onChange={this.handleChangeTask} row>
                            {this.state.sql.map((t, index) => {
                                return (
                                    <FormControlLabel labelPlacement="top" key={index} value={index} 
                                        control={
                                            <Radio size="small" />
                                        } label={'#' + (index+1)} />
                                );
                            })}
                    </RadioGroup>
                </Grid>
                <Grid item xs={2}>
                    <Button variant="contained" color="primary" onClick={this.handleRunClick}>
                        Выполнить
                    </Button>

                </Grid>
                <Grid item xs={12}>
                    <ShowResult res={this.state} />
                </Grid>
            </Grid>
    )}
}

export default  withStyles(styles)(SQLInput);
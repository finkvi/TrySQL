import React from 'react';

import { Grid, Paper, Typography, Button }  from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-sql';
import 'prismjs/themes/prism.css';

import DataTableMU from './DataTableMU';

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
        this.state = {
            sql: `SELECT * FROM STAFF
WHERE sex = "F"`,
            res: "Здесь результат выполнения SQL запроса",
            error: false
        };
        
        this.handleRunClick = this.handleRunClick.bind(this);
        this.handleSaveClick = this.handleSaveClick.bind(this);
    }
    
    handleRunClick(e) {
        //console.log("Run");
        this.props.alasql.promise(this.state.sql)
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
    
    handleSaveClick(e) {
        return this.props.saveCurrentSQL();
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
                            value={this.state.sql}
                            onValueChange={sql => this.setState({ sql })}
                            highlight={code => highlight(code, languages.sql)}
                            padding={10}
                            placeholder="Напишите и запустите SQL"
                            style={{
                              fontFamily: '"Fira code", "Fira Mono", monospace',
                              fontSize: 12,
                              minHeight: 80,
                            }}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={2}>
                    <Button variant="contained" color="primary" onClick={this.handleRunClick}>
                        Выполнить
                    </Button>

                </Grid>
                <Grid item xs={2}>
                    <Button variant="contained" color="secondary" onClick={this.handleSaveClick}>
                        Сохранить
                    </Button>    
                </Grid>
                <Grid item xs={12}>
                    <ShowResult res={this.state} />
                </Grid>
            </Grid>
    )}
}

export default  withStyles(styles)(SQLInput);
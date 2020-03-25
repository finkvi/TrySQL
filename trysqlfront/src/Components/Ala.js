import React from 'react';
//import alasql from 'alasql';
//import DataTable from './DataTable';
import DataTableMU from './DataTableMU';
//import DataStructure from './DataStructure.json';
//import DataStructure from './DataStructure.js';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  TableHeader: {
    fontSize: '10px',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  TableTitle: {
      textAlign: 'center',
  },
};

class Ala extends React.Component {
    render() {
        let t = this.props.tables;
        return (
           <Grid className="Tables" 
            container 
            direction="column"
            justify="flex-start"
            spacing={1}
            >
                {Object.keys(t).map((key, index) => {
                    //console.log(t[key]);
                    return (
                        <Grid key={"DataTableWrapper" + index} className="DataTableWrapper" item xs={12}>
                            <Paper>
                                <Typography className={this.props.classes.TableTitle} variant="subtitle2">
                                    {t[key].desc}
                                </Typography>
                                <DataTableMU key={index} data={t[key].data} tname={key}/>
                            </Paper>
                        </Grid>
                    );
                })}
           </Grid>
        );        
    }
}

export default withStyles(styles)(Ala);
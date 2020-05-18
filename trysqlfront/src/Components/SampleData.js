import React from 'react';
import DataTableMU from './DataTableMU';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    TableName: {
        fontFamily: "HeliosCond",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "14px",
        lineHeight: "16px",
        letterSpacing: "0.03em",
        textTransform: "uppercase",
        color: "#4B627C",
        display: "inline",
    },
    TableTitle: {
        fontFamily: "HeliosCond",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "14px",
        lineHeight: "17px",
        letterSpacing: "0.03em",
        color: "#494A49",
        display: "inline",
    },
    TablePaper: {
        background: "#F0F3F5",
        height: "36px",
    }
};

class SampleData extends React.Component {
    render() {
        const { classes, tables } = this.props;

        return (
           <Grid className="SampleTables" 
            container 
            direction="column"
            justify="flex-start"
            spacing={1}
            >
                {Object.keys(tables).map((key, index) => {
                    //console.log(t[key]);
                    return (
                        <Grid key={"DataTableWrapper" + index} className="DataTableWrapper" item xs={12}>
                            <Paper className={classes.TablePaper}>
                                <Typography className={classes.TableName}>
                                    {key}
                                </Typography>
                                <Typography className={classes.TableTitle}>
                                    {tables[key].desc}
                                </Typography>
                            </Paper>
                            <DataTableMU key={index} data={tables[key].data} tname={key}/>
                        </Grid>
                    );
                })}
           </Grid>
        );        
    }
}

export default withStyles(styles)(SampleData);
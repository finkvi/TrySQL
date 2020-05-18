import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { withStyles } from '@material-ui/core/styles';

const styles = {
  root: {
    fontSize: '10px',
    fontWeight: 'bold',
  },
  header: {
    fontSize: '10px',
    fontWeight: 'bold',
  },
  cell: {
    fontSize: '10px',
  },
};

const DataTableRow = withStyles(styles)((props) =>
  {
    return (
      <TableRow key={props.row}>
        {Object.keys(props.row).map((key, index) => {
          return <TableCell className={props.classes.cell} key={index}>{props.row[key]}</TableCell>;
        })}
      </TableRow>
    );
  }
);

class DataTableMU extends React.Component {
    render() {
        //if (this.props.table === undefined) return (<div>Таблица не задана или удалена</div>); 
        let t = this.props.data;
        if (!t.length) return (<div>Нет данных для отображения в таблице</div>);
        
        //console.log (t);
        
        return (
            <TableContainer component={Paper}>
              <Table className={this.props.classes.root} size="small">
                <TableHead>
                  <TableRow>
                    {Object.keys(t[0]).map((cell, index) => (
                        <TableCell className={this.props.classes.header} key={index}>{cell}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {t.map((row, index) => (
                    <DataTableRow key={index} row={row} />
                  ))}                
                </TableBody>              
              </Table>
            </TableContainer>
        );  
    }
}

export default withStyles(styles)(DataTableMU);
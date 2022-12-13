import { Box, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import Pagination from '@material-ui/lab/Pagination';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: "#181856",
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& > *': {
        marginTop: theme.spacing(2),
      },
    },
    table: {
      width: 500,
    },
  }),
);

interface permissionUserTableProps {
  data : any
  deleteMember : (_address : string) => void  
}

const PermissionUserTable = (props : permissionUserTableProps) => {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    setRows(props.data);
  }, [props.data])
  const classes = useStyles();
  
  const digitFormat = (num: number) => {
    return num > 9 ? num : '0' + num;
  }

  const dateFormat = (_date: string) => {
    const newDate = new Date(_date);
    return newDate.getFullYear() + "-" +
      digitFormat(newDate.getMonth() + 1) + "-" +
      digitFormat(newDate.getDate()) + " " +
      digitFormat(newDate.getHours()) + ":" +
      digitFormat(newDate.getMinutes()) + ":" +
      digitFormat(newDate.getSeconds());
  }

  return (
    <TableContainer component={Paper} style={{ height: 'calc(100vh - 100px)', width: 'unset' }}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>User Address</StyledTableCell>
            <StyledTableCell align="right">Date </StyledTableCell>
            <StyledTableCell align="right">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows && rows.length > 0 && rows.map((row : any) => (
            <StyledTableRow key={row.address}>
              <StyledTableCell component="th" scope="row">
                {row.address}
              </StyledTableCell>
              <StyledTableCell align="right">{dateFormat(row.date)}</StyledTableCell>
              <StyledTableCell align="right">
                <IconButton  color="secondary" aria-label="delete" onClick={() =>{
                  console.log("Address = ", row.address) 
                  props.deleteMember(row.address)
                  }}>
                  <DeleteIcon />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      {/* <div className={classes.root}>
        <Pagination count={10} showFirstButton showLastButton />
      </div> */}
    </TableContainer>
  )
}

export default PermissionUserTable
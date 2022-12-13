import { Box } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: "rgb(24 9 66)",
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

const useStyles = makeStyles({
  table: {
    minWidth: 500,
  },
});

interface PermissionTableProps {
  data: any
}

const PermissionTable = (props: PermissionTableProps) => {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  useEffect(() => {
    setRows(props.data.data);
  }, [props.data])

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
    <TableContainer component={Paper} style={{ height: 'calc(100vh - 300px)' }}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>User Address</StyledTableCell>
            <StyledTableCell align="right"> Type </StyledTableCell>
            <StyledTableCell align="right">Amount</StyledTableCell>
            <StyledTableCell align="right">To address</StyledTableCell>
            <StyledTableCell align="right">Date</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows && rows.length > 0 && rows.map((row: any, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                {row.address}
              </StyledTableCell>
              <StyledTableCell align="right">{row.actiontype}</StyledTableCell>
              <StyledTableCell align="right">{row.amount}</StyledTableCell>
              <StyledTableCell align="right">{row.toaddress}</StyledTableCell>
              <StyledTableCell align="right">{dateFormat(row.date)}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default PermissionTable
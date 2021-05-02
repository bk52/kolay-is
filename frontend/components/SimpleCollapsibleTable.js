import React, { useImperativeHandle } from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination'
import TablePaginationActions from './SimpleTablePagination'
import TableFooter from '@material-ui/core/TableFooter'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import { useTable, useFilters, useSortBy, useGlobalFilter, usePagination } from "react-table";
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#3f51b5",//theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 14,
    fontWeight: "bold"
  },
}))(TableCell);

const useStyles = makeStyles({
  table: {
    //minWidth: 700,
  },
  container: {
    maxHeight: "calc(100% - 120px)",
  },
});

// <TableRow {...row.getRowProps()}>
// {row.cells.map((cell) => {
//   return (
//     <TableCell {...cell.getCellProps()} style={{padding:"0px", paddingLeft:"16px", width:cell.column.width}}>
//       {cell.render("Cell")}
//     </TableCell>
//   );
// })}
// </TableRow>

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  let collapsibleCell=row.cells.filter((cell)=>cell.column.collapsible);
  let keyField=null;
  if(collapsibleCell && collapsibleCell.length>0)
  { 
    collapsibleCell=collapsibleCell[0];
    keyField=collapsibleCell.column.subTable.filter((cell)=>cell.key)
    keyField=keyField.length>0 ? keyField[0].field: keyField;
  }
  const aaa="unitPrice.$numberDecimal";
  const spanLength=row.cells.length;
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell style={{width:50}}>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {row.cells.map((cell) => {
          return (
            !cell.column.collapsible && <TableCell {...cell.getCellProps()} style={{ padding: "0px", paddingLeft: "16px", width: cell.column.width }}>
              {cell.render("Cell")}
            </TableCell> 
          );
        })}
      </TableRow>
       <TableRow>
        {collapsibleCell && <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={spanLength}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                {collapsibleCell.column.Header}
              </Typography>
              <MaUTable size="small" stickyHeader>
                <TableHead>
                  <TableRow>
                      {collapsibleCell.column.subTable.map((item)=> !item.key && <TableCell>{item.title}</TableCell>)}
                  </TableRow>
                </TableHead>
                 <TableBody>
                    {
                      collapsibleCell.value.map((subData)=>(
                        <TableRow key={subData[`${keyField}`]}>
                           {collapsibleCell.column.subTable.map((item)=>{
                             return !item.key ? item.type==="Decimal" ? <TableCell>{subData[`${item.field}`]["$numberDecimal"]}</TableCell> : <TableCell>{subData[`${item.field}`]}</TableCell> : null
                           })} 
                        </TableRow>
                      ))
                    }
    
                  {/* {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))} */}
                </TableBody> 
              </MaUTable>
            </Box>
          </Collapse>
        </TableCell>}
      </TableRow> 
    </React.Fragment>
  );
}

const Table = React.forwardRef(({ columns, data }, ref) => {
  const classes = useStyles();
  const instance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
  );

  const {
    // getTableBodyProps,
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
    setPageSize,
    // preGlobalFilteredRows,
    // setGlobalFilter,
    state: { pageIndex, pageSize, selectedRowIds, globalFilter },
  } = instance;

  const handleChangePage = (event, newPage) => {
    gotoPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setPageSize(Number(event.target.value))
  }

  useImperativeHandle(ref, () => instance);

  return (
    <div>
      <TableContainer className={classes.container}>
        <MaUTable {...getTableProps()} className={classes.table} stickyHeader>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                 <StyledTableCell style={{width:50}}/>
                {headerGroup.headers.map((column) => (
                   !column.collapsible && <StyledTableCell  {...column.getHeaderProps(column.getSortByToggleProps())} style={{ padding: "0px", paddingLeft: "16px", width: column.width }}>
                    {column.render("Header")}
                    {column.id !== 'selection' ? (
                      <TableSortLabel
                        active={column.isSorted}
                        // react-table has a unsorted state which is not treated here
                        direction={column.isSortedDesc ? 'desc' : 'asc'}
                      />
                    ) : null}
                  </StyledTableCell >
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                // <TableRow {...row.getRowProps()}>
                //   {row.cells.map((cell) => {
                //     return (
                //       <TableCell {...cell.getCellProps()} style={{padding:"0px", paddingLeft:"16px", width:cell.column.width}}>
                //         {cell.render("Cell")}
                //       </TableCell>
                //     );
                //   })}
                // </TableRow>
                <Row key={i} row={row} />
              );
            })}
          </TableBody>

        </MaUTable>
      </TableContainer>
      <TableFooter>
        <TableRow>
          <TablePagination
            rowsPerPageOptions={[
              5,
              10,
              25,
              { label: 'All', value: data.length },
            ]}
            colSpan={3}
            count={data.length}
            labelRowsPerPage="Sayfa başına kayıt adedi"
            rowsPerPage={pageSize}
            page={pageIndex}
            SelectProps={{
              inputProps: { 'aria-label': 'rows per page' },
              native: true,
            }}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
        </TableRow>
      </TableFooter>
    </div>
  );
})

export default Table
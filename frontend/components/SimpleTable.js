import React ,{ useImperativeHandle }  from "react";
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

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#3f51b5",//theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 14,
    fontWeight:"bold"
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

const Table = React.forwardRef(({ columns, data }, ref) =>{
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
            {headerGroup.headers.map((column) => (
              <StyledTableCell  {...column.getHeaderProps(column.getSortByToggleProps())} style={{padding:"0px", paddingLeft:"16px", width:column.width}}>
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
            <TableRow {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <TableCell {...cell.getCellProps()} style={{padding:"0px", paddingLeft:"16px", width:cell.column.width}}>
                    {cell.render("Cell")}
                  </TableCell>
                );
              })}
            </TableRow>
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
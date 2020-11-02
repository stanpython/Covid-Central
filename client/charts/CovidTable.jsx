import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
  { id: 'country', label: 'Country', minWidth: 170 },
  {
    id: 'cases',
    label: 'Total Cases',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'todayCases',
    label: 'Cases Today',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'deaths',
    label: 'Deaths',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'active',
    label: 'Active Cases',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'recovered',
    label: 'Total Recovered',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
];

function createData(country, cases, todayCases, deaths, active, recovered) {
    return { country, cases, todayCases, deaths, active, recovered };
}



const useStyles = makeStyles({
  root: {
    width: '80%',
    margin: 'auto',
    fontWeight: 'bold', 
    // backgroundColor: 'rgba(0, 0, 0, 0.03)',
    margin: '10px 0px auto'
  },
  container: {
    maxHeight: 950,
    minHeight: 600,
    
  },
});

// const rows = [];

export default function StickyHeadTable(props) {
  const { data } = props
  const [rows, setRows] = React.useState([])
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const injectRows = async () => {
    const allCountries = await fetch('https://coronavirus-19-api.herokuapp.com/countries')
    const allCountriesJson = await allCountries.json();
    const result = [];
    allCountriesJson.forEach(country => {
        result.push(createData(country.country, country.cases, country.todayCases, country.deaths, country.active, country.recovered))
    })
    setRows(result)
  }

  useEffect(() => {
    injectRows()
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        // rowsPerPageOptions={[1]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

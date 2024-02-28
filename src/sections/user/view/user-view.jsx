import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// 'Frozen yoghurt', '2020-01-05' , 6, 2, 2500, "paid"
function createData(name, date, kg, HowmanyProduct, price, confirm) {
  return {
    name,
    date,
    kg,
    HowmanyProduct,
    price,
    confirm,
    history: [
      {
        name: "sondesh",
        no: 2,
      },
      {
        name: "doi",
        no: 1,
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.date}</TableCell>
        <TableCell align="right">{row.kg}</TableCell>
        <TableCell align="right">{row.HowmanyProduct}</TableCell>
        <TableCell align="right">{row.price}</TableCell>
        <TableCell align="right">{row.confirm}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>kg</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row?.history.map((historyRow) => (
                    // <TableRow key={historyRow.date}>
                    <TableRow component="th" scope="row">
                      <TableCell>{historyRow.name}</TableCell>
                      <TableCell>{historyRow.no}</TableCell>
                    </TableRow>

                    // </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     date: PropTypes.string.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       }),
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };

const rows = [
  createData("Nayeem Mehedi", "2020-01-05", 6, 2, 2500, "paid"),
  createData("Mehedi Reza", "2020-01-05", 6, 2, 2500, "unpaid"),
  createData("Amily Sharin", "2020-01-05", 6, 2, 2500, "unpaid"),
  createData("Jannatul ferdous", "2020-01-05", 6, 2, 2500, "paid"),
  createData("Asif Mahamud", "2020-01-05", 6, 2, 2500, "paid"),
];

export default function UserPage() {
  return (
    <div>
      <div>
        <p className="font-bold mt-2 mb-5 text-2xl">
          {" "}
          Product Oder List by Customer
        </p>
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Name</TableCell>
              <TableCell align="right">Oder Date</TableCell>
              <TableCell align="right">Total kg</TableCell>
              <TableCell align="right">Total product</TableCell>
              <TableCell align="right">Total Money</TableCell>
              <TableCell align="right">Paid Confirm</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

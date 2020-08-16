import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function DenseTable() {
  const classes = useStyles();

  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:5000/products");

      console.log("result", result);

      setData(result.data);
      console.log("data", result.data);
    };

    fetchData();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Products</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Rating</TableCell>
            <TableCell align="right">warranty_years</TableCell>
            <TableCell align="right">available</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((d) => (
              <TableRow key={d._id}>
                <TableCell component="th" scope="row">
                  {d.name}
                </TableCell>
                <TableCell align="right">{d.type}</TableCell>
                <TableCell align="right">{d.price}</TableCell>
                <TableCell align="right">{d.rating}</TableCell>
                <TableCell align="right">{d.warranty_years}</TableCell>
                <TableCell>{d.available.toString()}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary">
                    Modifier
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => this.handleModify(d)}
                  >
                    Supprimer
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

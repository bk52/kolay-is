import React from "react";
import Rating from "@material-ui/lab/Rating";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import SimpleTable from "./VirtualizedTable";

const sample = [
  ["Frozen yoghurt", 159, 6.0, 24, 4.0],
  ["Ice cream sandwich", 237, 9.0, 37, 4.3],
  ["Eclair", 262, 16.0, 24, 6.0],
  ["Cupcake", 305, 3.7, 67, 4.3],
  ["Gingerbread", 356, 16.0, 49, 3.9],
];

function createData(id, dessert, calories, fat, carbs, protein) {
  carbs = <Rating name="read-only" value={3} readOnly />;
  protein = (
    <IconButton size="small" aria-label="edit">
      <EditIcon />
    </IconButton>
  );
  return { id, dessert, calories, fat, carbs, protein };
}

const rows = [];

for (let i = 0; i < 200; i += 1) {
  const randomSelection = sample[Math.floor(Math.random() * sample.length)];
  rows.push(createData(i, ...randomSelection));
}

const columns = [
  {
    width: 50,
    label: "",
    dataKey: "protein",
    numeric: true,
  },
  {
    width: 300,
    flexGrow: 1,
    label: "Firma Adı",
    dataKey: "dessert",
  },
  {
    width: 150,
    flexGrow: 1,
    label: "Yetkili",
    dataKey: "calories",
  },
  {
    width: 120,
    flexGrow: 1,
    label: "Telefon",
    dataKey: "fat",
    //numeric: true,
  },
  {
    width: 180,
    flexGrow: 1,
    label: "Puan",
    dataKey: "carbs",
    //numeric: true,
  },
];

export default function CustomerTable() {
  return <SimpleTable rows={rows} columns={columns}></SimpleTable>;
}

import React, {useEffect} from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import {FindCustomers} from "../redux/actions/customersApi";

let prevSearchText = "";

const TestOptions=[
  {_id:"1", productName:"Kaşe", productUnit:"Adet",unitPrice:40},
  {_id:"2", productName:"Fatura", productUnit:"Cilt",unitPrice:80},
]

export default function AutoBox({selectedChanged}) {
    const [loading, setLoading] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const [optionText, setoptionText]= React.useState("En az 3 harf girin")

    useEffect(() => {prevSearchText = "";}, []);

    function SearchItem(e) {
        let searchText = e.target.value;
        if (searchText.length > 2) {
            if (prevSearchText !== "" && searchText.includes(prevSearchText)) {} 
            else {
              prevSearchText = searchText;
              setLoading(true);

              setOptions(TestOptions); setLoading(false);
              // FindCustomers(searchText)
              // .then((response)=>{
              //   if(response.data && response.data.result)
              //     setOptions(response.data.result);
              //   setLoading(false);
              // })
              // .catch((err)=>{
              //     setoptionText("API Error");
              //     setLoading(false);
              // })
            }      
        }
        else if(searchText==""){
            setoptionText("En az 3 harf girin")
            setOptions([])
        }
      }
  return (
    <Autocomplete
      id="combo-box-demo"
      disableClearable={true}
      options={options}
      noOptionsText={optionText}
      getOptionLabel={(option) => option.productName}
      style={{ width: "100%" }}
      onChange={(event, newValue) => {selectedChanged(newValue);}}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Ürünlerde Ara"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
          onChange={(e) => {
            SearchItem(e);
          }}
        />
      )}

      renderOption={(option) => (
        <React.Fragment>
             <Grid container spacing={1}>
               <Grid container xs={12}><Typography>{option.productName}</Typography></Grid>
             </Grid>
        </React.Fragment>
      )}
    />
  );
}
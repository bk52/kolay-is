import React, {useEffect} from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import {GetProducts} from "../redux/actions/productsApi";

let prevSearchText = "";

export default function AutoBox({selectedChanged}) {
    const [loading, setLoading] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const [optionText, setoptionText]= React.useState("Ürünlerde Ara")

    useEffect(() => {
      prevSearchText = "";
      GetProducts()
      .then((data)=>{if(data && data.result){setOptions(data.result)}})
      .catch((error)=>{console.log(error); setoptionText("API Error")})
    }, []);

    function SearchItem(e) {
        let searchText = e.target.value;
        if (searchText.length > 0) {
            if (prevSearchText !== "" && searchText.includes(prevSearchText)) {} 
            else {
              prevSearchText = searchText;
              setLoading(true);
              setOptions(options); setLoading(false);
            }      
        }
        else if(searchText==""){
            setoptionText("Ürünlerde Ara")
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
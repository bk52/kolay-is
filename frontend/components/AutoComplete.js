import React, {useEffect} from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Rating from "@material-ui/lab/Rating";
import Grid from "@material-ui/core/Grid";
import {FindCustomers} from "../redux/actions/customersApi";

let prevSearchText = "";

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

              FindCustomers(searchText)
              .then((response)=>{
                if(response.data && response.data.result)
                  setOptions(response.data.result);
                setLoading(false);
              })
              .catch((err)=>{
                  setoptionText("API Error");
                  setLoading(false);
              })
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
      options={options}
      noOptionsText={optionText}
      getOptionLabel={(option) => option.fullName}
      style={{ width: "100%" }}
      onChange={(event, newValue) => {selectedChanged(newValue);}}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Hesap Defterinde Ara"
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
               <Grid container xs={12}><Typography>{option.fullName}</Typography></Grid>
                <Grid container>
                  <Grid item xs={12} md={8}><Typography color="textSecondary" style={{fontSize:"12px"}}>{option.ownerName}</Typography></Grid>
                  <Grid item xs={12} md={4} style={{textAlign:"right"}}><Rating name="read-only" value={option.rate} readOnly /></Grid>
                </Grid>
             </Grid>
        </React.Fragment>
      )}
    />
  );
}
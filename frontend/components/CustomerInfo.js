import React, { useEffect, useState, useRef, useImperativeHandle } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import PhoneField from "./PhoneField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Rating from "@material-ui/lab/Rating";
import { useDispatch, useSelector } from "react-redux";
import { cities, towns } from "../common/cities";
import {types} from "../redux/constants/action-types";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  rate: {
    paddingTop: "15px",
  },
}));

const MenuItemsCity = cities.map((item) => {
  return <MenuItem value={item.code}>{item.name}</MenuItem>;
});
let MenuItemsTowns = [];

const GetTowns = (cityID) => {
  MenuItemsTowns = towns
    .filter((item) => {
      return item.cityCode == cityID;
    })
    .map((townItem) => {
      return <MenuItem value={townItem.townCode}>{townItem.name}</MenuItem>;
    });
};

export default React.forwardRef((props, ref) => {
  const classes = useStyles();
  const [formVal, setformVal] = useState({ cityID: 0, townID: 0, rate: 0 });
  const [isError, setisError] = useState(false);
  const formRef = useRef();
  const formState = useSelector((state) => state.customer);
  const dispatch = useDispatch();
  useEffect(() => {
    if (formState.customerFormVal.cityID) {
      GetTowns(formState.customerFormVal.cityID);
    }
    setformVal(formState.customerFormVal);
  }, []);

  function handleInputChange(e) {
    const { name, value } = e.target;
    if (name === "cityID") {
      GetTowns(value);
    }

    setformVal((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  useImperativeHandle(ref, () => ({
    saveState() {
      let _values = {
        _id:formRef.current["_id"].value,
        fullName: formRef.current["fullName"].value,
        ownerName: formRef.current["ownerName"].value,
        taxAdress: formRef.current["taxAdress"].value,
        taxNo: formRef.current["taxNo"].value,
        tel1: formRef.current["tel1"].value,
        tel2: formRef.current["tel2"].value,
        fax: formRef.current["fax"].value,
        mail: formRef.current["mail"].value,
        adress: formRef.current["adress"].value,
        cityID: formRef.current["cityID"].value,
        townID: formRef.current["townID"].value,
        notes: formRef.current["notes"].value,
        rate: formRef.current["rate"].value,
      };
      dispatch({ type: "Customer_SaveForm", formVal: _values });
    },
    saveForm() {
      let fullName = formRef.current["fullName"].value;
      if (fullName && fullName !== "") {
        setisError(false);
        let _values = {
          _id:formRef.current["_id"].value,
          fullName: formRef.current["fullName"].value,
          ownerName: formRef.current["ownerName"].value,
          taxAdress: formRef.current["taxAdress"].value,
          taxNo: formRef.current["taxNo"].value,
          tel1: formRef.current["tel1"].value,
          tel2: formRef.current["tel2"].value,
          fax: formRef.current["fax"].value,
          mail: formRef.current["mail"].value,
          adress: formRef.current["adress"].value,
          cityID: formRef.current["cityID"].value,
          townID: formRef.current["townID"].value,
          notes: formRef.current["notes"].value,
          rate: formRef.current["rate"].value,
        };
        _values.tel1= _values.tel1.replace("(","").replace(")","").replace("-","");
        _values.tel2= _values.tel2.replace("(","").replace(")","").replace("-","");
        _values.fax= _values.fax.replace("(","").replace(")","").replace("-","");
        if(_values._id==="" || _values._id===null || _values._id===undefined){
          delete _values._id;
        }
        dispatch({ type: "Customer_SaveForm", formVal: _values });
        dispatch({ type: types.CUSTOMER_MODAL_LOADING, payload:{loading: true} });
        dispatch({ type: types.CUSTOMER_SET_INFO, payload:{ customerForm: _values} });
      } else {
        setisError(true);
      }
    },
  }));

  return (
    <div className={classes.root}>
      <form ref={formRef}>   
        <Grid container className={classes.root} spacing={2}>
          <Grid item xs={12} style={{display:"none"}}>
            <TextField disabled id="_id" name="_id"  value={formVal._id}/>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="fullName"
              name="fullName"
              value={formVal.fullName}
              label="Firma Adı"
              fullWidth
              onChange={handleInputChange}
              error={isError}
              helperText={isError ? "Bu alan zorunludur" : ""}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="ownerName"
              name="ownerName"
              value={formVal.ownerName}
              label="Yetkili"
              fullWidth
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="taxAdress"
              name="taxAdress"
              value={formVal.taxAdress}
              label="Vergi Dairesi"
              fullWidth
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="taxNo"
              name="taxNo"
              value={formVal.taxNo}
              label="Vergi No."
              fullWidth
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={3}>
            <PhoneField
              id="tel1"
              name="tel1"
              value={formVal.tel1}
              label="Tel(1)"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={3}>
            <PhoneField
              id="tel2"
              name="tel2"
              value={formVal.tel2}
              label="Tel(2)"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={3}>
            <PhoneField
              id="fax"
              name="fax"
              value={formVal.fax}
              label="Fax"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="mail"
              name="mail"
              value={formVal.mail}
              label="Mail"
              fullWidth
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              id="adress"
              name="adress"
              value={formVal.adress}
              label="Adres"
              fullWidth
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={2}>
            <FormControl fullWidth>
              <InputLabel id="label-cityID">İl</InputLabel>
              <Select
                labelId="label-cityID"
                id="cityID"
                name="cityID"
                value={formVal.cityID}
                onChange={handleInputChange}
              >
                {MenuItemsCity}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <FormControl fullWidth>
              <InputLabel id="label-townID">İlçe</InputLabel>
              <Select
                labelId="label-townID"
                id="townID"
                name="townID"
                value={formVal.townID}
                onChange={handleInputChange}
              >
                {MenuItemsTowns}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={10}>
            <TextField
              id="notes"
              name="notes"
              value={formVal.notes}
              label="Firma Notu"
              fullWidth
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={2}>
            <FormControl>
              <Rating
                className={classes.rate}
                labelId="label-rate"
                id="rate"
                name="rate"
                value={formVal.rate}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
        </Grid>
      </form>
    </div>
  );
});

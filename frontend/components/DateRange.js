import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import dateFormat from "../common/datepickerFormat";

const useStyles = makeStyles((theme) => ({
  root: { flexGrow: 1 },
}));

const DateRange = forwardRef((props, ref) => {
  const classes = useStyles();
  const [formVal, setformVal] = useState({ startDate: "", finishDate: "" });
  const [dateErr, setdateErr] = useState({ startDate: false, finishDate: false });
  useEffect(() => {
      let prevDate = new Date();
      prevDate.setMonth(prevDate.getMonth() - 1);
      setformVal({startDate: dateFormat(prevDate), finishDate: dateFormat(new Date())});
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setformVal((prevState) => ({ ...prevState, [name]: value }));
  };
  useImperativeHandle(ref, () => ({
    GetDate() {return {startDate:formVal.startDate, finishDate:formVal.finishDate}},
  }));
  return (
    <form>
      <Grid container className={classes.root} spacing={1}>
        <Grid item md={6} xs={12}>
          <TextField 
            fullWidth 
            id="startDate" 
            label="Başlangıç Tarihi" 
            type="date"
            name="startDate" 
            value={dateFormat(formVal.startDate)} 
            InputLabelProps={{ shrink: true }}
            onChange={handleInputChange}
            error={dateErr.startDate}
            helperText={dateErr.startDate ? "Başlangıç tarihi girin" : null}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            fullWidth
            id="finishDate"
            label="Bitiş Tarihi"
            type="date"
            name="finishDate"
            value={dateFormat(formVal.finishDate)}
            InputLabelProps={{ shrink: true }}
            onChange={handleInputChange}
            error={dateErr.finishDate}
            helperText={dateErr.finishDate ? "Bitiş tarihi girin" : null}
          />
        </Grid>
      </Grid>
    </form>
  );
});

export default DateRange;
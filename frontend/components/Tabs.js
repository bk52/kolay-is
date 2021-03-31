import React, { useState, useRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  labelContainer: {
    width: "auto",
    padding: 0,
  },
  iconLabelWrapper: {
    flexDirection: "row",
  },
  labelIcon:{
    minHeight: "0px",
    paddingTop: "9px"
  }
}));

export default React.forwardRef((props, ref) => {
  const childRef = useRef();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const tabItems = [];
  const tabPanels = [];
 
  useImperativeHandle(
    ref,
    () => ({
      saveCustomerForm() {
         if(childRef.current.saveForm){
          childRef.current.saveForm();
         }
      },
    }),
  )

  props.tabList.map((item) => {
    tabItems.push(
      <Tab
        classes={{
          wrapper: classes.iconLabelWrapper,
          labelContainer: classes.labelContainer,
          labelIcon:classes.labelIcon
        }}
        label={<span style={{paddingLeft:"8px"}}>{item.title}</span>}
        icon={item.icon}
        {...a11yProps(item.index)}
      />
    );
    if (item.index == 0) {
      item.component.ref = childRef;
    }
    tabPanels.push(
      <TabPanel value={value} index={item.index}>
        {item.component}
      </TabPanel>
    );
  });

  const handleChange = (event, newValue) => {
    if (value == 0 && newValue != 0) {
      if(childRef.current && childRef.current.saveState){
        childRef.current.saveState();
      }
     } 
    setValue(newValue);
     if(newValue==0)
        props.isFirstTab(true)
    else
      props.isFirstTab(false)
  };

  return (
    <div className={classes.root}>
       <AppBar position="static">
          <Tabs value={value} onChange={handleChange}>
            {tabItems}
          </Tabs>
         </AppBar>
      {tabPanels}
    </div>
  );
}
)

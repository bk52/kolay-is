import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";


const TabPanel=(props)=> {
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

const a11yProps=(index)=> {
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

const TabsComponent = (props) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const tabItems = [];
  const tabPanels = [];
 
  props.tabList.map((item) => {
    tabItems.push(
      <Tab key={item.index}
        classes={{
          wrapper: classes.iconLabelWrapper,
          //labelContainer: classes.labelContainer,
          labelIcon:classes.labelIcon
        }}
        label={<span style={{paddingLeft:"8px"}}>{item.title}</span>}
        icon={item.icon}
        {...a11yProps(item.index)}
      />
    );
    tabPanels.push(
      <TabPanel key={item.index} value={value} index={item.index}>
        {item.component}
      </TabPanel>
    );
  });

  const handleChange = (event, newValue) => {
    // if (value == 0 && newValue != 0) {} 
    setValue(newValue);
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

export default TabsComponent;
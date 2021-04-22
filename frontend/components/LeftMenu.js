import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import lang from "../lang/langTR";

import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import ListIcon from "@material-ui/icons/List";
import BarChartIcon from "@material-ui/icons/BarChart";
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';

const drawerWidth = 200;
const drawerTop = 64;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    top: drawerTop,
    zIndex: 0,
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
  },
}));

const MenuItems = [
  { key: 1, icon: <HomeOutlinedIcon />, title: lang.Menu_Anasayfa, url: "/coming/Anasayfa" },
  { key: 2, icon: <WorkOutlineIcon />, title: lang.Menu_İşler, url: "/orders" },
  { key: 3, icon: <GroupOutlinedIcon />, title: lang.Menu_Müsteriler, url: "/customers" },
  // { key: 4, icon: <ArrowBackIcon />, title: lang.Menu_Tedarikciler, url: "/coming/Tedarikçiler" },
  { key: 5, icon: <AttachMoneyIcon />, title: lang.Menu_Ödemeler, url: "/accountBalance" },
  { key: 6, icon: <ListIcon />, title: lang.Menu_Ürünler, url: "/products" },
  { key: 7, icon: <BarChartIcon />, title: lang.Menu_Raporlar, url: "/reports" },
];

export default function PersistentDrawerLeft(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  //const [open, setOpen] = React.useState(props.menuOpen);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={props.menuOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <List>
          {MenuItems.map((item) => (
            <ListItem button component={Link} to={item.url}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}

import React, { useState, useEffect} from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import ProductList from "../components/ProductList";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Toast from "./Snackbar";

const OrderProductList = ({ list, onRowDelete }) => {
    return (
      <List >
        <ListItem>
          <Grid item xs={1}></Grid>
          <Grid item xs={3}>Ürün Adı</Grid>
          <Grid item xs={2}>Birim</Grid>
          <Grid item xs={2}>Birim Fiyat</Grid>
          <Grid item xs={2}>Adet</Grid>
          <Grid item xs={2}>Toplam</Grid>
        </ListItem>
        <div style={{ maxHeight: 150, overflowY: "scroll" }}>
          {
            list.map((item) => {
              return <ListItem key={item.index}>
                <Grid item xs={1}><IconButton size="small" aria-label="edit" onClick={(e) => {onRowDelete(item.index)}}><DeleteIcon /></IconButton></Grid>
                <Grid item xs={3}>{item.productName}</Grid>
                <Grid item xs={2}>{item.productUnit}</Grid>
                <Grid item xs={2}>{item.unitPrice} ₺</Grid>
                <Grid item xs={2}>{item.orderCount}</Grid>
                <Grid item xs={2}>{item.totalPrice} ₺</Grid>
              </ListItem>
            })
          }
        </div>
      </List>
    )
}

const OrderInfo= (props) => {
    const {addOrder, removeOrder, orderList, orderStats, discountChanged} = props;
    const SaveProduct = () => {
        if(selectedProduct._id===""){ Toast.warning("Ürün seçiniz"); return;}
        addOrder(selectedProduct);
    }
    const CancelProduct = () => { 
        setSelectedProduct({_id:"",productName:"",productUnit:"",unitPrice:0,orderCount:1,totalPrice:0})
    }
    const RemoveProduct = (index) => {
      removeOrder(index);
    }
    const onProductSelected = (e) => {
      if(e && e.unitPrice)
        setSelectedProduct(prevState => ({...e,orderCount:prevState.orderCount,totalPrice:prevState.orderCount*e.unitPrice}))
    }
    const orderCountChanged = (e) => {
        const {value}=e.target;
        setSelectedProduct(prevState => ({...prevState, orderCount:value, totalPrice:value*prevState.unitPrice}))
    }
    const [selectedProduct,setSelectedProduct]=useState({
        _id:"",
        productName:"",
        productUnit:"",
        unitPrice:0,
        orderCount:1,
        totalPrice:0
      })


    return (     
        <Grid container spacing={1}>
        <Grid item xs={12} md={4}>
          <Paper>
            <Grid container spacing={1} style={{ paddingLeft: 8, paddingRight: 8 }}>
              <Grid item xs={4} style={{ marginTop: 20 }}>Ürün</Grid><Grid item xs={8}><ProductList selectedChanged={onProductSelected} /></Grid>
              <Grid item xs={4}>Birim</Grid><Grid item xs={8}><TextField fullWidth disabled value={selectedProduct.productUnit} inputProps={{ style: { textAlign: 'right' } }} /></Grid>
              <Grid item xs={4}>Birim Fiyat</Grid><Grid item xs={8}><CurrencyTextField fullWidth currencySymbol="₺" outputFormat="string" decimalPlaces={2} value={selectedProduct.unitPrice} disabled /></Grid>
              <Grid item xs={4}>Adet</Grid><Grid item xs={8}><TextField onChange={orderCountChanged} fullWidth type="number" value={selectedProduct.orderCount} inputProps={{ min: 1,  style: { textAlign: 'right' } }} /></Grid>
              <Grid item xs={4}>Toplam</Grid><Grid item xs={8}><CurrencyTextField fullWidth currencySymbol="₺" outputFormat="string" decimalPlaces={2} value={selectedProduct.totalPrice} disabled /></Grid>
              <Grid item xs={12} style={{ textAlign: "right" }}>
                <Button onClick={SaveProduct} startIcon={<SaveIcon />} color="primary">KAYDET</Button>
                {/*{" "}<Button onClick={CancelProduct} color="secondary" startIcon={<CloseIcon />}>İPTAL</Button> */}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper>
            <OrderProductList list={orderList} onRowDelete={RemoveProduct}/>
            <Grid container spacing={1} style={{ paddingLeft: 8, paddingRight: 8, backgroundColor:"lightgray" }}>
              <Grid item xs={3}><CurrencyTextField label="Toplam" fullWidth currencySymbol="₺" outputFormat="string" decimalPlaces={2} value={orderStats.total} disabled /></Grid>
              <Grid item xs={3}><CurrencyTextField label="KDV %18" fullWidth currencySymbol="₺" outputFormat="string" decimalPlaces={2} value={orderStats.tax} disabled /></Grid>
              <Grid item xs={3}><CurrencyTextField label="İskonto" fullWidth currencySymbol="₺" onChange={discountChanged} outputFormat="string" decimalPlaces={2} value={orderStats.discount} /></Grid>
              <Grid item xs={3}><CurrencyTextField label="Net" fullWidth currencySymbol="₺" outputFormat="string" decimalPlaces={2} value={orderStats.net} disabled /></Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    )
}

export default OrderInfo;
import React, {
  useState,
  useEffect,
  useMemo,
  useRef
} from "react";
import IconButton from "@material-ui/core/IconButton";
import CssBaseline from "@material-ui/core/CssBaseline";
import Table from "../components/SimpleTable";
import { useConfirm } from "material-ui-confirm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ProductSearch from "../components/CustomerHeader";
import AddIcon from "@material-ui/icons/Add";
import {GetProducts, GetProduct, SetProduct, DeleteProduct} from "../redux/actions/productsApi";
import dateFormat from "../common/formatDate";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import Toast from "../components/Snackbar";
import Paper from "@material-ui/core/Paper";
const ProductTable=({filterText, tableData, onRowEdit, onRowDelete})=>{
    const tableInstance = useRef(null);
    const Edit = (value) => {onRowEdit(value)};
    const Delete = (value) => {onRowDelete(value)};
    if(tableInstance && tableInstance.current){tableInstance.current.setGlobalFilter(filterText);}
    const columns = useMemo(
        () => [
        {
            Header: "",
            accessor: "_id",
            Cell: (props) => {
            return (
                <div style={{ display: "inline-flex" }}>
                <IconButton
                    size="small"
                    aria-label="edit"
                    onClick={(e) => {
                    e.stopPropagation();
                    Edit(props.value);
                    }}
                >
                    <EditIcon />
                </IconButton>
                <IconButton
                    size="small"
                    aria-label="delete"
                    onClick={(e) => {
                    e.stopPropagation();
                    Delete(props.value);
                    }}
                >
                    <DeleteIcon />
                </IconButton>
                </div>
            );
            },
            disableSortBy: true,
        },
        {
            Header: "Ürün",
            accessor: "productName",
            disableSortBy: true,
        },
        {
            Header: "Birim",
            accessor: "productUnit",
            disableSortBy: true,
        },
        {
            Header: "Birim Fiyat",
            accessor: "unitPrice",
            disableSortBy: true,
            Cell: (props) => { return (<div>{props.value + " ₺"}</div>);},
        },
        {
            Header: "Açıklama",
            accessor: "description",
            disableSortBy: true,
        },
        {
            Header: "Güncelleme Tarihi",
            accessor: "updatedDate",
            disableSortBy: true,
            Cell: (props) => {
                let dateArr = dateFormat(props.value);
                return (<div>{dateArr[0] +" "+ dateArr[1]}</div>);
              },
        },
        ],
        []
    );
    return (
        <div>
        <CssBaseline />
        <Table columns={columns} data={tableData} ref={tableInstance} />
        </div>
    );
}

const ProductModal=({handleClose,onRowSave,_id=""})=>{
    const [ready, setReady]=useState(false);
    const formRef = useRef();
    const [formVal, setformVal]=useState({productName:"",productUnit:"",unitPrice:0});
    const [valid, setValid]=useState({productName:false,productUnit:false,unitPrice:false});
    useEffect(() => {
        if(_id=="") setReady(true);
        else{
            GetProduct(_id)
            .then((data)=>{
               if(data.result && data.result.length>0){
                setformVal({
                    productName: data.result[0].productName,
                    productUnit: data.result[0].productUnit,
                    unitPrice: data.result[0].unitPrice,
                    description: data.result[0].description
                });
                setReady(true);
               }
            })
            .catch((error)=>{console.log(error)})
        }
    },[_id])
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setformVal((prevState) => ({ ...prevState, [name]: value }));
    };
    const validation=(e)=>{
        const { name, value } = e;
        setValid((prevState) => ({ ...prevState, [name]: value }));
    }
    const onSaveClick=()=>{
        setValid({productName:false,productUnit:false,unitPrice:false});
        if(formVal.productName==""){validation({name:"productName", value:true}); return;}
        if(formVal.productUnit==""){validation({name:"productUnit", value:true}); return;}
        let product={...formVal};
        if(_id!=="") product._id=_id;
        setReady(false);
        SetProduct(product)
        .then((data)=>{onRowSave(true);})
        .catch((error)=>{ setReady(true);onRowSave(false);})     
    }
    return (
        <Dialog open={true} onClose={handleClose} fullWidth={true} maxWidth={"md"} disableBackdropClick={true}>
            {
                ready ? <div>
                    <DialogTitle id="alert-dialog-title"> {_id=="" ? "Ürün Ekle" : "Ürün Düzenle"} </DialogTitle>
                    <DialogContent>
                        <form ref={formRef}>
                            <Grid container spacing={1}>
                                <Grid item xs={12} md={4}><TextField value={formVal.productName} fullWidth id="productName" name="productName" label="Ürün Adı" error={valid.productName} helperText={valid.productName ? "Bu alan zorunludur":null} onChange={handleInputChange}></TextField></Grid>
                                <Grid item xs={12} md={4}><TextField value={formVal.productUnit} fullWidth id="productUnit" name="productUnit" label="Birim" error={valid.productUnit} helperText={valid.productUnit ? "Bu alan zorunludur":null} onChange={handleInputChange}></TextField></Grid>
                                <Grid item xs={12} md={4}><CurrencyTextField value={formVal.unitPrice} fullWidth id="unitPrice" name="unitPrice" label="Birim Fiyat" variant="standard" currencySymbol="₺" outputFormat="string" decimalPlaces={2} error={valid.unitPrice} helperText={valid.unitPrice ? "Bu alan zorunludur":null} onChange={handleInputChange}></CurrencyTextField></Grid>
                                <Grid item xs={12} md={12}><TextField value={formVal.description} fullWidth id="description" name="description" label="Açıklama" onChange={handleInputChange}></TextField></Grid>
                            </Grid>
                        </form>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={onSaveClick} variant="contained" startIcon={<SaveIcon />} color="primary">KAYDET</Button>
                    <Button onClick={handleClose} variant="contained" color="secondary" startIcon={<CloseIcon />}>İPTAL</Button>
                    </DialogActions>
                </div> : <LinearProgress />
            }
        </Dialog>
    )
}

const ProductPage = () => {
    const confirm = useConfirm();
    const [filterText, setfilterText] = useState("");
    const [apiData, setData] = useState([]);
    const [productModal,setProductModal]=useState({_id:"",open:false});
    const [ready, setReady]=useState(false);
    const fillTable=()=>{GetProducts().then((response)=>{setData(response.result);setReady(true);}).catch((error)=>{console.log(error);setReady(true);})}
    const addNew=()=>{setProductModal({_id:"",open:true})}
    const onRowEdit=(_id)=>{setProductModal({_id,open:true})};
    const onRowDelete=(_id)=>{
        confirm({ title: "Kaydı Sil", description: "Kaydı silmek istiyor musunuz?", confirmationText: "Tamam", cancellationText: "İptal",})
        .then(() => {
            DeleteProduct(_id)
            .then((data)=>{
                Toast.success("Kayıt Silindi");
                fillTable();
            })
            .catch((error)=>{Toast.error("Hata Oluştu");})
        })
        .catch(() => {});
    };
    const onRowSave=(success)=>{
        if(success){
            fillTable();
            setProductModal({_id:"",open:false});
            Toast.success("Kaydedildi");
        }
        else{Toast.error("Hata Oluştu");}
    }
    const closeModal=()=>{fillTable();setProductModal({_id:"",open:false})};
    const textChanged = (e) => {const val = e.target.value || ""; setfilterText(val);};
    useEffect(() => {fillTable();}, []);
    return(
        <div>
            {
                ready ? <div>
                    <Paper style={{marginBottom:8}}><ProductSearch textChanged={textChanged} buttonClick={addNew} textLabel={"Ürünlerde Ara"} buttonIcon={<AddIcon />}buttonTooltip={"Yeni Ürün"} /></Paper>
                    <Paper><ProductTable filterText={filterText} tableData={apiData} onRowEdit={onRowEdit} onRowDelete={onRowDelete}/></Paper>
                    {productModal.open ? <ProductModal open={true} _id={productModal._id} handleClose={closeModal} onRowSave={onRowSave}></ProductModal> : null}
                </div> :  <LinearProgress/>
            }
        </div>  
    )
};

export default ProductPage;

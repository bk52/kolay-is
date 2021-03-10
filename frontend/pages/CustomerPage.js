import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CustomerSearch from "../components/CustomerHeader";
import CustomerDialog from "../components/CustomerDialog";
import CustomerTable from "../components/CustomerTable";
import LinearProgress from "@material-ui/core/LinearProgress";
import { GetCustomers } from "../redux/actions/customersApi";
import {types} from "../redux/constants/action-types";
import AddIcon from "@material-ui/icons/Add";

export default function CustomerPage() {
  const customerState = useSelector((state) => state.customer);
  const [filterText, setfilterText] = useState("");
  const [apiData, setData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {fillTable();}, []);
  useEffect(() => {if(customerState.reloadTable){fillTable();}}, [customerState.reloadTable]);

  const fillTable=()=>{
    GetCustomers()
    .then((data)=>{
      setData(data.result);
      dispatch({type:types.CUSTOMER_PAGE_LOADING, payload:{loading:false, reloadTable:false}})
    })
    .catch((error)=>{console.log(error)})
  }

  const addNew=()=>{
    dispatch({type:types.CUSTOMER_MODAL_OPEN, payload:{loading:false}})
  }

  const textChanged = (e) => {
    const val = e.target.value || "";
    setfilterText(val);
  };

  return (
    <div>
      {customerState.loadingPage ? (
        <LinearProgress />
      ) : (
        <div>
          <CustomerSearch 
          textChanged={textChanged} 
          buttonClick={addNew} 
          textLabel={"Müşterilerde Ara"}
          buttonIcon={<AddIcon />}
          buttonTooltip={"Yeni Kullanıcı"}
          />
          <CustomerTable filterText={filterText} tableData={apiData} />
          <CustomerDialog open={customerState.openModal} loading={customerState.customerFormLoading}></CustomerDialog>
        </div>
      )}
    </div>
  );
}

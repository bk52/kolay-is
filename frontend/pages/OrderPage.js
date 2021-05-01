import React, { useState, useEffect} from "react";
import OrderSearch from "../components/CustomerHeader";
import AddIcon from "@material-ui/icons/Add";
import LinearProgress from "@material-ui/core/LinearProgress";
import OrderTable from "../components/OrderTable";
import NewOrderModal from "../components/OrderModal";
import {GetOrders} from "../redux/actions/ordersApi";

const OrderPage = () => {
  const [filterText, setfilterText] = useState("");
  const [apiData, setData] = useState([]);
  const [newModal, setNewModal] = useState(false);
  const [ready, setReady] = useState(false);
  const fillTable = () => { 
    GetOrders()
    .then((data)=>{
      if(data && data.result){
        setData(data.result);
      }
      setReady(true)})
    .catch((error)=>{console.log(error); setReady(true)})
  };
  const addNew = () => {setNewModal(true);};
  const onShowDetails = (_id) => { };
  const closeNewModal = () => {
    fillTable();
    setNewModal(false);
  };
  const textChanged = (e) => {
    const val = e.target.value || "";
    setfilterText(val);
  };
  useEffect(() => {
    fillTable();
  }, []);
  return (
    <div>
      {ready ? (
        <div>
          <OrderSearch
            textChanged={textChanged}
            buttonClick={addNew}
            textLabel={"Siparişlerde Ara"}
            buttonIcon={<AddIcon />}
            buttonTooltip={"Yeni Sipariş"}
          />
          <OrderTable
            filterText={filterText}
            tableData={apiData}
            onShowDetails={onShowDetails}
          />
          {newModal ? (
            <NewOrderModal
              open={true}
              handleClose={closeNewModal}
            ></NewOrderModal>
          ) : null}
        </div>
      ) : (
        <LinearProgress />
      )}
    </div>
  );
};

export default OrderPage;

import React, { useState, useEffect } from "react";
import OrderSearch from "../components/CustomerHeader";
import AddIcon from "@material-ui/icons/Add";
import LinearProgress from "@material-ui/core/LinearProgress";
import OrderTable from "../components/OrderTable";
import NewOrderModal from "../components/OrderModal";
import OrderEditModal from "../components/OrderEditModal";
import { GetOrders } from "../redux/actions/ordersApi";
import Paper from "@material-ui/core/Paper"

const OrderPage = () => {
  const [filterText, setfilterText] = useState("");
  const [apiData, setData] = useState([]);
  const [newModal, setNewModal] = useState(false);
  const [ready, setReady] = useState(false);
  const [details, setDetails] = useState({ show: false, _id: "" })
  const fillTable = () => {
    GetOrders()
      .then((data) => {
        if (data && data.result) {
          setData(data.result);
        }
        setReady(true)
      })
      .catch((error) => { console.log(error); setReady(true) })
  };
  const addNew = () => { setNewModal(true); };
  const onShowDetails = (_id) => { setDetails({ _id: _id, show: true }) };
  const closeNewModal = () => { fillTable(); setNewModal(false); };
  const closeDetailsModal = () => {fillTable(); setDetails({ show: false, _id: "" }); }
  const textChanged = (e) => {
    const val = e.target.value || "";
    setfilterText(val);
  };
  useEffect(() => {
    fillTable();
  }, []);
  return (
    <React.Fragment>
      {ready ? (
        <React.Fragment>
              <Paper style={{marginBottom: 8}}><OrderSearch textChanged={textChanged} buttonClick={addNew} textLabel={"Siparişlerde Ara"} buttonIcon={<AddIcon />} buttonTooltip={"Yeni Sipariş"}/></Paper>
              <Paper><OrderTable filterText={filterText} tableData={apiData} onShowDetails={onShowDetails}/></Paper>
          {newModal ? (
            <NewOrderModal
              open={true}
              handleClose={closeNewModal}
            ></NewOrderModal>
          ) : null}
          {details.show ? (
            <OrderEditModal
              open={true}
              orderId={details._id}
              handleClose={closeDetailsModal}
            ></OrderEditModal>
          ) : null}
        </React.Fragment>
      ) : (
        <LinearProgress />
      )}
    </React.Fragment>
  );
};

export default OrderPage;

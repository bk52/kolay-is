import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CustomerSearch from "./CustomerHeader";
import CustomerDialog from "./CustomerDialog";
import PaymentsTable from "./PaymentsTable";
import LinearProgress from "@material-ui/core/LinearProgress";
import {types} from "../redux/constants/action-types";
import AddIcon from "@material-ui/icons/Add";


export default function BalanceHistory() {
    //const customerState = useSelector((state) => state.customer);
    const details = useSelector((state) => state.customerPayments);
    const [filterText, setfilterText] = useState("");
    const dispatch = useDispatch();
      
    const addNew=()=>{
      //dispatch({type:types.CUSTOMER_MODAL_OPEN, payload:{loading:false}})
    }
  
    const textChanged = (e) => {
      const val = e.target.value || "";
      setfilterText(val);
    };
  
    return (

          <div>
            <CustomerSearch 
            textChanged={textChanged} 
            buttonClick={addNew} 
            textLabel={"Geçmişte Ara"}
            buttonIcon={<AddIcon />}
            buttonTooltip={"Yeni İşlem"}
            />
            <PaymentsTable filterText={filterText} tableData={details.paymentInfo} />
            {/* <CustomerDialog open={customerState.openModal} loading={customerState.customerFormLoading}></CustomerDialog> */}
          </div>
    );
  }
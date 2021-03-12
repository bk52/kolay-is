import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CustomerSearch from "./CustomerHeader";
import BalanceNewRecord from "./BalanceNewRecord";
import PaymentsTable from "./PaymentsTable";
import LinearProgress from "@material-ui/core/LinearProgress";
import {types} from "../redux/constants/action-types";
import AddIcon from "@material-ui/icons/Add";


export default function BalanceHistory(props) {
    const details = useSelector((state) => state.customerPayments);
    const [filterText, setfilterText] = useState("");
    const [newModal,setnewModal]=useState(false);
    const dispatch = useDispatch();
      
    console.log(details.customerInfo);
    const ChangeNewModal=(val)=>{
      setnewModal(val);
    }

    const CloseNewModal=(val)=>{
      setnewModal(false);
    }
  
    const textChanged = (e) => {
      const val = e.target.value || "";
      setfilterText(val);
    };
  
    return (

          <div>
            <CustomerSearch 
            textChanged={textChanged} 
            buttonClick={(e)=>{ChangeNewModal(true)}} 
            textLabel={"Geçmişte Ara"}
            buttonIcon={<AddIcon />}
            buttonTooltip={"Yeni İşlem"}
            />
            <PaymentsTable filterText={filterText} tableData={props.type==1 ? details.paymentInfo : details.collectionInfo} />
            <BalanceNewRecord open={newModal} title={props.type==1 ? "Yeni Tahsilat" : " Yeni Borç"} customerId={details.customerInfo._id} Close={CloseNewModal}/>
          </div>
    );
  }
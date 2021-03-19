import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CustomerSearch from "./CustomerHeader";
import BalanceNewRecord from "./BalanceNewRecord";
import BalancePaymentDetails from "./BalancePaymentDetails";
import PaymentsTable from "./PaymentsTable";
import LinearProgress from "@material-ui/core/LinearProgress";
import {types} from "../redux/constants/action-types";
import AddIcon from "@material-ui/icons/Add";


export default function BalanceHistory(props) {
    const details = useSelector((state) => state.customerPayments);
    const [filterText, setfilterText] = useState("");
    const [newModal,setnewModal]=useState(false);
    const [detailsModal,setdetailsModal]=useState({paymentId:"",visible:false});
    const dispatch = useDispatch();
      
    const ChangeNewModal=(val)=>{
      setnewModal(val);
    }

    const CloseNewModal=()=>{
      setnewModal(false);
    }

    const CloseDetailsModal=()=>{
      setdetailsModal({paymentId:"",visible:false})
    }
  
    const textChanged = (e) => {
      const val = e.target.value || "";
      setfilterText(val);
    };

    const showPaymentDetails=(_id)=>{
      setdetailsModal({paymentId:_id,visible:true})
    }
  
    return (

          <div>
            <CustomerSearch 
            textChanged={textChanged} 
            buttonClick={(e)=>{ChangeNewModal(true)}} 
            textLabel={"Geçmişte Ara"}
            buttonIcon={<AddIcon />}
            buttonTooltip={"Yeni İşlem"}
            />
            <PaymentsTable filterText={filterText} tableData={props.type==1 ? details.paymentInfo : details.collectionInfo} detailsClick={showPaymentDetails}/>
            <BalanceNewRecord open={newModal} title={props.type==1 ? "Yeni Tahsilat" : " Yeni Borç"} customerId={details.customerInfo._id} Close={CloseNewModal}/>
            <BalancePaymentDetails paymentId={detailsModal.paymentId} open={detailsModal.visible} Close={CloseDetailsModal}/>
          </div>
    );
  }
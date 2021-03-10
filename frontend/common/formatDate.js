export default function formatDate(val){
    let formatted=["",""];
    try{
        if(val && val!=""){
            let dt= new Date(val);
            let _date=dt.getDate() + "/" +  (dt.getMonth()+1) + "/" + dt.getFullYear();
            let _time=dt.getHours().toString().padStart(2,'0') + ":" +  (dt.getMinutes()+1).toString().padStart(2,'0')+ ":" + dt.getSeconds().toString().padStart(2,'0');
            formatted=[_date,_time];
        }
        return formatted;
    }
    catch(e){
        return formatted;
    }
}
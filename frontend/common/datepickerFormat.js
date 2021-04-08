export default function(value) {
    let dt= new Date(value);
    let _date=dt.getFullYear() + "-" +  (dt.getMonth()+1).toString().padStart(2,'0') + "-" + dt.getDate().toString().padStart(2,'0') ;
    return _date;
};
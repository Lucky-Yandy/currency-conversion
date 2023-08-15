//import React from 'react';
import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import './PickTheDate.css';
function  PickTheDate( props){
   const [startDate, setStartDate] = useState(new Date());
   
   function handleDateChange (date){
      if (startDate !== null){
              const dateNumber = date.getDate();
	      const tdate = String(dateNumber).padStart(2, '0');
	      //console.log(date);

	      const monthNumber = date.getMonth() + 1;
	      const month = String(monthNumber).padStart(2, '0');
	      //console.log(month);

	      const yearNumber = date.getFullYear();
	      const year = String(yearNumber);
	      //console.log(year);

	      const getThedate = yearNumber + '-' + month + '-' + tdate;
	      //console.log(getThedate);
	      
	      props.handleDateChange (getThedate);     
	      	      
    }
  };
  
  
  
  
  return(

           <div className="boxfordateAndAmount">                       
		 <p>Enter The Date</p>
		 <DatePicker selected={startDate} onChange={(date) => {setStartDate(date);handleDateChange(date); console.log(date);}}/>
	      </div>

);
}
export default PickTheDate;

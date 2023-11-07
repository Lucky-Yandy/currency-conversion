import React, { useState, useEffect } from 'react';

import "react-datepicker/dist/react-datepicker.css";
import SelectedCurrency from './components/SelectedCurrency/SelectedCurrency.js';
import  PickTheDate from './components/PickTheDate/PickTheDate.js';
import './App.css';

const Base_url = `https://api.exchangeratesapi.io/v1/latest?access_key=f51e62a0904587b5cef0c6c402054e44`
function App() {	 
	  const [inputAmount, setInputAmount] = useState('1');
	  const [result, setResult]=useState();               
          const [formattedDate, setFormattedDate] = useState(''); 
          const [currencyOptions, setCurrencyOptions] = useState([]);        
          const[selectedLeftOption,setSelectedLeftOption]= useState('EUR');//need to use this
          const[selectedRightOption,setSelectedRightOption]= useState('EUR');//need to use this
          const[rates,setRates]=useState(null);
          function getData(){
            fetch(Base_url)
	      .then((response) => response.json())
	      .then((data) => {
	                console.log(data);
			setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
			data.rates[data.base] = 1;
			setRates(data.rates);
               });
                
          }
          useEffect(getData, []);  
        
            
          
	  return (
	     <div className="backgroundcolor"> 
		  <div className="currencyapp">
		      <h2>Currency Converter</h2>
		       <PickTheDate handleDateChange={date=>setFormattedDate(date)}/>
		       <div className="boxfordateAndAmount">                        
			 <p>Enter Amount</p>
			 <input type="text" 
		            className="InputBox"
		            value={inputAmount}
		            onChange={e =>setInputAmount(e.target.value)} 
		            />
		      </div>		      
		      <div className="getcurrency" >                           
			 <div className="boxforcoverter" id="boxFrom">
			   <p> From</p>
			    <SelectedCurrency  currencyOptions={currencyOptions}          selectedCurrency={selectedLeftOption}
onChangeCurrency={e =>setSelectedLeftOption(e.target.value)}/>
			  </div>
			 <p className="imgsize"></p>	                 
			 <div className="boxforcoverter" id="boxTo">
			   <p> To</p>
			    <SelectedCurrency  currencyOptions={currencyOptions}                         selectedCurrency={selectedRightOption}
		onChangeCurrency={e =>setSelectedRightOption(e.target.value)}
			                       />
			 </div>
			 
		    </div>
		    
		    <div className="resultdisplay">
		    <p className="InputBox">  {inputAmount} {selectedLeftOption} = {" "}
		          {rates ?
		          (rates[selectedRightOption]/rates[selectedLeftOption]*inputAmount).toFixed(2)
		           :null} {selectedRightOption}
		    </p>  
		    </div>      
		              
	       </div>
	     </div>
	    
	  );
}


export default App;





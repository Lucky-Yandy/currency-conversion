import React, { useState, useEffect } from 'react';
//import DatePicker from 'react-date-picker';
//import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SelectedCurrency from './components/SelectedCurrency/SelectedCurrency.js';
import  PickTheDate from './components/PickTheDate/PickTheDate.js';
import './App.css';
import   img  from "./images/3580097.png";
//import data from './currencyrates.json';


function App() {	 
	  const [inputValue, setInputValue] = useState(''); 
	  const [theLeftCurrency, settheLeftCurrency] = useState('');
	  const [theRightCurrency, settheRightCurrency] = useState(''); 
	  const [result, setResult]=useState();       
          const [getThedate, setGetThedate]=useState();  
          const [formattedDate, setFormattedDate] = useState(''); //need to use this 
          const[selectedLeftSymbol,setSelectedLeftSymbol]= useState('');//need to use this
          const[selectedRightSymbol,setSelectedRightSymbol]= useState('');//need to use this
          const [finalResult, setFinalResult] = useState("");
          
          const handleAppLevelDateChange = (date) => {
               setFormattedDate(date);
               
            };
          
          useEffect(() => {
    
             console.log('formattedDate has changed:', formattedDate);
    
             }, [formattedDate]);
 
          
          
          
	  function handleInputChange(ev) {
	     console.log("event", ev);
	     setInputValue(ev.target.value); 
	   }
	  useEffect(() => {
	    console.log(inputValue);
	  }, [inputValue]);
	  
	  
	  function handleLeftChange(newValue,selectedSymbol){
	    settheLeftCurrency(newValue);
	    console.log("get left value",newValue);
	    setSelectedLeftSymbol(selectedSymbol);
           
	  };
	  
	  function handleRightChange(newValue,selectedSymbol){
	    settheRightCurrency(newValue);
	    console.log("get right value",newValue);
	    setSelectedRightSymbol(selectedSymbol);
          
	    
	  };
	  useEffect(() => {
               console.log("get left symbol", selectedLeftSymbol);
                }, [selectedLeftSymbol]);

          useEffect(() => {
          console.log("get right symbol", selectedRightSymbol);
          }, [selectedRightSymbol]);
	 
	  
	  function exchangeThePosition() {
             settheLeftCurrency(theRightCurrency);
             settheRightCurrency(theLeftCurrency);
             
         
          };
	         
        
    
	 
	  function fetchTheCurrencyData() {
	     fetch('http://api.exchangeratesapi.io/v1/latest?access_key=70aa05c4b4b42702473a6cca6aba8a6b')
	        .then(response => response.json())
                .then(data =>{
                                  
                     if(selectedLeftSymbol in data.rates && selectedRightSymbol in data.rates && data.date === formattedDate ){ 
                       if(data.base===selectedLeftSymbol){
                          let resultForNow = (inputValue*data.rates[selectedRightSymbol]).toFixed(2);
                          setResult(`${inputValue} ${selectedLeftSymbol} = ${resultForNow} ${selectedRightSymbol}`);
                          
                        }else{
                           setResult ( <p style={{ color: "red", fontSize: "3px", marginTop: "10px" }}>*In this app, due to the usage of a free API, there are certain limitations. As of now, you can only select today's date as the input date and EUR asthe base currency. </p>
                                    );
                           
                          
                       }
                          
                     }else{
                          setResult ( <p style={{ color: "red", fontSize: "3px", marginTop: "10px" }}>*In this app, due to the usage of a free API, there are certain limitations. As of now, you can only select today's date as the input date and EUR asthe base currency. </p>
                                    );
                           
                          
                       }
                                             })
	    }

	     
	 
	  return (
	     <div className="backgroundcolor"> 
		  <div className="currencyapp">
		      <h1>Currency Converter</h1>
		       <PickTheDate handleDateChange={handleAppLevelDateChange}/>
		       <div className="boxfordateAndAmount">                        
			 <p>Enter Amount</p>
			 <input type="text" 
		            className="InputBox"
		            value={inputValue} 
		            onChange={handleInputChange} 
		             />
		      </div>		      
		      <div className="getcurrency" >                           
			 <div className="boxforcoverter" id="boxFrom">
			   <p> From</p>
			   <SelectedCurrency  value={theLeftCurrency} SelectedCurrency={handleLeftChange}/>
			 </div>
			 <img className="imgsize" src={img} onClick={exchangeThePosition} />	                 
			 <div className="boxforcoverter" id="boxTo">
			   <p> To</p>
			   <SelectedCurrency value={theRightCurrency}  SelectedCurrency={handleRightChange} />
			 </div>
			 
		    </div>
		    
		    <div className="resultdisplay">
		    <p >{result} </p>  
		    </div>      
		    <button onClick={fetchTheCurrencyData}>Convert </button>              
	       </div>
	     </div>
	    
	  );
}


export default App;




/* console.log(data);
                     console.log(data.base);
                     console.log(data.date);  
                     for (let item in data.rates){
                        console.log(item);
                        console.log(data.rates[item])
                     }  */




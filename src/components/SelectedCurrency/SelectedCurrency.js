//import React from 'react';
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import './SelectedCurrency.css';

function  SelectedCurrency( props){
  
  const{ currencyOptions, 
        selectedCurrency,
        onChangeCurrency
  }=props
  
  
  return(
	  <div className="boxforcoverter">  
	    <select value ={selectedCurrency} onChange={onChangeCurrency} className="selectBox">     
                   {currencyOptions.map((option, index) =>(   
                          <option key ={index} value={option}> {option}</option>              
                       ))}
               
                </select> 
            </div>          

);
}
export default  SelectedCurrency;






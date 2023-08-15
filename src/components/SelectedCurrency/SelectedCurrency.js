//import React from 'react';
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import './SelectedCurrency.css';

function  SelectedCurrency( props){
   const [countries, setCountries] = useState([]);
   const [selectedSymbol,setSelectedSymbol]=useState([]);
   useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
         setCountries(data);
         console.log(countries);
      })
      .catch(error => console.log(error));
            
   }, []);
 
  const countryOptions = countries.map(country => ({
    value: country.name.common,
    label: (
      <div className="boxforcoverter" >
        {country.flags && country.flags.png && (
          <img className="theImgSize" src={country.flags.png} alt={country.name.common} />
        )}
        {country.currencies  ? (
        <span >  {Object.keys(country.currencies)[0]}  </span>
      ) : null}
        {/*<span>{country.name.common}</span>*/}
      </div>
    )
   
  }));
  
  function SelectedCurrency(selectedOption,selectedSymbol) {
     selectedSymbol = selectedOption.label.props.children[1].props.children[1];
     //console.log(selectedSymbol); 
     props.SelectedCurrency(selectedOption,selectedSymbol);    
   } 
   
   
   
  return(
	  <div className="boxforcoverter">               
               <Select options={countryOptions}    
                       value={props.value}  
                       onChange={SelectedCurrency} />         
            </div>

);
}
export default  SelectedCurrency;

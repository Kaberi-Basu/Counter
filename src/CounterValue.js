import React from 'react';
import './App.css';

function CounterValue (props) {
  return(
    <div className="Display-value">
      Counter value : {props.value}
    </div>
  )
}
export default CounterValue;
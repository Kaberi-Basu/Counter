import React, { useEffect, useState } from 'react';
import './App.css';
import CounterValue from './CounterValue';

function App(props) {
  const [counterValue, setCounterValue] = useState([]);
  const [isLoaderVisible, toggleLoader] = useState([]);
  useEffect(() => {
    setCounterValue(props.value);
    toggleLoader(false);
  }, []);
  const onIncrement = async() => {
    if (counterValue < props.maxValue) {
      const currentValue = counterValue + 1;
      toggleLoader(true);
      await new Promise((resolve) => setTimeout(() => {
        setCounterValue(currentValue);
        resolve();
      }, 1000));
      toggleLoader(false);
    }
  }
  const onDecrement = async() => {
    if (counterValue > 0) {
      const currentValue = counterValue - 1;
      toggleLoader(true);
      await new Promise((resolve) => setTimeout(() => {
        setCounterValue(currentValue);
        resolve();
      }, 1000));
      toggleLoader(false);
    }
  }
  const onInputChange = async(e) => {
    if(e.target.value <= props.maxValue && e.target.value >= 0) {
      toggleLoader(true);
      await new Promise((resolve) => {
        const value = e.target.value;
        console.log(value);
        setTimeout(function() {
          setCounterValue(Number(value));
          resolve();
        }, 1000);
      });
      toggleLoader(false);
    }
  }
  return (
    <div className="App">
      <div className="App-header">
        {isLoaderVisible &&
          <div className="Loading">
            <div className="RoundLoader"></div>
            <div>Saving counter value</div>
          </div>
        }
        <div className="Counter-container">
          <button className="Decrement-button" onClick={() => onDecrement()}> - </button>
          <span className="Counter-text"> <input className="InputField" type="text" value={counterValue} onChange={(e) => onInputChange(e)}/></span>
          <button className="Increment-button" onClick={() => onIncrement()}> + </button>
        </div>
        <CounterValue value={counterValue}/>
      </div>
    </div>
  );
}
App.defaultProps = {
  value: 1,
  maxValue: 1000
};

export default App;

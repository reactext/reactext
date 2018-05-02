import React from 'react';
import InitialState from '.././InitialState.jsx';

const LogContainer = props => {
    console.log('props in LC', props)
    return(
      <div className="LogContainer">
        <h4>This is the log container.</h4>
        <InitialState initState={props.initState}/>
      </div>
    );
  };
  
  export default LogContainer;
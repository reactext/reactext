import React from 'react';
import InitialState from '.././InitialState.jsx';
import StateChanges from '.././StateChanges.jsx';


const LogContainer = props => {
    console.log('props in LC', props)
    return(
      <div className="LogContainer" style={{backgroundColor:'orange'}}>
        <h4>This is the log container.</h4>
        <InitialState initialState={props.initState}/>
        <StateChanges stateChangesList={props.stateChangesList} />
      </div>
    );
  };
  
  export default LogContainer;
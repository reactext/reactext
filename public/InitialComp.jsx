import React from 'react';

const InitialComp = (props) => {
  console.log('propppsss in init comp', props)
  return (
  <div className="InitialComp">
    <h4> {props.compInfo[0]} : {JSON.stringify(props.compInfo[1])}</h4>

    
  </div>


  );
}

export default InitialComp;
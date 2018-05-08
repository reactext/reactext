import React from 'react';
import Visual from '.././Visual.jsx';

const VisContainer = props => {
    // console.log('props in VC', props)
    return(
      <div className="VisContainer" style={{backgroundColor:'blue'}}>
        <Visual/>
      </div>
    );
  };

  export default VisContainer;
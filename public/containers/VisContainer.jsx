import React from 'react';
import NavBar from '.././NavBar.jsx';
import Visual from '.././Visual.jsx';

const VisContainer = props => {
    // console.log('props in VC', props)
    return(
      <div className="VisContainer" style={{backgroundColor:'blue'}}>
        <NavBar />
        <Visual/>
      </div>
    );
  };

  export default VisContainer;
import React from 'react';
import NavBar from '.././NavBar.jsx';
import Visual from '.././Visual.jsx';

const VisContainer = props => {
    console.log('props in CC', props)
    return(
      <div className="VisContainer">
        <h4>This is the vis container.</h4>
        <NavBar />
        <Visual/>
      </div>
    );
  };

  export default VisContainer;
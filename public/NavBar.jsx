import React, { Component } from 'react';

class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('immmmmmmmm PROPSSSS innnnnnn appp.jsx', this.props)
    return (
      <div className='navBar'>
        <div className='button activeButton' id='initial' onClick={()=>this.props.onClick('initial')}>Initial State</div>
        <div className='button' id='log' onClick={()=>this.props.onClick('log')}>Log</div>
        <div className='button' id='provider' onClick={()=>this.props.onClick('provider')}>Provider</div>
        <div className='button' id='consumer' onClick={()=>this.props.onClick('consumer')}>Consumer</div>
      </div>
    );
  }
}

export default NavBar;
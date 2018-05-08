import React, { Component } from 'react';

class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('immmmmmmmm PROPSSSS innnnnnn appp.jsx', this.props)
    return (
      <div className='navBar' style={{ backgroundColor: 'lightBlue' }}>
        <h3>NavBar</h3>
        <button id='initial' onClick={()=>this.props.onClick('initial')}>Initial State</button>
        <button id='log' onClick={()=>this.props.onClick('log')}>Log</button>
        <button id='provider' onClick={()=>this.props.onClick('provider')}>Provider</button>
        <button id='consumer' onClick={()=>this.props.onClick('consumer')}>Consumer</button>
      </div>
    );
  }
}

export default NavBar;
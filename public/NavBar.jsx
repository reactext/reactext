import React, { Component } from 'react';

class NavBar extends Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      console.log('immmmmmmmm PROPSSSS innnnnnn appp.jsx', this.props)
      return (
        <div>
          <h3>NavBar</h3>
        </div>
      );
    }
  }
  
  export default NavBar;
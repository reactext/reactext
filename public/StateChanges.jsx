import React, { Component } from 'react';

class StateChanges extends Component {
    constructor(props) {
      super(props);
    }
  
    render() {
      console.log('innnnnnn StateChanges', this.props)
      return (
        <div style={{backgroundColor: 'pink'}}>
          <h3>Log state Changes hereeeee</h3>
        </div>
      );
    }
  }
  
  export default StateChanges;
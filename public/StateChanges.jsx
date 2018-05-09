import React, { Component } from 'react';
import StateChangesEl from './StateChangeEl.jsx'

class StateChanges extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let changes = [];
    for (let i = 0; i < this.props.stateChangesList.length; i++) {
      changes.push(<StateChangesEl key={i} stateInfo={this.props.stateChangesList[i]} />);
    }

    return (
      <div id='stateChanges'>
        <h3>Changes to state log below:</h3>
        <div>{changes}</div>
      </div >
    );
  }
}

export default StateChanges;
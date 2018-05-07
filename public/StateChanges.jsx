import React, { Component } from 'react';
import StateChangesEl from './StateChangeEl.jsx'

class StateChanges extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('props in stateChangessssss', this.props)
    let changes = [];
    for (let i = 0; i < this.props.stateChangesList.length; i++) {
      changes.push(<StateChangesEl key={i} stateInfo={this.props.stateChangesList[i]}/>);
    }
    return (
      <div style={{ backgroundColor: 'pink' }}>
        <h3>Log state Changes hereeeee</h3>
        <div>{changes}</div>
      </div>
    );
  }
}

export default StateChanges;
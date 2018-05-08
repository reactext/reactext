import React, { Component } from 'react';
import InitialState from '.././InitialState.jsx';
import StateChanges from '.././StateChanges.jsx';
import ProviderPanel from '.././ProviderPanel.jsx';
import ConsumerPanel from '.././ConsumerPanel.jsx';

class LogContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'initialState'
    }
    this.userPage = this.userPage.bind(this)
  }

  userPage () {
    if (this.state.page === 'initialState') {
      return (
        <InitialState initialState={this.props.initState} />
      );
    }
  }

  render() {
    return (
      <div className="LogContainer" style={{ backgroundColor: 'orange' }}>
        {this.userPage()}
    </div>
  )}
};


export default LogContainer;
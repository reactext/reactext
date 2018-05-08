import React, { Component } from 'react';
// import VisContainer from './containers/VisContainer.jsx';
// import LogContainer from './containers/LogContainer.jsx';
import InitialState from './InitialState.jsx';
import StateChanges from './StateChanges.jsx';
import ProviderPanel from './ProviderPanel.jsx';
import ConsumerPanel from './ConsumerPanel.jsx';
import NavBar from './NavBar.jsx'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // initialState: '',
      page : 'initialState',
    };
    this.userPage = this.userPage.bind(this);
  }

  userPage () {
    if (this.state.page === 'initialState') {
      return (
        <InitialState initialState={this.props.initState} />
      );
    }
    if (this.state.page === 'stateChanges') {
      return (
        <StateChanges stateChangesList={this.props.stateChanges} />
      );
    }
  }

  render() {
    console.log('INSIDEDEEEE render', this.props)
    return (
      <div>
        <h4>Reactext</h4>
        <NavBar />
        {this.userPage()}
      </div>
    );
  }
}

export default App;
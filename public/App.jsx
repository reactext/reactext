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
      page: 'initialState',
    };
    this.userPage = this.userPage.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  userPage() {
    let view = {
      initial: <InitialState initialState={this.props.initState} />,
      log: <StateChanges stateChangesList={this.props.stateChanges} />,
      provider: < ProviderPanel />,
      consumer: <ConsumerPanel />,
    }
    return view[this.state.page];
  }

  onClick(view) {
    let page = view;
    this.setState({ ...this.state, page })
  }

  render() {
    console.log('INSIDEDEEEE render', this.props)
    return (
      <div>
        <h4>Reactext</h4>
        <NavBar onClick={this.onClick} />
        {this.userPage()}
      </div>
    );
  }
}

export default App;
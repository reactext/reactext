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
      page: 'initial',
    };
    this.userPage = this.userPage.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  userPage() {
    let view = {
      initial: <InitialState initialState={this.props.initState} />,
      log: <StateChanges stateChangesList={this.props.stateChanges} />,
      provider: < ProviderPanel initialState={this.props.initState} />,
      consumer: <ConsumerPanel initialState={this.props.initState} />,
    }
    return view[this.state.page];
  }

  onClick(view) {
    document.getElementById('initial').classList.remove('activeButton');
    document.getElementById('log').classList.remove('activeButton');
    document.getElementById('provider').classList.remove('activeButton');
    document.getElementById('consumer').classList.remove('activeButton');

    document.getElementById(view).classList.add('activeButton');

    let page = view;
    this.setState({ ...this.state, page })
  }

  render() {
    // console.log('INSIDEDEEEE render', this.props)
    return (
      <div>
        <NavBar onClick={this.onClick} />
        {this.userPage()}
      </div>
    );
  }
}

export default App;
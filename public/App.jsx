import React, { Component } from 'react';
import VisContainer from './containers/VisContainer.jsx';
import LogContainer from './containers/LogContainer.jsx';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('immmmmmmmm PROPSSSS innnnnnn appp.jsx', this.props)
    return (
      <div>
        <h1>Reactext</h1>
        <VisContainer />
        <LogContainer initState ={this.props.initState} />
      </div>
    );
  }
}

export default App;
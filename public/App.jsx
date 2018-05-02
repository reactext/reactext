import React, { Component } from 'react';
import State from './State.jsx';


class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('immmmmmmmm PROPSSSS innnnnnn appp.jsx', this.props)
 
    return (
      <div>
        <h1>Reactext</h1>
        <State initState ={this.props.initState} />
      </div>
    );
  }
}

export default App;
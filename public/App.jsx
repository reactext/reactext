import React, { Component } from 'react';
import Log from './Log.jsx';


class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('immmmmmmmm PROPSSSS innnnnnn appp.jsx', this.props)
 
    return (
      <div>
        <h1>Reactext</h1>
        <Log initState ={this.props.initState} />
      </div>
    );
  }
}

export default App;
import React, { Component } from 'react';
import State from './State.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    // this.initState = this.initState.bind(this);
  }

  // initState() {
  //   let initialState;
  //   chrome.runtime.onConnect.addListener(port => {
  //     console.log(port, '<-- im the port');
  //     //listens for post Message on port (i.e. devtools.js)
  //     port.onMessage.addListener(msg => {
  //       if (msg.name === 'sendData') {
  //         // Received message from devtools. Do something:
  //         console.log('Received message from INDEXXXXXXX page', msg);
  //         initialState = msg.data;
  //         console.log(initialState, '<------ im initial stateeeee')
  //       }
  //     });
  //   });
  // }

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
import React, { Component } from 'react';
import VisContainer from './containers/VisContainer.jsx';
import LogContainer from './containers/LogContainer.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialState : '',
      stateChangesList: [],
    };
  }

  saveInitialState(prop) {
    console.log('innnnnnn saveIS function', prop)
    if (typeof this.state.initialState === 'string') {
      let initialState = prop;
      console.log('initialState', initialState)
      this.setState({ initialState })
    }
    console.log('updatedState', this.state.initialState)
    // let stringPage = JSON.stringify(this.props.stateChanges);
    // console.log(stringPage, '<-----------STRINGPAGE')
  }

  componentDidMount(){
    this.saveInitialState(this.props.initState.data);
  }

  // saveStateChanges(prop) {
  //   console.log('innnnnnn SaveStateChanges function', prop)
  //   if (typeof prop !== 'string') {
  //     let oldSC = prop;
  //     console.log(oldSC, '<-----------oldSC')
  //     let stateChangesList = oldSC.push(page);
  //     this.setState({ stateChangesList })
  //   }
  //   // let stringPage = JSON.stringify(this.props.stateChanges);
  //   // console.log(stringPage, '<-----------STRINGPAGE')
  // }

  render() {
    console.log('immmmmmmmm PROPSSSS innnnnnn appp.jsx', this.props)
    return (
      <div>
        <h4>Reactext</h4>
        <VisContainer />
        <LogContainer initState ={this.state.initialState} stateChangesList ={this.state.stateChangesList} />
      </div>
    );
  }
}

export default App;
import React, { Component } from 'react';
import VisContainer from './containers/VisContainer.jsx';
import LogContainer from './containers/LogContainer.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialState: '',
      // stateChangesList: [],
    };
  }

  saveInitialState(prop) {
    console.log('initial state CHECKKKKK', this.state.initialState)

    if (typeof this.state.initialState === 'string') {
      let initialState = prop;
      this.setState({ initialState })
    }
    console.log('initial state CHECKKKKK AFTERRR', this.state.initialState)

  }

  // saveStateChanges(prop) {
  //   console.log('innnnnnn SaveStateChanges function', prop)
  //   console.log('innnnnnn SaveStateChanges JSON', JSON.stringify(prop))

  //   let oldSC = this.state.stateChangesList;
  //   console.log(oldSC, '<-----------oldSC')
  //   // let stateChangesList = oldSC.push();
  //   // this.setState({ stateChangesList })
  // }

  componentDidMount() {
    console.log(this.props.initState, '<------ initState inside component didMount')

    this.saveInitialState(this.props.initState.data);
    // console.log(this.props.stateChanges, '<------ inside component didMount')
    // this.saveStateChanges(this.props.stateChanges)
  }

  render() {
    console.log('immmmmmmmm PROPSSSS innnnnnn APPPPPP.jsx', this.props)
    return (
      <div>
        <h4>Reactext</h4>
        <VisContainer />
        <LogContainer initState={this.state.initialState} stateChangesList={this.props.stateChanges} />
      </div>
    );
  }
}

export default App;
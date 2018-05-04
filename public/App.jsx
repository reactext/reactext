import React, { Component } from 'react';
import VisContainer from './containers/VisContainer.jsx';
import LogContainer from './containers/LogContainer.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialState: '',
    };
  }

  saveInitialState(prop) {
    if (typeof this.state.initialState === 'string') {
      let initialState = prop;
      this.setState({ initialState })
    }
  }

  componentDidMount() {
    console.log(this.props, '<------ initState inside component didMount')
    this.saveInitialState(this.props.initState.data);
  }

  render() {
    console.log('INSIDEDEEEE render', this.props)
    return (
      <div>
        <h4>Reactext</h4>
        <VisContainer />
        <LogContainer initState={this.props.initState} stateChangesList={this.props.stateChanges} />
      </div>
    );
  }
}

export default App;
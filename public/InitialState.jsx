import React, { Component } from 'react';
import InitialComp from './InitialComp.jsx';

class InitialState extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('props in initial state', this.props)
    let initialStateComp = [];
    let stateObj = this.props.initialState;
    let comp = Object.entries(stateObj);
    for (let i = 0; i < comp.length; i++) {
        initialStateComp.push(<InitialComp key={i} compInfo={comp[i]} />)
    }
    return (
      <div id='initialState'>
        <div id='hierarchy'>{initialStateComp}</div>
        <div id='statePannel'></div>
      </div>
    );
  }
};

export default InitialState;


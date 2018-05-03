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
    console.log('comp', comp)
    for (let i = 0; i < comp.length; i++) {
      //take out h3, img, div, etc from intitial state
      if (comp[i][1].state !== null || Object.keys(comp[i][1]).length !== 1) {
        initialStateComp.push(<InitialComp key={i} compInfo={comp[i]} />)
      }
    }
    return (
      <div className='initialState'>{initialStateComp}</div>
    );
  }
};

export default InitialState;


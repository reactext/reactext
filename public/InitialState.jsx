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
    let compNames = Object.entries(stateObj);
    for(let i = 0; i < compNames.length; i++){
      initialStateComp.push(<InitialComp key={i} compInfo={compNames[i]} />);
    }

    return (
      <div className='initialState'>{initialStateComp}</div>
    );
  }
}

export default InitialState;
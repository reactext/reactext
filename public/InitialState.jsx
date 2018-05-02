import React, { Component } from 'react';

class InitialState extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('PROPPPSSS In log', this.props)
    let page = this.props.initState.data;
    let stringPage = JSON.stringify(page)
    console.log('stringggggg page', stringPage)
    return (
      <div className='initialState'>{stringPage}</div>
    );
  }
}

export default InitialState;
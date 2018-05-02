import React, { Component } from 'react';

class State extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('PROPPPSSS In State', this.props)
    let page = this.props.initState.data;
    let stringPage = JSON.stringify(page)
    console.log('stringggggg page', stringPage)
    return (
      <div>{stringPage}</div>
    );
  }
}

export default State;
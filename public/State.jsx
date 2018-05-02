import React, { Component } from 'react';

class State extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('PROPPPSSS In State', this.props)
    let page = this.props.initState.data;
    let stringPage = JSON.stringify(page)
    return (
      <div>{this.props.initState.data}</div>
    );
  }
}

export default State;
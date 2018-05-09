import React, { Component } from 'react';

class InitialComp extends Component {

  constructor(props) {
    super(props);


    this.stateStuff = {};
    this.handleClick = this.handleClick.bind(this);


  }

  handleClick(e) {
    //get state in here !
    if(!this.stateStuff[e.target.id]){
      document.getElementById('statePannel').innerHTML = '';
    }else if(e.target.className === 'componentName'){
      document.getElementById('statePannel').innerHTML = this.stateStuff[e.target.id];
    }
  }

  render() {
    let objectsInComp = this.props.compInfo[1];
    let keysOfObjectsInComp = Object.keys(this.props.compInfo[1]);
    let childrenLine = [];

    //STATE
    if (objectsInComp.state) {
      //create pretty state
      let stateKeys = Object.keys(objectsInComp.state)
      //build the string
      if(this.props.compInfo[0]){

        let tempStr = `<div class='stateDiv'> <h3 class='componentStateName'>${this.props.compInfo[0]}</h3><ul class='stateUl'>`;
        stateKeys.forEach(propName => {
          tempStr+=`<li>${propName}: ${objectsInComp.state[propName]}</li>`
        });
        tempStr +=`</ul></div>`
        console.log(tempStr, 'im the temp string before adding');
        //add string to stateStuff for later reference
        this.stateStuff[this.props.compInfo[0]] = tempStr;
      }
    }

    //CHILDREN
    if (objectsInComp.children) {
      let tempArr = []
      objectsInComp.children.forEach((x, i) => {
        tempArr.push(<li key={i} >{objectsInComp.children[i]}</li>)
      })
      if (tempArr.length === 0) {
        tempArr.push(<li>None</li>)
      }
      childrenLine.push(<div className='childrenDiv' >CHILDREN: <ul>{tempArr}</ul></div>)
    }

    return (
      <div onClick={this.handleClick} className="initialComp" >
        <h4 className='componentName'id={this.props.compInfo[0]}> {this.props.compInfo[0]} </h4>
        <ul>
          {childrenLine}
        </ul>
      </div>
    );
  }
}

export default InitialComp;










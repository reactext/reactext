import React, { Component } from 'react';

class InitialComp extends Component {

  constructor(props) {
    super(props);


    this.stateStuff = {};
    this.handleClick = this.handleClick.bind(this);


  }

  handleClick(e) {
    //get state in here !
    if(e.target.className === 'componentName'){
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
      let tempStr = `<div class='stateDiv'> <h3 class='componentStateName'>${this.props.compInfo[0]}</h3><ul class='stateUl'>`;
      stateKeys.forEach(propName => {
        tempStr+=`<li>${propName}: ${objectsInComp.state[propName]}</li>`
      });
      tempStr +=`</ul></div>`
      console.log(tempStr, 'im the temp string before adding');
      //add string to stateStuff for later reference
      this.stateStuff[this.props.compInfo[0]] = tempStr;
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



















     // stateKeys.forEach((x) => {
      //   if (Array.isArray(objectsInComp.state[x]) && objectsInComp.state[x].length === 0) {
      //     tempArr.push(<li>{x + " : ' '"}</li>)
      //   } else if (typeof objectsInComp.state[x] === 'string' && objectsInComp.state[x].length === 0) {
      //     tempArr.push(<li>{x + " : [ ]"}</li>)
      //   } else {
      //     tempArr.push(<li>{x + " : " + objectsInComp.state[x]}</li>)
      //   }
      // })
      // // stateLine.push(<div>STATE:  <ul>{tempArr}</ul></div>)
      // this.stateStuff.push(tempArr);
      // console.log(this.stateStuff, 'this.stateStuff line 58')















  // let providerLine = [];
    // let consumerLine = [];
    // let contextLine = [];
    // let contextUsedLine = [];
    // let activeProvider = [];


// if (objectsInComp.provider) {
//   providerLine.push(<div>PROVIDER: <ul>True</ul></div>)
// }
// if (objectsInComp.consumer) {
//   consumerLine.push(<div>CONSUMER: <ul>True</ul></div>)
// }

// if(objectsInComp.contextValue){
//   if(typeof objectsInComp.contextValue === "string"){
//       contextLine.push(<div>CONTEXT: <ul>{objectsInComp.contextValue}</ul></div>)
//   } else {
//       let tempArr = []
//       let contextKeys = Object.keys(objectsInComp.contextValue)
//       contextKeys.forEach((x)=>{
//         if(typeof objectsInComp.contextValue[x] === 'object' && !Array.isArray(objectsInComp.contextValue[x])){
//           let nestedTemp = [];
//           let nestedContextObj = objectsInComp.contextValue[x]
//           let nestedContextKeys = Object.keys(nestedContextObj)
//           nestedContextKeys.forEach((cu)=>{
//             nestedTemp.push(<li>{cu + " : " + nestedContextObj[cu]}</li>)
//           })
//           tempArr.push(<li>{x}</li>)
//           tempArr.push(<ul>{nestedTemp}</ul>)
//         } else {
//           tempArr.push(<li>{x + " : " + objectsInComp.contextValue[x]}</li>)
//         }
//       })
//       contextLine.push(<div>CONTEXT: <ul>{tempArr}</ul></div>)

//   }
// }

// if(objectsInComp.Consumer_Context_Used){
//   let tempArr = [];
//   let unique_Context_Used = new Set(objectsInComp.Consumer_Context_Used);
//   unique_Context_Used.forEach((x,i) => {
//     let item = x.slice(0, -1);
//     tempArr.push(<li key={i} >{item}</li>);
//   });
//   contextUsedLine.push(<div >Context Used: <ul>{tempArr}</ul></div>)
// }

// if(objectsInComp.Active_Provider){
//   let tempArr = [];
//   objectsInComp.Active_Provider.forEach((x,i) => {
//     tempArr.push(<li key={i} >{x}</li>);
//   });
//   contextUsedLine.push(<div >Active Provider(s): <ul>{tempArr}</ul></div>)
// }


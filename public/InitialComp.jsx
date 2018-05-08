import React from 'react';

const InitialComp = (props) => {
  let objectsInComp = props.compInfo[1]
  let keysOfObjectsInComp = Object.keys(props.compInfo[1]);

  let stateLine = [];
  let childrenLine = [];
  let providerLine = [];
  let consumerLine = [];
  let contextLine = [];
  let contextUsedLine = [];
  let activeProvider = [];

  if (objectsInComp.state) {
    let tempArr = []
    let stateKeys = Object.keys(objectsInComp.state)
    stateKeys.forEach((x)=>{
        if(Array.isArray(objectsInComp.state[x]) && objectsInComp.state[x].length === 0){
          tempArr.push(<li>{x + " : ' '" }</li>)
        } else if (typeof objectsInComp.state[x] === 'string' && objectsInComp.state[x].length === 0) {
          tempArr.push(<li>{x + " : [ ]"}</li>)
        } else {
          tempArr.push(<li>{x + " : " + objectsInComp.state[x]}</li>)
        }
    })
    stateLine.push(<div>STATE:  <ul>{tempArr}</ul></div>)
  }
  if (objectsInComp.children) {
    let tempArr = []
    objectsInComp.children.forEach((x,i)=>{
      tempArr.push(<li key={i} >{objectsInComp.children[i]}</li>)
    })
    if (tempArr.length === 0) {
      tempArr.push(<li>None</li>)
    }
    childrenLine.push(<div>CHILDREN: <ul>{tempArr}</ul></div>)
  }
  if (objectsInComp.provider) {
    providerLine.push(<div>PROVIDER: <ul>True</ul></div>)
  }
  if (objectsInComp.consumer) {
    consumerLine.push(<div>CONSUMER: <ul>True</ul></div>)
  }

  if(objectsInComp.contextValue){
    if(typeof objectsInComp.contextValue === "string"){
        contextLine.push(<div>CONTEXT: <ul>{objectsInComp.contextValue}</ul></div>)
    } else {
        let tempArr = []
        let contextKeys = Object.keys(objectsInComp.contextValue)
        contextKeys.forEach((x)=>{
          if(typeof objectsInComp.contextValue[x] === 'object' && !Array.isArray(objectsInComp.contextValue[x])){
            let nestedTemp = [];
            let nestedContextObj = objectsInComp.contextValue[x]
            let nestedContextKeys = Object.keys(nestedContextObj)
            nestedContextKeys.forEach((cu)=>{
              nestedTemp.push(<li>{cu + " : " + nestedContextObj[cu]}</li>)
            })
            tempArr.push(<li>{x}</li>)
            tempArr.push(<ul>{nestedTemp}</ul>)
          } else {
            tempArr.push(<li>{x + " : " + objectsInComp.contextValue[x]}</li>)
          }
        })
        contextLine.push(<div>CONTEXT: <ul>{tempArr}</ul></div>)

    }
  }

  if(objectsInComp.Consumer_Context_Used){
    let tempArr = [];
    let unique_Context_Used = new Set(objectsInComp.Consumer_Context_Used);
    unique_Context_Used.forEach((x,i) => {
      let item = x.slice(0, -1);
      tempArr.push(<li key={i} >{item}</li>);
    });
    contextUsedLine.push(<div >Context Used: <ul>{tempArr}</ul></div>)
  }

  if(objectsInComp.Active_Provider){
    let tempArr = [];
    objectsInComp.Active_Provider.forEach((x,i) => {
      tempArr.push(<li key={i} >{x}</li>);
    });
    contextUsedLine.push(<div >Active Provider(s): <ul>{tempArr}</ul></div>)
  }

  return (
  <div className="InitialComp">
    <h4> {props.compInfo[0]}  </h4>
    <ul>
    {stateLine}
    {childrenLine}
    {providerLine}
    {consumerLine}
    {contextLine}
    {contextUsedLine}
    {activeProvider}
    </ul>
  </div>
  );
}

export default InitialComp;



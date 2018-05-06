import React from 'react';

const InitialComp = (props) => {
  console.log('propppsss in init comp', props)
  let objectsInComp = props.compInfo[1]
  let keysOfObjectsInComp = Object.keys(props.compInfo[1]);

  let stateLine = [];
  let childrenLine = [];
  let providerLine = [];
  let consumerLine = [];
  let contextLine = [];

  if(objectsInComp.state){
    let tempArr = []
    let stateKeys = Object.keys(objectsInComp.state)
    //NOT LOGGING EMPTY ARRAYS OR STRINGS
    stateKeys.forEach((x)=>{
      // console.log("X IN STATE", x)
      // console.log("OBJECTS IN COMP", objectsInComp.state)
      // console.log(objectsInComp.state[x],"STATE TYPEOF", typeof objectsInComp.state[x])
      // if(typeof objectsInComp.state[x] === 'object' && !Array.isArray(objectsInComp.state[x])){
      //   console.log(x, "STATE STUFF------> PART 1", objectsInComp.state[x])
      //   let nestedTemp = [];
      //   let nestedStateObj = objectsInComp.state[x]
      //   let nestedStateKeys = Object.keys(nestedStateObj)
      //   nestedStateKeys.forEach((cu)=>{
      //     nestedTemp.push(<li>{cu + " : " + nestedStateObj[x]}</li>)
      //   })
      //   tempArr.push(<li>{x + " : " + nestedTemp}</li>)
      // } else {
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
  if(objectsInComp.children){
    let tempArr = []
    objectsInComp.children.forEach((x,y)=>{
      tempArr.push(<li>{objectsInComp.children[y]}</li>)
    })
    if(tempArr.length === 0){
      tempArr.push(<li>None</li>)
    }
    childrenLine.push(<div>CHILDREN: <ul>{tempArr}</ul></div>)
  }
  if(objectsInComp.provider){
    providerLine.push(<div>PROVIDER: <ul>True</ul></div>)
  }
  if(objectsInComp.consumer){
    consumerLine.push(<div>CONSUMER: <ul>True</ul></div>)
  }
  if(objectsInComp.contextValue){
    if(typeof objectsInComp.contextValue === "string"){
      console.log('CONTEXT IS STRING VALUE')
        contextLine.push(<div>CONTEXT: <ul>{objectsInComp.contextValue}</ul></div>)
    } else {
      console.log('CONTEXT IS OBJECT VALUE')
        let tempArr = []
        let contextKeys = Object.keys(objectsInComp.contextValue)
        contextKeys.forEach((x)=>{
          if(typeof objectsInComp.contextValue[x] === 'object' && !Array.isArray(objectsInComp.contextValue[x])){
            console.log("IS USED. SO I DIDN'T JUST PUT THIS IN THE WRONG PLACE")
            let nestedTemp = [];
            let nestedContextObj = objectsInComp.contextValue[x]
            let nestedContextKeys = Object.keys(nestedContextObj)
            nestedContextKeys.forEach((cu)=>{
              console.log("CU------>" , cu)
              console.log("CU TYPE", typeof cu)
              nestedTemp.push(<li>{cu + " : " + nestedContextObj[cu]}</li>)
            })
            console.log('TO BE APPENDED TO STATE OR ACTION CONTEXT', nestedTemp)
            console.log('THINK THIS IS STATE OR ACTION', x)
            tempArr.push(<li>{x}</li>)
            tempArr.push(<ul>{nestedTemp}</ul>)
          } else {
            tempArr.push(<li>{x + " : " + objectsInComp.contextValue[x]}</li>)
          }
        })
        contextLine.push(<div>CONTEXT: <ul>{tempArr}</ul></div>)
      
    }
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
    </ul>
  </div>
  );
}

export default InitialComp;



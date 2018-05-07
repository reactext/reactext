import React from 'react';

const InitialComp = (props) => {
  console.log('propppsss in init comp', props)
  console.log(props.compInfo, 'what is this is it an array?')
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
    stateKeys.forEach((x)=>{
      tempArr.push(<li>{x + " : " + objectsInComp.state[x]}</li>)
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
    //As of right now, only adds an empty bullet if a provider is present, otherwise, no bullet
  }
  if(objectsInComp.consumer){
    consumerLine.push(<div>CONSUMER: <ul>True</ul></div>)
        //As of right now, only adds an empty bullet if a consumer is present, otherwise, no bullet
  }
  if(objectsInComp.contextValue){
    console.log("CONTEXT", objectsInComp.contextValue)
    if(typeof objectsInComp.contextValue === "string"){
        contextLine.push(<div>CONTEXT: <ul>{objectsInComp.contextValue}</ul></div>)
    } else {
        let tempArr = []
        let contextKeys = Object.keys(objectsInComp.contextValue)
        contextKeys.forEach((x)=>{
        tempArr.push(<li>{x + " : " + objectsInComp.contextValue[x]}</li>)
        })
        contextLine.push(<div>CONTEXT: <ul>{tempArr}</ul></div>)
    }
  }






  // //Kinda works
  // let linesForPanel =  keysOfObjectsInCompp.map((curr,ind)=>{
  //     let contentsOfCurr = props.compInfo[1][curr];
  //     let parsedContents;
  //     if(Array.isArray(contentsOfCurr)){
  // //Parses children
  //       parsedContents = contentsOfCurr.map((x)=>x)
  //     } else if (typeof contentsOfCurr === "object" && !Array.isArray(contentsOfCurr)){
  // //Parses State
  //       parsedContents = Object.keys(contentsOfCurr).map((x)=>{
  //         return x + " : " + contentsOfCurr[x]
  //       })
  //     } else {
  // //Parses other stuff
  //       parsedContents = props.compInfo[1][curr].toString()
  //     }
  //     return <div>{curr + " : " + parsedContents}</div>
  // })

  return (
  <div className="InitialComp">
    <h4> {props.compInfo[0]}  </h4>
    {/* <ul>
      {linesForPanel}
    </ul> */}
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



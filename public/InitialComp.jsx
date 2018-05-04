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
  let testNest = [];

  if(objectsInComp.state){

    let stateKeys = Object.keys(objectsInComp.state)
    stateKeys.forEach((x)=>{
      stateLine.push(<li>{x + " : " + objectsInComp.state[x]}</li>)
    })

    testNest.push(<div>STATE:  <ul>{stateLine}</ul></div>)
  }
  // if(objectsInComp.children){
  //   childrenLine = [<li>objectsInComp.children</li>]
  // }
  // if(objectsInComp.provider){
  //   providerLine = [<li>objectsInComp.provider</li>]
  // }
  // if(objectsInComp.consumer){
  //   consumerLine = [<li>objectsInComp.consumer</li>]
  // }
  // if(objectsInComp.contextValue){
  //   contextLine = [<li>objectsInComp.contextValue</li>]
  // }






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
    {testNest}
    {childrenLine}
    {providerLine}
    {consumerLine}
    {contextLine}
    </ul>
  </div>
  );
}

export default InitialComp;



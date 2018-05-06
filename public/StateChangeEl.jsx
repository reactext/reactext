import React from 'react';

const StateChangeEl = props => {
  console.log(props, "Props in SC El display");
  let entries = Object.entries(props.stateInfo);
  let changes = [];
  for (let i = 0; i < entries.length; i++) {
    console.log(entries, "ENTRIES in SC El display second");
    changes.push(
      <li key={i}>
        <span>{entries[i][0]}</span>
        <br /><ul>{entries[i][1].map((el, idx) => <li key={idx}> <strong>{el[0]}:</strong> <strong>prev: </strong> {JSON.stringify(el[1])}  <strong>curr: </strong>{JSON.stringify(el[2])}</li>)}</ul>
      </li>
    )
  }
  return (
    <div className="StateChangeEl">
      <h4>StateChange: </h4>
      <ul>{changes}</ul>
    </div>
  );
}

export default StateChangeEl;
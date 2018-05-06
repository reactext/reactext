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
        <br /><ul>{entries[i][1].map((el, idx) => <li key={idx}>{e[0]}: prev: {JSON.stringify(e[1])} curr:{JSON.stringify(e[2])}</li>)}</ul>
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
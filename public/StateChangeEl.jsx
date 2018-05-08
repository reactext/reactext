import React from 'react';
import PropsChangesEl from './PropsChangesEl.jsx'

const StateChangeEl = props => {
  console.log(props, "Props in SC El display");
  delete props.stateInfo.stateHasChanged
  let entries = Object.entries(props.stateInfo);
  console.log('entries', entries)
  let changes = [];
  let titles = [
     <div id='titlesContainer'>
       <div className='title'>Component</div>
       <div className='title'>Prop Name</div>
       <div className='title'>Previous Val</div>
       <div className='title'>Current Val</div>
     </div>
  ]
  for (let i = 0; i < entries.length; i++) {
    changes.push(
      <div key={i}>
        {titles}
        <PropsChangesEl key={i} entries={entries[i]} />
      </div>
    )
  }
  return (
    <div className="StateChangeEl">
      <h4>StateChange:</h4>
      {changes}
    </div>
  );
}

export default StateChangeEl;
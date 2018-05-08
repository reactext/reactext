import React from 'react';

const PropsChangesEl = props => {
  console.log(props, "Props in PropsChangeEl display");
  let stuff = [];
  props.entries[1].forEach((el, i) => {
    stuff.push(
      <div key={i} id='prevCurrContainer'>
        <div id='prop' className='box'> {el[0]}</div>
        <div id='prev' className='box'> {JSON.stringify(el[1])}</div>
        <div id='curr' className='box'> {JSON.stringify(el[2])}</div>
      </div>
    )
  })

  return (
    <div className="PropsChangesEl" id='changesContainer'>
      <div id='compName' className='column'>{props.entries[0]}</div>
      <div id='propsContainer'>{stuff}</div>
    </div>
  );
}

export default PropsChangesEl;
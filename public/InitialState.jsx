import React, { Component } from 'react';
import InitialComp from './InitialComp.jsx';
import Tree from 'react-tree-graph';

class InitialState extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    // console.log('props in initial state', this.props)
    let initialStateComp = [];
    let stateObj = this.props.initialState;
    console.log(stateObj, 'this should be the psgesetup obj')
    let comp = Object.entries(stateObj);
    let pageSetup = this.props.initialState;
    let pageSetupComp = Object.keys(pageSetup);
    console.log(pageSetup, 'im the pageSetup before the forEach');

    pageSetupComp.forEach(name => {
      let newArr;
      if (pageSetup[name].immediateChildren) {
        if (pageSetup[name].immediateChildren.length > 0) {
          let arr = [];

          let unfilteredArr = pageSetup[name].immediateChildren.map((str) => {
            if (str) {
              for (let i = 0; i < pageSetupComp.length; i++) {
                console.log(str, '<====str', pageSetupComp[i], '<===PGC[i]');
                if (str.includes(pageSetupComp[i])) {
                  console.log(pageSetupComp[i], 'im pageSetupComp[i]');
                  return pageSetupComp[i]
                }
              }
            }
          })
          let foo = unfilteredArr.filter(e => {
            console.log(e, 'im the e from fileter');
            return e;
          });
          console.log(foo, 'im foo');
          newArr = foo;
        }
      }
      console.log(newArr, 'im the new arr ');

      pageSetup[name].immediateChildren = newArr;

    })
    console.log(pageSetup, 'im the page set up from initialState.jsx')
    for (let i = 0; i < comp.length; i++) {
      initialStateComp.push(<InitialComp key={i} compInfo={comp[i]} />)
    }
    let componentNames = Object.keys(pageSetup);
    let topCompLength = 0;
    let topComp;
    console.log(pageSetup, 'im the pageSet up')
    componentNames.forEach(name => {
      console.log(name, 'im the name!');

      if (pageSetup[name].immediateChildren) {
        if (pageSetup[name].immediateChildren.length > topCompLength) {
          topCompLength = pageSetup[name].immediateChildren.length;
          topComp = name;
        }
      }
    });



    const getTreeObj = (componentNames, firstComponent, newObj) => {
      newObj.name = firstComponent;
      newObj.children = [];
      newObj.gProps = {
        className: 'custom',
        onClick: () => {
          document.querySelector('.textContent').innerHTML='';
          let foo = Object.keys(pageSetup[firstComponent].state);
          let myUl = document.createElement('ul');

          foo.forEach(name =>{
            myUl.innerHTML+=(`<li>${name} : ${pageSetup[firstComponent].state[name]} </li>`);
          })

          let data = document.createElement('div');
          data.append(myUl);
          document.querySelector('.textContent').append(data);
          window.scroll({
            top:1000,
            left:0,
            behavior:'smooth'
          });
        }
      }
      if (firstComponent) {
        if (pageSetup[firstComponent].immediateChildren) {
          if (pageSetup[firstComponent].immediateChildren.length > 0) {
            pageSetup[firstComponent].immediateChildren.forEach(comp => {
              newObj.children.push(getTreeObj(componentNames, comp, {}));
            })
          }
        }
      }
      return newObj
    }

    let data = getTreeObj(componentNames, topComp, {});
    let dynamic = 100 * data.children.length;




    let width = 150 + dynamic;
    let height = 200 + dynamic;
    return (
      <div className='custom-container2'>
        <div className='stateTreeContainer'>
        <Tree data={data} height={height} width={width} animated  svgProps={{className: 'custom1 custom2', transform:"rotate(90)"}} />
        </div>
        <div className="textContent"></div>
      </div>
    );
  }
};

export default InitialState;


import React, { Component } from 'react';
import Tree from 'react-tree-graph';
import styles from './styles.css';


class ConsumerPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showComponent: false,
            component: ''
          };
          this._onButtonClick = this._onButtonClick.bind(this);

    }

    _onButtonClick(component) {
        if (this.state.showComponent === true){
            this.setState({
                showComponent: false,
                component: component
              });
        }else{
            this.setState({
              showComponent: true,
              component: component
            });
        }
      }

///////// Obtaining Concumer and Providers ///////////
    render() {
        console.log('props in initial state', this.props.initialState);
        let pageSetup = this.props.initialState;
        let ProviderObj = {};
        Object.keys(pageSetup).forEach(key => {
            if (pageSetup[key].consumer) {
                pageSetup[key].Active_Provider.forEach((provider) => {
                    if (!ProviderObj[key]) {
                        ProviderObj[key] = {};
                    }
                    if (!ProviderObj[key].children) {
                        ProviderObj[key].children = [];
                    }
                    ProviderObj[key].children.push(provider);
                    console.log(key, 'these are the keys printed')
                })

            }
        });
        console.log(ProviderObj, 'the constructed object')

////////////////////_React_Tree_Graph_///////////
        let trees = [];
        Object.keys(ProviderObj).forEach((consumer, index) => {
            let data = {};
            data.name = consumer;
            data.gProps = {
                className: 'custom',
                onClick: (node, event) =>{
                    this._onButtonClick(consumer)
                }
            }
            data.children = [];
            console.log(ProviderObj[consumer], 'WHAT IS THIS TYPE')

            ProviderObj[consumer].children.forEach((provider) => {
                data.children.push({ "name": provider, gProps: {
                    className: 'custom',
                    onClick: (node, event) =>{
                        this._onButtonClick(provider)
                    }
                } });
            })
            trees.push(<Tree data={data} height={200} width={400} svgProps={{ className: 'custom1'}}   />);
        })

        ////////////////////_Conditional_Rendering_///////////
        return (
            <div className="custom-container">
                <div id='treeContainer'>
                {trees}
                </div>
                <div className='consumerContent'>
                {this.state.showComponent ? <PlaceHolder info={this.props.initialState} component ={this.state.component}/> : null}
                </div>
            </div>
        );
    }
};


class PlaceHolder extends React.Component {
    render() {


        let contextUsedEntry = [<h1>Context Being Used:</h1>];
        let consumerValueEntry = [<h1>Consumer Value:</h1>]

        if(this.props.info[this.props.component].contextValue){
            let consumerValue = this.props.info[this.props.component].contextValue;
            let consumerValueKeys = Object.keys(consumerValue);
            consumerValueKeys.forEach(e => {
                console.log(consumerValue[e], 'from consumer');
            // consumerValueEntry.push(<p>{e} : {consumerValue[e]}</p>);
            consumerValueEntry.push('<p>{e} : </p>');

            });
        }

        if(this.props.info[this.props.component].Consumer_Context_Used){
            let contextUsed = this.props.info[this.props.component].Consumer_Context_Used;
            let contextUsedKeys = Object.keys(contextUsed);
            contextUsedKeys.forEach(e => {
                console.log(contextUsed[e], 'from context');
                // contextUsedEntry.push(<p>{e} : {contextUsed[e]}</p>);
                contextUsedEntry.push('<p>{e} : </p>');

                // contextUsedEntry.push(<p>{contextUsed[e]}</p>);

            });
        }



        console.log(contextUsedEntry, 'contextUsedEntry');
        console.log(consumerValueEntry, 'consumerValueEntry');


      return (
        <div>
           {contextUsedEntry || consumerValueEntry }
        </div>
      );
    }
  }


export default ConsumerPanel;






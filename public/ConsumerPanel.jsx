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
                {trees}
                {this.state.showComponent ? <div> <PlaceHolder info={this.props.initialState} component ={this.state.component}/></div> : null}
            </div>
        );
    }
};


class PlaceHolder extends React.Component {
    render() {
        console.log(JSON.stringify(this.props.info[this.props.component].Consumer_Context_Used), 'YOYOYOYY')
      return (
        <div>
           {JSON.stringify(this.props.info[this.props.component].Consumer_Context_Used) || JSON.stringify(this.props.info[this.props.component].contextValue) }
        </div>
      );
    }
  }


export default ConsumerPanel;






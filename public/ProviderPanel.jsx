import React, { Component } from 'react';
import Tree from 'react-tree-graph';
import styles from './styles.css';


class ProviderPanel extends Component {
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
        let ConsumerAndProvider = [];
        let ProviderObj = {};
        Object.keys(pageSetup).forEach(key => {
            if (pageSetup[key].consumer) {
                pageSetup[key].Active_Provider.forEach((provider) => {
                    if (!ProviderObj[provider]) {
                        ProviderObj[provider] = {};
                    }
                    if (!ProviderObj[provider].children) {
                        ProviderObj[provider].children = [];
                    }
                    ProviderObj[provider].children.push(key);
                    console.log(key, 'these are the keys printed')
                })

            }
        });

////////////////////_React_Tree_Graph_///////////
        let trees = [];
        Object.keys(ProviderObj).forEach((Provider, index) => {
            let data = {};
            data.name = Provider;
            data.gProps = {
                className: 'custom',
                onClick: (node, event) =>{
                    this._onButtonClick(Provider)
                }
            }
            data.children = [];
            console.log(ProviderObj[Provider], 'WHAT IS THIS TYPE')

            ProviderObj[Provider].children.forEach((consumer) => {
                data.children.push({ "name": consumer, gProps: {
                    className: 'custom',
                    onClick: (node, event) =>{
                        this._onButtonClick(consumer)
                    }
                } });
            })
            trees.push(<Tree  data={data} height={200} width={400} svgProps={{ className: 'custom1'}}   />);
        })

        ////////////////////_Conditional_Rendering_///////////
        return (
            <div className="custom-container">
                <div id='treeContainer'>
                {trees}
                </div>
                <div className='providerContent'>
                {this.state.showComponent ? <PlaceHolder info={this.props.initialState} component ={this.state.component}/> : null}
                </div>
            </div>
        );
    }
};


class PlaceHolder extends React.Component {
    render() {
        console.log(this.props.info[this.props.component].Consumer_Context_Used, 'being used by consumer')
        console.log(this.props.info[this.props.component].contextValue, 'being passed down by provider')
        if (this.props.info[this.props.component].Consumer_Context_Used) {
            let tmpArr = [];
            this.props.info[this.props.component].Consumer_Context_Used.forEach((curr) => {
                tmpArr.push(<li> {curr}</li>)
            })
            return (<div>Context Used: {tmpArr}</div>)
        } else {
            let tmpArr = []
            if (typeof this.props.info[this.props.component].contextValue === "object") {
                Object.entries(this.props.info[this.props.component].contextValue).forEach((curr) => {
                    if (Array.isArray(curr)) {
                        let nestedTemp = []
                        if(typeof curr[1] === 'object'){
                            let tempObj = Object.entries(curr[1])
                            tempObj.forEach((x) => {
                                nestedTemp.push(<li>{x}</li>)
                            })
                            tmpArr.push(<li>{curr[0]}</li>)
                            tmpArr.push(<ul>{nestedTemp}</ul>)
                        } else {
                            tmpArr.push(<li>{curr[0]}</li>)
                            tmpArr.push(<ul>{curr[1]}</ul>)
                        }
                    } else {
                        tmpArr.push(<div>{curr}</div>)
                    }
                })
            } else {
                tmpArr.push(<li>{this.props.info[this.props.component].contextValue}</li>)
            }
            return (<div>Values being passed down by Producer: {tmpArr}</div>)
        }
    //   return (
    //     <div>
    //        {JSON.stringify(this.props.info[this.props.component].Consumer_Context_Used) || JSON.stringify(this.props.info[this.props.component].contextValue) }
    //     </div>
    //   );
    }
  }


export default ProviderPanel;






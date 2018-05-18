import React from 'react';
import autoBind from 'react-autobind';

import ParameterParts from './ParameterParts';

import ClosedIcon from 'mdi-react/CircleOutlineIcon';
import OpenIcon from 'mdi-react/CircleIcon';


// Given a set of parameters and rules for multiplying those objects togeter, generate 
// TODO: PropTypes
export default class ParameterItem extends React.Component {

  constructor(props) {
    super(props); autoBind(this);        
    this.state = { open:false };
  }

  toggleOpen(evt){
    this.setState({ open: !this.state.open });
  }

  render()
  {
    if(!this.props.data) return '';

    var results=[];

    var keys = Object.keys(this.props.data);
    for(var kctr=0;kctr<keys.length;kctr++){
      var curKey = keys[kctr];
      if (curKey.endsWith('Test')){
        results.push( 
            <ParameterItem key={kctr} data={this.props.data[curKey]}/>
          );
      }
      else if(curKey!=='tstName' && curKey!=='_rft'){
        results.push(<ParameterParts key={kctr} data={this.props.data}/> );
        break;
      }
    }

    //var icon = this.state.open?<OpenIcon/>:<ClosedIcon/>

    if(this.props.data.tstName){
      return(
        <div style={{marginLeft:'15px'}}>
          <div style={{lineHeight:'25px',verticalAlign:'middle',cursor:'pointer'}} onClick={this.toggleOpen} title='Click to open node.' >
            <div style={{fontWeight:'bold',verticalAlign:'middle',minWidth:'150px',display:'inline-block'}}>&nbsp;&nbsp;{this.props.data.tstName}</div>
            <div style={{marginLeft:'5px',display:'inline-block'}}><i>{this.props.data["_rft"]}</i></div>
          </div>
          {this.state.open && <div>{results}</div>}
        </div>
        );
    }
    else{
      return(<div>{results}</div>);
    }

  }
}


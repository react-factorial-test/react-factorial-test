import React from 'react';
import autoBind from 'react-autobind';




// Given a set of parameters and rules for multiplying those objects togeter, generate 
// TODO: PropTypes
export default class ParameterParts extends React.Component {

  constructor(props) {
    super(props); autoBind(this);        
  }

  render()
  {
    if(!this.props.data) return '';

    var results=[];

    var keys = Object.keys(this.props.data);
    for(var kctr=0;kctr<keys.length;kctr++){
      var curKey = keys[kctr];      
      if(curKey!=='tstName' && curKey!=='_rft'){
        // we have something that does not end in test, therefor this IS the test data.
        // stringify it and drop it back.
        var str = JSON.stringify(this.props.data[curKey]); // probably a word or number, possibly an array or sub-object
        results.push( 
          <div><div style={{display:'inline-block',marginLeft:'20px'}}>{curKey}:</div>{str}</div> );
      }
    }
    return(<div>{results}</div>);
  }
}


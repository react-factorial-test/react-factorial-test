import React from 'react';
import autoBind from 'react-autobind';

import ParameterItem from './ParameterItem';




// Given a set of parameters and rules for multiplying those objects togeter, generate 
// TODO: PropTypes
export default class TestItem extends React.Component {

  constructor(props) {
    super(props); autoBind(this);        
  }

  render()
  {
    return(
      <div key={this.props.index+'item'}>
        <hr />          
        <div style={{ fontSize: '1.5em' }}>{this.props.name}</div>            
        <hr />          
        {this.props.description}        
        <div style={{ fontSize: '1.25em' }}>
          <ParameterItem data={this.props.data}/>
        </div>
      </div>
      );
  }
}


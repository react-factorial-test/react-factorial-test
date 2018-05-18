import React from 'react';
import autoBind from 'react-autobind';


// Non interactive component that multiplies and adds up to three numbers
export default class LineItem extends React.Component {
  render() {
    var color='black';
    if(this.props.color==='red'){ color='red';}
    if (this.props.color === 'blue') { color = 'blue'; }
    if (this.props.color === 'green') { color = 'green'; }

    var transform='';
    var border='';
    if (this.props.border === 'solid') { border = '4px solid black'; }
    if (this.props.border === 'dashed') { border = '4px dashed black'; }

    var transform='';
    var borderRadius = '';
    if (this.props.shape === 'diamond') { transform = 'scale(0.8) rotate(45deg)'; }
    if (this.props.shape === 'circle') { borderRadius = '25px'; }
    

    return (
      <div style={{ width: '25px', height: '25px', backgroundColor: color, border: border, borderRadius: borderRadius ,transform:transform,display:'inline-block'}}>&nbsp;</div>
    );
  }
}


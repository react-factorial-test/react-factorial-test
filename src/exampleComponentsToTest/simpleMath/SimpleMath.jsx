import React from 'react';
import autoBind from 'react-autobind';


// Non interactive component that multiplies and adds up to three numbers
export default class SimpleMath extends React.Component {
  render()
  {
    var a = this.props.a;
    var b = this.props.b;
    var c = this.props.c;

    var aIsReal = (a || a===0); // make sure 0 is treated as a number, but null is not.
    var bIsReal = (b || b===0);
    var cIsReal = (c || c===0);
    
    var aIsBroken = isNaN(parseFloat(a));
    var bIsBroken = isNaN(parseFloat(b));
    var cIsBroken = isNaN(parseFloat(c));
    
    var valList = [];
    var mulList = [];
    if(aIsReal && !aIsBroken){ valList.push(a); }
    if(bIsReal && !bIsBroken){ valList.push(b); }
    if(cIsReal && !cIsBroken){ valList.push(c); }

    var sum = 0;
    var sumCall = (sum,val) => sum+val;
    if(valList.length!==0){ sum=valList.reduce( sumCall,0 ); }

    var mul = 0;
    var mulCall = (sum,val) => sum*val;
    if(valList.length!==0){ mul=valList.reduce( mulCall,1 ); }
    

      return(
      <div key={this.props.index+'item'} style={{border:'1px solid grey',padding:'5px',maxWidth:'150px'}} >
        {aIsReal && <span style={{backgroundColor:(aIsBroken?'red':'')}}>a = {a}</span>}&nbsp; 
        {bIsReal && <span style={{backgroundColor:(bIsBroken?'red':'')}}>b = {b}</span>}&nbsp;
        {cIsReal && <span style={{backgroundColor:(cIsBroken?'red':'')}}>c = {this.props.c}</span>}<br/>
        SUM: {valList.join(' + ')} = {sum}<br/>
        MUL: {valList.join(' * ')} = {mul}<br/>
      </div>
      );
  }
}


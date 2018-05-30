import React from 'react';
import autoBind from 'react-autobind';
import accounting from 'accounting';


// Non interactive component that multiplies and adds up to three numbers
export default class LineItem extends React.Component {
  render()
  {
    // validate the props
    var a = this.props.count;
    var b = this.props.cost;
    var c = this.props.currency;

    var aIsReal = (a || a===0); // make sure 0 is treated as a number, but null is not.
    var bIsReal = (b || b===0);
    var cIsReal = (c || c===0);
    
    var aIsBroken = isNaN(parseFloat(a));
    var bIsBroken = isNaN(parseFloat(b));
    var cIsBroken = isNaN(parseFloat(c));
    
    var valList = [];
    var mulList = [];
    var msg = '';
    if(aIsReal && !aIsBroken){ valList.push(a);} else{ msg+=' count is not valid.' }
    if(bIsReal && !bIsBroken){ valList.push(b);} else{ msg+=' cost is not valid.' }
    if(cIsReal && !cIsBroken){ valList.push(c);} else{ c=0; }

    var total = a*b;
    var color='black';
    if(total>c){
      color='red';
    }
    if (this.props.currency=='EUR') {
      b= accounting.formatMoney(b, "€", 2, ".", ",");
      total = accounting.formatMoney(total, "€", 2, ".", ",");
    }
    else if (this.props.currency=='GBP') {
      b = accounting.formatMoney(b, "£", 2, ".", ",");
      total = accounting.formatMoney(total, "£", 2, ".", ",");
    }    
    else {
      b = accounting.formatMoney(b, "$", 2, ",", ".");
      total = accounting.formatMoney(total, "$", 2, ",", ".");
    }

      return(
      <div key={this.props.index+'item'} style={{border:'1px solid blue',padding:'5px',borderRadius:'5px',maxWidth:'100px'}} >
        {a} * {b} = <span style={{color:color}}>{total}</span>
        {msg && <span><br/>{msg}</span>}
      </div>
      );
  }
}


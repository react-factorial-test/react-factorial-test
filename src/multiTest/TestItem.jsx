import React from 'react';
import autoBind from 'react-autobind';

import alphaStringify from 'json-stable-stringify';  // stable json for easy test name comparisons later.

import FlagIcon from 'mdi-react/FlagVariantIcon';
import MagnifyIcon from 'mdi-react/MagnifyIcon';
import SelectNo from 'mdi-react/CheckboxBlankOutlineIcon';
import SelectYes from 'mdi-react/CheckboxBlankIcon';
import CloseBox from 'mdi-react/CloseBoxIcon';



// Given a set of parameters and rules for multiplying those objects togeter, generate 
// TODO:PropTypes
export default class TestItem extends React.Component {

  constructor(props) {
    super(props); autoBind(this);        
    this.id = (this.props.id||'');
    this.state = { pleaseReRender:0 };
    this.renderTools = false;
  }

  // toggle wether a given test name is in the comparison list.
  // save the information to a window variable so that it will survive reloading the page due the tested code being updated.
  toggleComp(testName) {
    var compList = JSON.parse(localStorage.getItem('reactFactorialTest_compList'+this.id))||[];
    if (compList.indexOf(testName)===-1){
      // add it
      compList.push(testName)
    }
    else{
      // cut it
      var i;
      while ((i = compList.indexOf(testName)) != -1) {
        compList.splice(i, 1);
      }    
    }
    localStorage.setItem('reactFactorialTest_compList'+this.id, JSON.stringify(compList));
    // real state is in local session.  This just tells react to wake up and render me again.
    this.setState({ pleaseReRender:this.state.pleaseReRender++ });
  }

  showTools(){
    this.renderTools=true;
    this.setState({ pleaseReRender:this.state.pleaseReRender++ });
  }
  hideTools(){
    this.renderTools=false;
    this.setState({ pleaseReRender:this.state.pleaseReRender++ });
  }


  // toggle wether a given test name is in the comparison list.
  // save the information to a window variable so that it will survive reloading the page due the tested code being updated.
  toggleFlag(testName) {
    var flagList = JSON.parse(localStorage.getItem('reactFactorialTest_flagList'+this.id)) || [];
    if (flagList.indexOf(testName) === -1) {      
      flagList.push(testName);// add it
    }
    else {      
      var i;
      while ((i = flagList.indexOf(testName)) != -1) {
        flagList.splice(i, 1);// cut it
      }
      localStorage.setItem('reactFactorialTest_note_' + testName+this.id, '');          
    }
    localStorage.setItem('reactFactorialTest_flagList'+this.id, JSON.stringify(flagList));
    this.setState({ pleaseReRender:this.state.pleaseReRender++ });
  }  

  onTypeNote(evt){
    var holdName = this.props.item.tstName; 
    localStorage.setItem('reactFactorialTest_note_' + holdName+this.id,evt.target.value);    
    this.setState({ pleaseReRender:this.state.pleaseReRender++ });
  }
  

  render()
  {
    var holdName = this.props.item.tstName; 

    // This is an inefficience by design.  If I pass this in from the parent, then the parent has to re-render when these change.
    // I don't want that, so I accept the cost that each test must do it's own local storage access to avoid a whole page re-render. 
    var reactFactorialTest_filter = localStorage.getItem('reactFactorialTest_filter'+this.id) || '';
    var reactFactorialTest_compsOnly = localStorage.getItem('reactFactorialTest_compsOnly'+this.id) || ''; // empty string implies false.
    var reactFactorialTest_compList = JSON.parse(localStorage.getItem('reactFactorialTest_compList'+this.id)) || []; //JJHFIX
    var reactFactorialTest_flagsOnly = localStorage.getItem('reactFactorialTest_flagsOnly'+this.id) || '';
    var reactFactorialTest_flagList = JSON.parse(localStorage.getItem('reactFactorialTest_flagList'+this.id)) || []; //JJHFIX

    var reactFactorialTest_note = localStorage.getItem('reactFactorialTest_note_'+holdName+this.id) || '';    
    var reactFactorialTest_smallMode = localStorage.getItem('reactFactorialTest_smallMode'+this.id) || this.props.smallMode || '';    

    var focusButton='';
    var includeToggle = '';
    var compViewToggle = '';
    var flagToggle = '';

    // is this test name in the comparison list?
    var isInCompList = (reactFactorialTest_compList && -1 !== reactFactorialTest_compList.indexOf(holdName));
    // is this test flagged for review
    var isFlagged    = (reactFactorialTest_flagList && -1 !== reactFactorialTest_flagList.indexOf(holdName));

    
    if (this.renderTools){
      // only show the focus button if everything is being rendered
      focusButton = <div style={{ padding:'2px', height:'18px',backgroundColor:'lightgreen', border:'1px solid black',width:20,display:'inline-block' }}
                          onClick={this.props.focusToggle}
                          title='Show only this test'
      ><MagnifyIcon width={18} height={18}/></div>

      includeToggle = <div style={{ padding:'2px', height:'18px',backgroundColor:'lightgreen', border:'1px solid black', width:20, display:'inline-block' }}
                          onClick={() => this.toggleComp(holdName)}
                          title='Include test for comparisons'
      >{isInCompList ? <SelectYes width={18} height={18} /> :<SelectNo width={18} height={18}/>}</div>

      flagToggle = <div style={{ padding:'2px', height:'18px',backgroundColor:isFlagged ? 'crimson' :'lightgreen', border:'1px solid black', width:20, display:'inline-block' }}
                          onClick={() => this.toggleFlag(holdName)}
                          title='Flag test for review'
                        >{<FlagIcon width={18} height={18}/>}</div>

    }

    this.props.item.id = 'testId'+this.props.index;



    var display = Object.assign({},this.props.item);
    delete display['tstName'];
    delete display['_rft'];
    delete display['id'];

    if (
      // if there's no filter or this test matches a filter, include it.
      (!reactFactorialTest_filter || holdName === reactFactorialTest_filter) &&
      // if there's no comparison, or if there is comparison and this test is in the list.
      (!reactFactorialTest_compsOnly ||
         (reactFactorialTest_compsOnly && 
          reactFactorialTest_compList &&
          -1 !== reactFactorialTest_compList.indexOf(holdName))
      ) &&
      // if there's no comparison, or if there is comparison and this test is in the list.
      (!reactFactorialTest_flagsOnly ||
        (reactFactorialTest_flagsOnly && 
         reactFactorialTest_flagList &&
         -1 !== reactFactorialTest_flagList.indexOf(holdName))
     )          
    ){    

      if(reactFactorialTest_smallMode){
        return (
          <div key={this.props.index + 'item'} 
                style={{ display:'inline-block' }} title={holdName + '\n' + alphaStringify(display)}>
                <div title='click here to toggle flagged status' style={{fontSize:'.75em',color:'red',cursor:'pointer'}}
                  onClick={() => this.toggleFlag(holdName)}
                >&nbsp;{isFlagged && 'flagged'}</div>
            { this.props.item && React.cloneElement(this.props.target, this.props.item) }
          </div>
        );
      }
      else{
        return(
          <div key={this.props.index+'item'} style={{borderBottom:'1px solid lightgrey',margin:'5px',paddingBottom:'5px'}} 
                onMouseEnter={this.showTools} onMouseLeave={this.hideTools} >
            <div style={{minHeight:'50px'}}>
              <div style={{ display:'inline-block',maxWidth:'80%' }}>
                <b>{holdName}</b>&nbsp;{isFlagged && '🏴'}&nbsp;{isInCompList && '⬛'}<br/>
                {alphaStringify(display).split(',').join(', ') /* so text will wrap */}
              </div>
              {this.renderTools && <div style={{ display:'inline-block',float:'right',verticalAlign:'top'}}>
                  {focusButton}&nbsp;
                  {flagToggle}&nbsp;
                  {includeToggle}<br/>
                  <input type='text' 
                    value={reactFactorialTest_note} 
                    style={{ paddingTop:'2px' }} 
                    placeholder='notes'
                    onChange={this.onTypeNote}/>
              </div>
              }
            </div>
            {this.props.item && React.cloneElement(this.props.target, this.props.item)}
          </div>
          );
      }
    }
    else{
      // no longer relavant to the current focus list
      return('');
    }
  }
}


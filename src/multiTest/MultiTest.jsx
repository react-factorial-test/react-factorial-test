import React from 'react';
//import { observable, action, computed } from 'mobx';
//import { observer } from 'mobx-react';
import autoBind from 'react-autobind';

import alphaStringify from 'json-stable-stringify';  // stable json for easy test name comparisons later.

import FlagIcon from 'mdi-react/FlagVariantIcon';
import MagnifyIcon from 'mdi-react/MagnifyIcon';
import SelectNo from 'mdi-react/CheckboxBlankOutlineIcon';
import SelectYes from 'mdi-react/CheckboxBlankIcon';
import CloseBox from 'mdi-react/CloseBoxIcon';
import UnFilter from 'mdi-react/BookmarkRemoveIcon';

import GoBig from 'mdi-react/ArrowExpandAllIcon';
import GoSmall from 'mdi-react/ArrowCollapseAllIcon';

import TestItem from './TestItem';


// Given a set of parameters and rules for multiplying those objects togeter, generate 
// TODO: PropTypes
export default class MultiTest extends React.Component {

  constructor(props) {
    super(props); autoBind(this);        
    this.id = '_'+(this.props.id||'');
    
    try {
      // clear any bad data
      var reactFactorialTest_filter = localStorage.getItem('reactFactorialTest_filter'+this.id) || '';  // empty string implies false.
      var reactFactorialTest_compsOnly = localStorage.getItem('reactFactorialTest_compsOnly'+this.id) || ''; 
      var reactFactorialTest_compList = JSON.parse(localStorage.getItem('reactFactorialTest_compList'+this.id)) || [];
      var reactFactorialTest_flagsOnly = localStorage.getItem('reactFactorialTest_flagsOnly'+this.id) || '';
      var reactFactorialTest_flagList = JSON.parse(localStorage.getItem('reactFactorialTest_flagList'+this.id)) || [];    
      var reactFactorialTest_smallMode = localStorage.getItem('reactFactorialTest_smallMode'+this.id) || '';  // empty string implies false.
    } catch (e) {
      localStorage.removeItem('reactFactorialTest_filter'+this.id);
      localStorage.removeItem('reactFactorialTest_compsOnly'+this.id);
      localStorage.removeItem('reactFactorialTest_compList'+this.id);
      localStorage.removeItem('reactFactorialTest_flagsOnly'+this.id);
      localStorage.removeItem('reactFactorialTest_flagList'+this.id);
      localStorage.removeItem('reactFactorialTest_smallMode'+this.id);
    }
    
    
    this.state = {
      filter: (localStorage.getItem("reactFactorialTest_filter"+this.id) || ''),
      smallMode:(localStorage.getItem('reactFactorialTest_smallMode'+this.id) || this.props.smallMode || ''),
      showCompsOnly: false,
      showFlagsOnly: false,
    };
  }

  // Flattens a JSON hierarchy to prepare for test discovery and multiplication.
  // Expands each test group into individual test to muldiply.
  // For Example 
  //   testParams:{
  //     alphaTest: { a1Test:{a:1}, a2Test:{a:2}, a3Test:{a:3} },
  //     betaTest:  { b1Test:{b:1}, b2Test:{b:2}, b3Test:{b:3} }, 
  //   }
  // getAllWork(testParams.alphaTest.a1Test) --> [{a:1}]
  // getAllWork(testParams.alphaTest)        --> [{a:1},{a:2},{a:3}]
  // getAllWork(testParams)                  --> [{a:1},{a:2},{a:3},{b:1},{b:2},{b:3}]
  getAllWork(workObj,nameSoFar){
    if(!workObj) return [];
    var results=[];
    var keys = Object.keys(workObj);
    for(var kctr=0;kctr<keys.length;kctr++){
      var curKey = keys[kctr];
      if (curKey.endsWith('Test')){
        results = results.concat( this.getAllWork( workObj[curKey],curKey ));
      }
      else if(curKey!=='tstName' && curKey!=='_rft'){
        results.push( workObj );
        return results;
      }
    }
    return results;
  }

  // Multiplies two arrays of objects
  // Expands each test group into individual test to muldiply.
  // For Example 
  //   testParams:{
  //     alphaTest: { a1Test:{a:1}, a2Test:{a:2}, a3Test:{a:3} },
  //     betaTest:  { b1Test:{b:1}, b2Test:{b:2}, b3Test:{b:3} }, 
  //   }
  // var aList = getAllWork(testParams.alphaTest)        --> [{a:1},{a:2},{a:3}]
  // var bList = getAllWork(testParams.alphaTest)        --> [{a:1},{a:2},{a:3}]
  // multiplyObjects(aList,bList) --> [ {a:1,b:1} , {a:1,b:2} , {a:1,b:3} ,
  //                                    {a:2,b:1} , {a:2,b:2} , {a:2,b:3} ,
  //                                    {a:3,b:1} , {a:3,b:2} , {a:3,b:3} ]
  multiplyObjects(left,right){
    var results = [];
    for (var lctr = 0; lctr < left.length; lctr++) {
      for (var rctr = 0; rctr < right.length; rctr++) {
        var newName = (left[lctr].tstName||'');
        if (right[rctr].tstName){
          newName = (left[lctr].tstName || '')+ ' | ' + right[rctr].tstName;
        }
        var test = Object.assign({},left[lctr],right[rctr],{tstName:newName});
        results.push( test );
      }
    }
    return results;
  }  

  // show only the given test name.
  // save the information to a window variable so that it will survive reloading the page due the tested code being updated.
  setFilter(filterVal){
    localStorage.setItem('reactFactorialTest_filter'+this.id,filterVal);
    localStorage.setItem('reactFactorialTest_compsOnly'+this.id,''); // emptry string for false because local storage works on strings.
    localStorage.setItem('reactFactorialTest_flagsOnly'+this.id,'');
    this.setState({ filter: filterVal, showCompsOnly: '', showFlagsOnly: ''});
  }

  goSmall() {
    localStorage.setItem('reactFactorialTest_smallMode'+this.id,'T'),    
    this.setState({ smallMode: true });
  }
  goBig() {
    localStorage.setItem('reactFactorialTest_smallMode'+this.id,''),    
    this.setState({ smallMode: false });
  }
  

  // toggle wether the system is showing all tests or just the comparison tests.
  // save the information to a window variable so that it will survive reloading the page due the tested code being updated.
  toggleCompVisible(){
    var showCompsOnly = localStorage.getItem('reactFactorialTest_compsOnly'+this.id) || '';
    var compsOnly = ('' === showCompsOnly) ? 'T' : ''; // rigmaroll so I can store in local storage.
    localStorage.setItem('reactFactorialTest_compsOnly'+this.id,compsOnly);
    this.setState({ showCompsOnly: compsOnly });
  }

  // toggle wether the system is showing all tests or just the flagged tests.
  // save the information to a window variable so that it will survive reloading the page due the tested code being updated.
  toggleFlagVisible() {
    var showFlagsOnly = localStorage.getItem('reactFactorialTest_flagsOnly'+this.id)||'';
    var flagsOnly = ('' === showFlagsOnly) ? 'T' : ''; // rigmaroll so I can store in local storage.
    localStorage.setItem('reactFactorialTest_flagsOnly'+this.id,flagsOnly);
    this.setState({ showFlagsOnly: flagsOnly });
  }
  

  // Uses the getAllWork and multiplyObjects methods to generate a list of test parameters.
  // renders this.props.targetTag once for each multiplied test parameter group in the list.
  render(){
    // this is the input list of tests and test multiplications to perform
    var testArray = this.props.test;
    if(!testArray){ return(<div>you must specify an array of tests as the test paramter</div>); }

    if('object'!==(typeof this.props.target)){
      return<div style={{margin:'5px',padding:'5px',backgroundColor:'red',border:'5px dashed black',fontSize:'2em'}}>
        <b>You have not passed a valid React element for testing.<br/>Instead of an object, you've passed in a function.</b><br/>
        Most likely you typed something like:<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;target=&#123;MyComponent&#125;<br/>
        Instead, you need to type:<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;target=&#123;&#60;MyComponent/&#62;&#125;<br/>
        </div>
    }    

    //===== MULTIPLICATION PHASE =====
                                                  // testArray is an array or arrays.  
                                                  // in the outer array, each item is a test to calculate,
                                                  //   for the inner array, they are parameter sets to multiply
    var allWork = [];                             // the final list of all test parameters to be rendered.  
    for(var tctr=0;tctr<testArray.length;tctr++){ // test counter
      var curTest = testArray[tctr];              // take this item in the test array and expand it out.
                                                  // curTest is an array of parameter group objects.  
      if (curTest && curTest.length) {            // Each object has a field that is one test (recursively).                                                    
        var lastSet = [{}];                       // array with one empty object.  Important!  Multiply by 1, not 0  
        for (var pctr = 0; pctr < curTest.length; pctr++) { // part counter
          var part = curTest[pctr];               // part should be an object. Each member ending in Test is a parameter group                    
          var curSet = this.getAllWork(part,'');  // returns an array of multiplicable objects.
                                                  // multiply all the work from the lastSet by all the work in the curSet
          var thisSet = this.multiplyObjects(curSet, lastSet);
          lastSet = thisSet.slice(0);             // clone array so that we don't alter the sets
        }
        allWork = allWork.concat(lastSet);        // add this multiplied group of tests to the list of all tests to run.
      }
    }

    var reactFactorialTest_filter = localStorage.getItem('reactFactorialTest_filter'+this.id) || '';
    var reactFactorialTest_compsOnly = localStorage.getItem('reactFactorialTest_compsOnly'+this.id) || ''; // empty string implies false.
    var reactFactorialTest_compList = JSON.parse(localStorage.getItem('reactFactorialTest_compList'+this.id)) || [];
    var reactFactorialTest_flagsOnly = localStorage.getItem('reactFactorialTest_flagsOnly'+this.id) || '';
    var reactFactorialTest_flagList = JSON.parse(localStorage.getItem('reactFactorialTest_flagList'+this.id)) || [];    
    var reactFactorialTest_smallMode = localStorage.getItem('reactFactorialTest_smallMode'+this.id) || this.props.smallMode || '';    
    
    var visibleTestCount=0;

    //===== FILTERING PHASE =====
    var renderList = allWork.map((item, index) => {

      // check if rendering all, or only a specific test.
      // This filtering has a couple of notable things:
      // 1) test are filtered for focus so the user can make repairs to a specific mixture of text parameters
      // 2) test filter state is copied into window variables and used from there instead of from state.
      //    That way, the tests can re-load without losing your test focus or comparisons
      // 3) any number of tests can be set for comparison, again controlled by window variables.

      // this renders each item in allwork to an array, filtering out items that are not supposed to be rendered.
      var holdName = item.tstName; 

      // It seems like this logic has to be checked twice in order to have things be performant and also work while in focused mode
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
        visibleTestCount++;
        return <TestItem key={index} index={index} item={item} target={this.props.target} smallMode={this.state.smallMode} id={this.id}
                  focusToggle={() => this.setFilter(holdName)}
                />
      }
    });

    var unFocusButton='';
    var unCompareButton = '';    
    var unFlagButton = '';

    if (reactFactorialTest_filter || reactFactorialTest_compsOnly || reactFactorialTest_flagsOnly ) {
      unFocusButton = 
        <div style={{ display: 'inline-block', padding: '2px', height: '18px',backgroundColor: 'lightgreen', border: '1px solid black' }}
          onClick={() => this.setFilter('')}
          title='UnFocus / Show All Tests'
        >
        <UnFilter width={18} height={18} />
        </div>
    }
    else{
      unCompareButton = 
        <div style={{ display: 'inline-block', padding: '2px', height: '18px',backgroundColor: 'lightgreen', border: '1px solid black' }}
          onClick={() => this.toggleCompVisible()} title='Focus On Comparison Tests'
        ><MagnifyIcon width={18} height={18} /><SelectYes width={18} height={18} /></div>      
      unFlagButton = 
        <div style={{ display: 'inline-block', padding: '2px', height: '18px',backgroundColor: 'lightgreen', border: '1px solid black' }}
        onClick={() => this.toggleFlagVisible()} title='Focus On Flagged Tests'
      ><MagnifyIcon width={18} height={18} /><FlagIcon width={18} height={18} /></div>
        
    }

    var goBigButton = <div style={{ display: 'inline-block', padding: '2px', height: '18px', backgroundColor: 'lightgreen', border: '1px solid black' }}
      onClick={() => this.goBig()} title='Toggle: One Test Per Line'>
      <GoBig width={18} height={18} />
      </div>
    var goSmallButton = <div style={{ display: 'inline-block', padding: '2px', height: '18px', backgroundColor: 'lightgreen', border: '1px solid black' }}
      onClick={() => this.goSmall()} title='Toggle: Compact Mode'>
      <GoSmall width={18} height={18} />
      </div>



    if(reactFactorialTest_smallMode){
      return(
        <div>
          <div>{allWork.length} Tests {visibleTestCount<allWork.length && <span>({allWork.length-visibleTestCount} filtered out)</span>}</div>
          <div>Mouse over each test for details. Click above the test to flag for review.</div>
          <div>{goBigButton}&nbsp;{unFocusButton}&nbsp;{unFlagButton}</div>
          {renderList}          
        </div>
      );
    }
    
    // I have considered using a virutal list here, but that removes the ability to performance test a large number of renders.
    // So far, I've decided to leave it as is.
    return(
      <div style={{height:'99%'}}>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 60, borderBottom: '3px solid grey', padding: '5px'}}>
          <div style={{ paddingTop:'5px',fontSize: '2em'  }}>
            {allWork.length} Tests {visibleTestCount<allWork.length && <span>({allWork.length-visibleTestCount} filtered out)</span>}
          </div>
          <div>
            {unFocusButton}&nbsp;
            {unFlagButton}&nbsp;
            {unCompareButton}&nbsp;
            {goSmallButton}
          </div>
        </div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 73, bottom: 0, overflow: 'auto',padding: '5px',  }}>
          {renderList}
        </div>
      </div>
    )
  }
}
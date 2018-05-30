
import React from 'react';
import autoBind from 'react-autobind';


import Shape from './shapes/Shape';
import ShapeParamRaw from './shapes/ShapesParameters';
var shapeData = TestNameTool(ShapeParamRaw); // name each test after it's variable name.

//import {TestNameTool} from 'react-factorial-test';
//import { ParameterDisplay } from 'react-factorial-test';
//import { MultiTest } from 'react-factorial-test';

import TestNameTool from '../multiTest/TestNameTool';
import ParameterDisplay from '../multiTest/ParameterDisplay';
import MultiTest from '../multiTest/MultiTest';




// Non interactive component that multiplies and adds up to three numbers
export default class IntroPage extends React.Component {
  render()
  {
    return(
      <div>
    <center>
    <hr/>
      <h1>react-factorial-test</h1>
    <hr/>
    <img src='/fact1.png'/><br/>
      <img src='/factorial.png'/>
    <br/>
    <hr/>
    </center>
    <h1>Introduction</h1>
    This is the documentation for react-factorial-test.
    <ul>
      <li>Rapid test generation based on parameter documentation.</li>
      <li>Tools for side-by-side comparison of test results.</li>
      <li>DRY test development: No need to repeat parameters when building tests.</li>
      <li>Storybook compatible</li>
    </ul>
    <h1>What is a "factorial" test?</h1>
    A factorial test allows you to list a set of all testable values for each parameter of your component.<br/>
    Then it "multiplies" all of your parameters together so you do not have to manually write a specific story for each test.<br/>
    <br/>
    <div style={{ display: 'table',verticalAlign:'top' }}>
      <div style={{display:'table-row'}}>
        <div style={{ display: 'table-cell',  width: '20%' }}>
          You type this:
        </div>
        <div style={{ display: 'table-cell', width: '20%' }}>
          You get documents:
        </div>
        <div style={{ display: 'table-cell', width: '60%' }}>
        And test results:
        </div>
      </div>      
      <div style={{ display: 'table-row',maxHeight:'400px' }}>
        <div style={{ display: 'table-cell', border: '1px solid grey', padding: '10px', width: '20%', verticalAlign: 'top' }}>
          <img src='/simpleSample.png' style={{maxWidth:'250px'}}/>
        </div>
        <div style={{ display: 'table-cell', border: '1px solid grey', padding: '10px', width: '20%' }}>    
          <ParameterDisplay data={shapeData} name='Shape Parameters' description='Explore your test values here:' />
        </div>
          <div style={{ display: 'table-cell',position:'relative', border: '1px solid grey', width: '60%', verticalAlign: 'top', overflow: 'auto',padding:'5px' }}>    
              <MultiTest
                target={<Shape/>}
                id='IntroPage'
                smallMode={true}
                test={
                  [ [shapeData.colorTest, 
                     shapeData.shapeTest, 
                     shapeData.borderTest] ]}
              />
        </div>
      </div>        
    </div>
    <br/>
    So if your component takes 3 parameters, and you want to test 3 values for each parameter you end up with 27 tests.<br/>
    All you need to do is list the parameter options you want to test for your component.  
    
    <h1>To see a more in-depth example, click "Let's explore a sample" in the menu...</h1>

    </div>
    );
  }
}


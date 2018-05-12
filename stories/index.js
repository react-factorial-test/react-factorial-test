import React from 'react';

import { storiesOf } from '@storybook/react';

import MultiTest from '../src/multiTest/MultiTest';
import ParameterDisplay from '../src/multiTest/ParameterDisplay';
import TestNameTool from '../src/multiTest/TestNameTool';

import JSXAddon from 'storybook-addon-jsx';
import { setOptions } from '@storybook/addon-options';
setOptions({ name:'react-factorial-test',showAddonPanel:false});

import '../static/TestCSS.css';

import SimpleMath              from '../src/exampleComponentsToTest/simpleMath/SimpleMath.jsx';
import simpleMathParametersRaw from '../src/exampleComponentsToTest/simpleMath/SimpleMathParameters.jsx';
var smData = TestNameTool(simpleMathParametersRaw); // name each test after it's variable name.


storiesOf('Introduction', module)
  .add('What is react-factorial-test?', () => (<div>Intro Page</div>))
  .add('How do we define parameter options?', () => (<div>Intro Page</div>))
  .add('How do multiply possible options to make tests?', () => (<div>Intro Page</div>))
  .add('What are the test focus buttons for?', () => (<div>Intro Page</div>))
  .add('Conclusion', () => (<div>Intro Page</div>))

storiesOf('Example - SimpleMath Component', module)
    .add('Introduction', () => (<div>
      <h2>SimpleMath</h2>
      This view component is intended to display the sum and product of three numbers.<br/>
    For example:<SimpleMath a='5' b='2' c='3'/><i>NOTE! There is a defect in the summation!  We can use these tests to fix it.</i><br/><br/>
    It should not display items that are not supplied:<SimpleMath a='5' /><br/>
    It should gracefully show error data:<SimpleMath a='gazelle' /><br/>
    </div>))
    .add('Parameter Documentation', () => (<ParameterDisplay name='SimpleMath' 
                                            description={
                                              <div>
                                              SimpleMath is a display only component to show only the provided numbers, their sum and their product.<br/>
                                              SimpleMath takes three parameters: a, b and c.<br/><br/>
                                              In this test suite each of the three parameters has a set of Normal values and a bunch of Evil values.<br/>
                                              This lets us check that the comopnent behaves well under stress,<br/>
                                              It also lets us watch the normal behavior without getting buried in error case handling.<br/><br/>
                                              Each parameter has 3 normal tests defined.<br/>
                                              When you take each of the 3 parameters and run each parameter's 3 normal tests, you'll get 9 tests total. (3+3+3)<br/>
                                              But when you run each parameter's values against each of the other parameter's values, you'll get 27 tests ouput. (3*3*3)<br/><br/>
                                              This parameter multiplication lets you very quickly define a comprehensive test suite for your component.<br/><br/>
                                              Click each test name to drill down to the parameters that the test supplies.
                                              </div>
                                            }
                                            data={smData}
                                            />))
  .add('Show A Tests Only', () => (
    <MultiTest
      target={<SimpleMath/>}
      test={
      [ [ smData.ATest.ANormalTest ] ]}
    />))
    .add('Show tests A, then B, then C.  Normal data only', () => (
      <MultiTest
        target={<SimpleMath/>}
        test={
        [ [ smData.ATest.ANormalTest ], 
          [ smData.BTest.BNormalTest ], 
          [ smData.CTest.CNormalTest ],
        ]}
      />))
    .add('A*B*C.  Normal data only', () => (
      <MultiTest
        target={<SimpleMath/>}
        test={
          [ // three lines of definition, 40 tests generated.
            [// pivot tests by object array data, plus normal and wide versions
              smData.ATest.ANormalTest, smData.BTest.BNormalTest, smData.CTest.CNormalTest,
            ],
          ]}
      />))
  .add('Just A*B, but include evil data', () => (
    <MultiTest
      target={<SimpleMath/>}
      test={
        [ [ smData.ATest, smData.BTest 
        ]]}
    />))
  .add('Show Only One Specific Test', () => (
    <MultiTest
      target={<SimpleMath/>}
      test={
        [ // three lines of definition, 40 tests generated.
          [// display only a single test, to show that the name works correctly
            smData.ATest.ANormalTest.a0Test
          ],
        ]}
    />))

import React from 'react';

// independent variable list: each variable may be is multipled by another variable to create a new test
// all test object names must end in the suffix 'Test'
// name your variables clearly, the variable name is used to describe the test being run.

const testData=
{
  ATest:{
    ANormalTest:{
      a0Test: { a: 0, _rft:'0 is falsey.  make sure 0 renders but that null does not get renderd' },
      a1Test: { a: 1, _rft:'normal test value' },
      a2Test: { a: 2.2, _rft:'make sure non-integers work' },
    },
    AEvilTest:{
      aNULLTest: { a: null, _rft:'this is the null value. simulates the property not being set' },
      a3Test: { a: '3', _rft:'make sure string numbers work' },
      a3sTest: { a: 'three', _rft:'make sure string word numbers do not work' },
      aWordTest: { a: 'apple', _rft:'make sure words show errors' },
      aHugeNumTest: {a : 999999999999, _rft:'make sure large numbers render correctly'}
    }
  },
  BTest:{
    BNormalTest:{
      b0Test: { b: 0, _rft:'0 is falsey.  make sure 0 renders but that null does not get renderd' },
      b3Test: { b: 3, _rft:'normal test value' },
      b63Test: { b: 6.3, _rft:'make sure non-integers work' },
      },
    BEvilTest:{
      bNULLTest: { b: null, _rft:'this is the null value. simulates the property not being set' },
      b3Test: { b: '3', _rft:'make sure string numbers work' },
      b3sTest: { b: 'three', _rft:'make sure string word numbers do not work' },
      bWordTest: { b: 'apple', _rft:'make sure words show errors' },
      bHugeNumTest: {b : 999999999999, _rft:'make sure large numbers render correctly'}
    }
  },
  CTest: {
    CNormalTest:{
      c0Test: { c: 0, _rft:'0 is falsey.  make sure 0 renders but that null does not get renderd' },
      c1Test: { c: 5, _rft:'normal test value' },
      c73Test: { c: 5.5, _rft:'make sure non-integers work' },
    },
    CEvilTest:{
      cNULLTest: { c: null, _rft:'this is the null value. simulates the property not being set' },
      c3Test: { c: '3', _rft:'make sure string numbers work' },
      c3sTest: { c: 'three', _rft:'make sure string word numbers do not work' },
      cWordTest: { c: 'apple', _rft:'make sure words show errors' },
      cHugeNumTest: {c : 999999999999, _rft:'make sure large numbers render correctly'}
    }    
  },
};

export default testData;

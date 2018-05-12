import React from 'react';

// independent variable list: each variable may be is multipled by another variable to create a new test
// all test object names must end in the suffix 'Test'
// name your variables clearly, the variable name is used to describe the test being run.

const testData=
{
  testATest:{
    a0Test: { a: 0 },
    a1Test: { a: 1 },
    a2Test: { a: 2 },
    a3Test: { a: '3' },
    a3sTest: { a: 'three' },
    aNULLTest: { a: null },
    aHugeNumTest: {a : 999999999999}
  },
  testBTest:{
    b0Test: { b: 0 },
    b1Test: { b: 1 },
    b2Test: { b: 2 },
  },
  testCTest: {
    c0Test: { c: 0 },
    c1Test: { c: 1 },
    c2Test: { c: 2 },
  },

};

export default testData;

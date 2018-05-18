
//--- Test Definition
const shapeParamData =
  {
    colorTest: {
      RTest: { color: 'red' },
      GTest: { color: 'green' },
      BTest: { color: 'blue' },
    },
    shapeTest: {
      SqaureTest:  { shape: 'square' },
      DiamondTest: { shape: 'diamond' },
      CircleTest:  { shape: 'circle' },
    },
    borderTest: {
      NoBorderTest:     { border: 'none' },
      SolidBorderTest:  { border: 'solid' },
      DashedBorderTest: { border: 'dashed' },
    },
  };

//--- Test Runner
/*
<MultiTest
  target={<Shape />}
  smallMode={true}
  test={
    [[shapeData.colorTest,
    shapeData.shapeTest,
    shapeData.borderTest]]}
/>
*/


export default shapeParamData;



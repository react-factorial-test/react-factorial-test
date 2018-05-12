

Build comprehensive component tests using set multiplication and side-by-side comparison of different states.




## Features



## Install for Use
```bash
npm i --save react-factorial-test
```

## Install for learning to use the test system
```bash
git clone https://github.com/react-factorial-test/react-factorial-test-documentation.git
cd react-factorial-test-documentation
npm install
npm run storybook
```

## Simple Usage
Links to documentation page.

```javascript
this.data = 
  [ {r:5,a:5,b:6,c:8,d:90},
    {r:4,a:5,b:6,c:8,d:90},
    {r:3,a:5,b:6,c:8,d:90},
    {r:2,a:5,b:6,c:8,d:90},
    {r:1,a:5,b:6,c:8,d:90}];

return(
<Grid
  data={this.data}
  onChange={(x,y,objKey,value)=>{ data[y][objKey]=value; }}  
/>
);
```



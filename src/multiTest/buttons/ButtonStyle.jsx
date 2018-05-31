const styles = {
  gb:{ 
    display: 'inline-block', 
    padding: '2px', 
    height: '120px', 
    width: '120px', 
    backgroundColor: 'lightgreen', 
    border: '1px solid black',

    '&:hover':{
      backgroundColor: 'teal', 
      transition: 'background-color .3s'
    },
  },
  myButton: {
    color: 'green',
    margin: { // jss-expand gives more readable syntax
      top: 5, // jss-default-unit makes this 5px
      right: 0,
      bottom: 0,
      left: '1rem'
    },
    '& span': { // jss-nested applies this to a child span
      fontWeight: 'bold' // jss-camel-case turns this into 'font-weight'
    }
  },
  myLabel: {
    fontStyle: 'italic'
  }
}

/**
 *
    position: 'relative',
    overflow: 'hidden',
    transform: 'translate3d(0, 0, 0)',

    '&:after': {
      content: '',
      display: 'inline-block',
      position: 'absolute',
      width: '18px',
      height: '18px',
      top: 0,
      left: 0,
      pointerEvents:'none',
      backgroundImage:'radial-gradient(circle, #000 10 %, transparent 10.01 %)',
      backgroundRepeat:'no-repeat',
      backgroundPosition:'50%',
      transform: 'scale(10, 10)',
      opacity: 0,
      transition: 'transform .5s, opacity 1s'
    },

    '&:active:after': {
      transform: 'scale(0, 0)',
      opacity: '.2',
      transition: '0s'
    },

 * 
 */

export default styles;
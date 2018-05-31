import React from 'react';
import UnFilterIcon from 'mdi-react/BookmarkRemoveIcon';

//import ButtonStyle from './ButtonStyle.jsx';
//import injectSheet from 'react-jss';


class UnFilter extends React.Component {
  constructor(props) {
    super(props); 
  }

  render() {
    
    return (
      <div style={{ display: 'inline-block', padding: '2px', height: '18px', backgroundColor: 'lightgreen', border: '1px solid black' }}
        onClick={this.props.onClick}
        title={this.props.title}
      >
        <UnFilterIcon width={18} height={18} />
      </div>
      );
  }
}

export default UnFilter;
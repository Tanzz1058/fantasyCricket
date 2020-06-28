import React, {Component} from 'react';
import styles from './PlayerNames.module.css';

class playerNames extends Component {
  render(){

    return(
      <div className = {styles.name} onClick = {this.props.clicked}>
        {this.props.name}
      </div>
    )
  }
}

export default playerNames;

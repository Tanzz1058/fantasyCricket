import React from 'react';
import styles from './SelectionItems.module.css';

const selectionItems = (props) =>{
  return(
    <div className = {styles.SelectionItems}>
    <h3>Your Selections</h3>
    <ul>
      <li>Batsmen <span>{props.bat}</span></li>
      <li>Bowlers <span>{props.ball}</span></li>
      <li>All Rounders <span>{props.ar}</span></li>
      <li>Wicket Keeper <span>{props.wk}</span></li>
    </ul>
    </div>
  )
}

export default selectionItems;

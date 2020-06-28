import React from 'react';
import styles from './SelectionBox.module.css';
import SelectionItems from '../../containers/SelectionItems/SelectionItems';

const selectionBox = (props) =>{
    return(
      <div className={styles.Box}>
        <ul>
          <SelectionItems ar = {props.ar}
                  wk = {props.wk}
                  bat = {props.bat}
                  ball = {props.ball}/>
        </ul>
      </div>
    )
  }


export default selectionBox;

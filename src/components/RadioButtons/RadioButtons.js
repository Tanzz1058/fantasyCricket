import React from 'react';
import styles from './RadioButtons.module.css';

const radioButton = (props) =>(
  <div className = {styles.radioButton}>
    <input type = 'radio' name = 'ctg' value = {props.ctg} onClick = {props.clicked} disabled = {props.disabled}/>
    <label>{props.ctg}</label>
  </div>
)

export default radioButton;

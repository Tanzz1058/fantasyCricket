import React from 'react';
import styles from './Button.module.css';

const button = (props) =>(
  <button type={props.type || "button"} className = {styles.Button} onClick = {(event)=> props.clicked && props.clicked (event)}>{props.children}</button>
)

export default button;

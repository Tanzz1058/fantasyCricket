import React from 'react';
import styles from './error.module.css';
import Button from '../../components/Button/Button';

const errBox = (props) =>{
  return(
    <div className = {styles.box} style = {{
               transform: props.err ? 'translateY(0)' : 'translateY(-100vh)'
             }}>
      <h3>{props.msg}</h3>
      <Button clicked = {props.close}>OK</Button>
    </div>
  )
}

export default errBox;

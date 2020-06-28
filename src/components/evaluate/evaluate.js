import React from 'react';
import styles from './evaluate.module.css';
import Dropdown from '../../containers/Dropdown/Dropdown';

const evaluate = (props) =>{
  return(
    <div className = {styles.box} style = {{
               transform: props.evlOpen ? 'translateY(0)' : 'translateY(-200vh)'
             }}>
      <h3>Evaluate the Performance of your fantasy team</h3>
      <Dropdown evlClose = {props.evlClose}/>
    </div>
  )
}

export default evaluate;

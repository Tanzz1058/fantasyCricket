import React from 'react';
import styles from './SideButton.module.css'

const sideButton = (props) =>{

  return(
    <div className={styles.navPane}>
  <div className={styles.dropdown}>
  <button className={styles.dropbtn}>MANAGE TEAMS</button>
  <div className={styles.dropdownContent}>
    <button onClick = {props.clicked1}>NEW TEAM</button>
    <button onClick = {props.clicked4}>OPEN TEAM</button>
    <button onClick = {props.clicked2}>SAVE TEAM</button>
    <button onClick = {props.clicked3}>EVALUATE TEAM</button>
  </div>
</div>
</div>
  )
}
export default sideButton;

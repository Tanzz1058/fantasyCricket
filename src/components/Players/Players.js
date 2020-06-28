import React  from 'react';
import styles from './Players.module.css';

const player =(props) =>{
  return(
    <div style = {{display: 'inline-block',
                  verticalAlign: 'top',
                  marginRight: '100px'}}>
        <div style = {{margin: '10px 60px'}}>
          <h3>Players</h3>
        </div>
        <div className = {styles.PlayersList}>
              {props.players.map(p =>(
                  <li key = {p}>{p}</li>
                ))}
        </div>
    </div>
  )
}
export default player;

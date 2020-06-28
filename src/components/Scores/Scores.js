import React, {Component} from 'react';
import styles from './Scores.module.css'

class SelectedPlayers extends Component{


  render(){
    return(
    <div style = {{display: 'inline-block'
                 }}>
      <div style = {{margin: '10px 60px'}}>
        <h3>Scores {this.props.scores.reduce((s,e) =>s+e,0)}</h3>
      </div>
      <div className = {styles.SelectedPlayersList}>
       {this.props.scores.map((_,s)=>(
         <li key = {s}>{_}</li>
       ))}
      </div>
    </div>
    )
  }
}

export default SelectedPlayers;

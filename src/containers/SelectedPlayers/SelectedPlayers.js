import React, {Component} from 'react';
import styles from './SelectedPlayers.module.css';

class SelectedPlayers extends Component{
  render(){
    return(
    <div style = {{display: 'inline-block'
                 }}>
      <div style = {{margin: '10px 60px'}}>
        <h3>Points Used  <span>{this.props.points}</span></h3>
      </div>
      <div className = {styles.SelectedPlayersList}>
       <h4 style = {{textAlign: 'left', marginLeft: '10px'}}>Team Name: <span>{this.props.teamName}</span></h4>
        {this.props.selectedPlayers.map(player=>{
          return(
         <li key = {player} onClick = {() =>this.props.clicked(player)}>{player}</li>
       )})}
      </div>
    </div>
    )
  }
}

export default SelectedPlayers;

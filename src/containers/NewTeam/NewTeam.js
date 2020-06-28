import React, {Component} from 'react';
import styles from './NewTeam.module.css';
import Button from '../../components/Button/Button';

class newTeam extends Component {

  render(){
    return(
      <div className = {styles.box} style = {{
                 transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)'
               }}>
        <h3>Please enter the name of your team</h3>
      <form onSubmit = {(event)=>this.props.teamNameHandler(event)}>
        <input type = 'text' onChange = {(event)=>this.props.changed(event)}/>
        <p>{this.props.validValue}</p>
        <Button type = 'submit'>OK</Button>
        <Button clicked = {this.props.cancel}>Cancel</Button>
      </form>
      </div>
    )
  }
}

export default newTeam;

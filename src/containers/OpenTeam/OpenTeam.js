import React, {Component} from 'react';
import styles from './OpenTeam.module.css';
import Button from '../../components/Button/Button';
import axios from '../../axios-base';

class openTeam extends Component{
  state = {
    team: []
  }
  componentDidMount(){
    axios.get('/teams.json')
    .then(res =>{
      let temp = [];
      for (let key in res.data){
        temp.push({
          ...res.data[key],
           id: key});
      }
      this.setState({team: temp});
    }).catch(err=>{console.log(err.message)})
  }
  onselect = (e)=>{
  const key =  (this.state.team.find(option => option.teamName === e.target.value)||{} ).id;
    this.setState({id:key, t:e.target.value});
  }
  render(){
    return(
      <div className = {styles.box} style = {{
                 transform: this.props.showOTH ? 'translateY(0)' : 'translateY(-100vh)'
               }}>
        <h3>Please choose your team</h3>
        <select className = {styles.select} onChange={this.onselect} id = 'Team'>
        <option value="">Team</option>
          {this.state.team.map(t=>(
            <option key = {t.id} id = {t.id} value = {t.teamName}>{t.teamName}</option>
          ))}
          </select>
        <Button clicked = {()=>this.props.clicked(this.state.id, this.state.t)}>OK</Button>
      </div>
    )
  }


}

export default openTeam;

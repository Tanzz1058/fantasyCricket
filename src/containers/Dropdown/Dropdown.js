import React, {Component} from 'react';
import styles from './Dropdown.module.css';
import axios from '../../axios-base';
import Players from '../../components/Players/Players';
import Scores from '../../components/Scores/Scores';
import Button from '../../components/Button/Button';

let matches = [];

class Dropdown extends Component{
  state = {
    team: [],
    players: [],
    t: '',
    m: '',
    id: '',
    scrs: [],
    points: 0
  }
  calculate = () =>{
    axios.get('/teams/'+this.state.id+'/players.json')
    .then(res=>{
      this.setState({players: res.data});
      let scrs = [];
      for(let key in this.state.players){
        axios.get('/matches/'+this.state.m+'/'+this.state.players[key]+'.json')
        .then(r =>{
          const f = r.data.frs;
          const s = r.data.sxs*2;
          const o = Math.round((r.data.scrd-(r.data.frs*4)-(r.data.sxs*6))/2);
          const t = r.data.scrd/r.data.fcd;
          const w = r.data.wkts*10;
          const c = r.data.ctchs*10;
          const stmpn = r.data.stmpn*10;
          const ro = r.data.ro*10;
          const er = r.data.gvn/(r.data.bwld/6);
          let scr = f+s+o+w+ro+stmpn+c;
          if(r.data.scrd <100 && r.data.scrd>49){
            scr +=5;
          }
          if(r.data.wkts === 3){
            scr+=3
          }
          if(r.data.wkts === 5 || r.data.wkts>5){
            scr+=10
          }
          if(r.data.scrd >99) {
            scr +=10;
          }
          if(t<101 && t>79){
            scr+=2;
          }
          if(t>100){
            scr+=4;
          }
          if(er >3.5 || er === 3.5){
            scr+=4;
          }
          if((er >2 && er< 3.5)|| er=== 2 ){
            scr+=7;
          }
          if(er < 2){
            scr+=10;
          };
          scrs.push(scr);
          this.setState({scrs:scrs});
        }

      )
        .catch(e =>console.log(e))
      }

    })
  }
  componentDidUpdate(){
    axios.get('/matches.json')
    .then(res =>{
      matches = Object.keys(res.data);
    })
    .catch(err=>{console.log(err.message)});

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
      <div>
      <select className = {styles.select} onChange={this.onselect} id = 'Team'>
      <option value="">Team</option>
        {this.state.team.map(t=>(
          <option key = {t.id} id = {t.id} value = {t.teamName}>{t.teamName}</option>
        ))}
        </select>
        <select className = {styles.select} id ='Match' onChange={e => this.setState({m: e.target.value})}>
          <option value="">Match</option>
        {matches.map(m=>(
          <option key = {m} value = {m}>{m}</option>
        ))}
      </select>
      <hr/>
      <div>
      <Players players = {this.state.players}/>
      <Scores scores = {this.state.scrs} />
      </div>
      <Button clicked = {this.props.evlClose}>OK</Button>
      <Button clicked = {this.calculate}>CALCULATE</Button>
    </div>

    )
  }
}

export default Dropdown;

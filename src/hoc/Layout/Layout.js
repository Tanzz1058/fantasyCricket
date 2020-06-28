import React, {Component} from 'react';
import Aux from '../Auxiliary';
import SideButton from '../../components/SideButton/SideButton';
import Evaluate from '../../components/evaluate/evaluate';
import SelectionBox from '../../components/SelectionBox/SelectionBox';
import PlayersList from '../../containers/PlayersList/PlayersList';
import SelectedPlayers from '../../containers/SelectedPlayers/SelectedPlayers';
import NewTeam from '../../containers/NewTeam/NewTeam';
import OpenTeam from '../../containers/OpenTeam/OpenTeam';
import ErrorBox from '../../components/error/error';
import axios from '../../axios-base';

let selected = [];
let pAvl = 1000;
let pUsed = 0;
let bat = 0;
let ball= 0;
let ar = 0;
let wk = 0;

class layout extends Component{
  state = {
    id: '',
    t: '',
    show: false,
    showOTH: false,
    evlOpen: false,
    disabled: true,
    validValue: null,
    teamName: '',
    selectedPlayersArray: [],
    pointsUsed: 0,
    pointsAvl: 1000,
    err: false,
    msg: '',
    bat: 0,
    ball: 0,
    ar: 0,
    wk: 0,
    saved: false
  }
  teamNameHandler = (event)=>{
    event.preventDefault();
    if(this.state.teamName.trim() === ''){
      this.setState({validValue: 'Please enter a valid value'})
    }

    else{
      pAvl = 1000;
      pUsed = 0;
      bat = 0;
      ball= 0;
      ar = 0;
      wk = 0;
      selected = [];
      this.setState({
                    pointsUsed:pUsed,
                    pointsAvl:pAvl,
                    bar:bat,
                    ball:ball,
                    ar:ar,
                    wk:wk,
                    selectedPlayersArray:selected,
                    show: false,
                    disabled: false,
                    saved: false})
    }
    }

  newTeamHandler = () =>{
    this.setState({show: true})
  }

  cancelHandler = () =>{
    this.setState({show: false})
  }
  teamNameChangeHandler = (event) =>{
    this.setState({teamName: event.target.value})
    if(this.state.teamName.trim() === ''){
      this.setState({validValue: 'Please enter a valid value'})
    }else{
      this.setState({validValue: ''})
    }
  }

  selectedListHandler = (name) =>{
    if(selected.length === 11){
      this.setState({err: true, msg: 'You cannot choose more than 11 players'})
    }
    if(! selected.some(p => p === name) && selected.length < 11){
      axios.get('/stats/'+encodeURI(name)+'.json')
      .then(res =>{
        const value = res.data.value;
        if(value > this.state.pointsAvl){
            this.setState({err: true, msg: 'Insufficient points'})
        }
        else if(this.state.wk === 1 && res.data.ctg === 'WK'){
          this.setState({err: true, msg: 'You cannot choose more than 1 wicket keeper'})
        }
        else{
          selected.push(name);
          this.setState({selectedPlayersArray: selected});
          pAvl -= value;
          pUsed += value;
          switch(res.data.ctg){
            case 'BAT':
            bat ++;
            break;
            case 'BWL':
            ball ++;
            break;
            case 'AR':
            ar ++;
            break;
            case 'WK':
            wk++;
            break;
            default:
            break;
          }
          this.setState({pointsUsed: pUsed, pointsAvl: pAvl, ball: ball, bat: bat, ar: ar, wk:wk})}

      }).catch(error =>{
        console.log(error.message);
      })
    }
  }

clickedSelectedPlayer = (id) =>{
selected = selected.filter(player => player !== id);
  this.setState({selectedPlayersArray: selected});
  axios.get('/stats/'+encodeURI(id)+'.json')
  .then(res =>{
    const value = res.data.value;
    pAvl += value;
    pUsed -= value;
    switch(res.data.ctg){
      case 'BAT':
      bat --;
      break;
      case 'BWL':
      ball --;
      break;
      case 'AR':
      ar --;
      break;
      case 'WK':
      wk --;
      break;
      default:
      break;
    }
    this.setState({pointsUsed: pUsed, pointsAvl: pAvl, ball: ball, bat: bat, ar: ar, wk:wk})
  }).catch(error =>{
    console.log(error.message);
  })
}

saveTeamHandler = () =>{
  if(this.state.selectedPlayersArray.length < 11){
    this.setState({err: true, msg:'Please select a team of 11 players'})
  }
  else{
    const team = {
      teamName : this.state.teamName,
      players : this.state.selectedPlayersArray,
      pointsUsed : this.state.pointsUsed,
      pointsAvl : this.state.pointsAvl,
      Bat: this.state.bat,
      Ball: this.state.ball,
      Ar: this.state.ar,
      Wk: this.state.wk
    }
    if(this.state.saved){
      axios.delete('/teams/'+this.state.id+'.json', team);
    }
    axios.post('/teams.json', team)
    .then(response =>{
      this.setState({err: true, msg:'Team '+this.state.teamName+' is created'})
    }).catch(error =>{
      console.log(error.message);
    })
  }

}
closeErrBox = () =>{
  this.setState({err: false})
}
evalTeamHandler = () =>{
  this.setState({evlOpen: true})
}
evlClose = () =>{
  this.setState({evlOpen: false})
}
openTeamHandler = () =>{
  this.setState({showOTH: true})
}
closeOTH = (id, t) =>{
  selected = [];
  this.setState({showOTH:false,disabled:false});
  axios.get('teams/'+id+'.json')
  .then(r=>{
    pAvl = r.data.pointsAvl;
    pUsed = r.data.pointsUsed;
    bat = r.data.Bat;
    ball= r.data.Ball;
    ar = r.data.Ar;
    wk = r.data.Wk;
    for(let key in r.data.players)    {
      selected.push(r.data.players[key])
    }
    this.setState({teamName:t,
                  id:id,
                  pointsUsed:pUsed,
                  pointsAvl:pAvl,
                  bar:bat,
                  ball:ball,
                  ar:ar,
                  wk:wk,
                  saved: true,
                selectedPlayersArray:selected})

  })
  .catch(e=>
    this.setState({err: true, msg:e.message})
  )

}
  render(){
    return(
      <Aux>
          <SideButton clicked1 = {() =>this.newTeamHandler()}
                       clicked2 = {() => this.saveTeamHandler()}
                       clicked3 = {() => this.evalTeamHandler()}
                       clicked4 = {() => this.openTeamHandler()}/>
                    <OpenTeam clicked = {this.closeOTH}
                       showOTH = {this.state.showOTH}/>
          <NewTeam show = {this.state.show}
            changed = {this.teamNameChangeHandler}
            validValue = {this.state.validValue}
            cancel = {()=>this.cancelHandler()}
            teamNameHandler = {this.teamNameHandler}/>
          <Evaluate evlOpen = {this.state.evlOpen}
                    evlClose = {this.evlClose}/>
          <ErrorBox close = {this.closeErrBox} msg = {this.state.msg} err = {this.state.err}/>
          <SelectionBox ar = {this.state.ar}
                  wk = {this.state.wk}
                  bat = {this.state.bat}
                  ball = {this.state.ball}/>
          <PlayersList points = {this.state.pointsAvl}
            disabled = {this.state.disabled}
            clicked = {this.selectedListHandler}
            />
          <SelectedPlayers teamName = {this.state.teamName}
            points = {this.state.pointsUsed} selectedPlayers = {this.state.selectedPlayersArray}
            clicked = {this.clickedSelectedPlayer}/>
      </Aux>
    )
  }
}

export default layout;

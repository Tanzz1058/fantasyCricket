import React, {Component} from 'react';
import PlayerNames from '../PlayerNames/PlayerNames';
import styles from './PlayersList.module.css';
import RadioButtons from '../../components/RadioButtons/RadioButtons';
import Spinner from '../../UI/Spinner/Spinner';
import axios from '../../axios-base';

class PlayersList extends Component{

  state = {
    categoryList: null,
    loading: false,
    tooltip: []

  }

  radioButtonClickHandler = (ctg) =>{
    this.setState({loading: true})
    let categoryArray = [];
    axios.get('/category/'+ctg+'.json')
    .then(response =>{
      categoryArray = Object.keys(response.data);
      this.setState({categoryList: categoryArray,loading: false})
    })
    .catch(error =>{
      console.log(error.message);
    })
  }



componentDidMount(){
    let tempArray = [];
    let tooltipArray = [];
    axios.get('/stats.json')
    .then(r =>{
      for(let key in r.data){
        tempArray.push({
          ...r.data[key],
           id: key
        })
      }

      tooltipArray = Object.values(tempArray);
          this.setState({tooltip:tooltipArray})
    })
    .catch(error =>{
      console.log(error.message);
    })

}

  render(){
    const ctg = [
      'BAT', 'BWL', 'AR', 'WK'
    ]

    let playerNames = null;

    if(this.state.loading){
      playerNames = <Spinner/>
    }

    if(this.state.categoryList){

      playerNames = this.state.categoryList.map(player =>(
        <PlayerNames key = {player}
                    name = {player}
                    clicked = {() =>this.props.clicked(player)}
                  />
      ))}

    return(
      <div style = {{display: 'inline-block',
                    verticalAlign: 'top',
                    marginRight: '100px'}}>
          <div style = {{margin: '10px 60px'}}>
            <h3>Points Available   <span>{this.props.points}</span></h3>
          </div>
          <div className = {styles.PlayersList}>
                <div style = {{display: 'flex'}}>
                {ctg.map(ctg =>(
                  <RadioButtons key = {ctg}
                                ctg = {ctg}
                                clicked = {() =>this.radioButtonClickHandler(ctg)}
                                disabled = {this.props.disabled}/>
                ))}
                </div>
              {playerNames}
          </div>
      </div>
    )
  }
}

export default PlayersList;

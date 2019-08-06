import React from 'react';
import axios from 'axios'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      card: '',
      followers: [],
      login: 'dustinmyers'
    }
  }

  componentDidMount= () => {
    this.fetchData()
    this.fetchFollowers()
  }
    

  fetchData = () => {
    fetch(`https://api.github.com/users/${this.state.login}`)
      .then(response => {
        return response.json()
    })
      .then( (response) => {
          this.setState({card: response})
        })
      .catch(function (response){
          console.log(response)
        })
  }

  fetchFollowers = () => {
    fetch(`https://api.github.com/users/${this.state.login}/followers`)
      .then(response => {
        return response.json()
    })
      .then( (response) => {
          this.setState({followers: response})
        })
      .catch(function (response){
          console.log(response)
        })
  }   

  
  render() {
    return(
      <div className='card'>
      {console.log(this.state)}
        <h1>{this.state.card.login}</h1>
        {this.state.followers.map(follower => {
          return <p>{follower.login}</p>
        })}
      </div>
    )
  }
}

export default App;

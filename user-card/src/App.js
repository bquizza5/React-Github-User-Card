import React from 'react';
import './App.css'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      card: '',
      followers: [],
      login: undefined
    }
  }

  componentDidMount= () => {
    this.fetchData()
    this.fetchFollowers()
  }

  // componentDidUpdate = () => {
  //   this.fetchData()
  //   this.fetchFollowers()
  // }
    

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

  newUser = (user) => {
    this.setState({login: user})
    setTimeout(() => {
      this.fetchData()
      this.fetchFollowers()
    }, 100);
    setTimeout(() => {
      this.setState({
      login: ''
    });
    }, 110)
    
    
  }

  handleChanges = e => {
    this.setState({
      login: e.target.value
    });
  };

  submitHandler = (e) => {
    e.preventDefault()
    this.fetchData()
    this.fetchFollowers()
    this.setState({
      login: ''
    });

  } 

  
  render() {
    return(
      <div className='card'>
      <form onSubmit={this.submitHandler}>
        <input 
        value={this.state.login} 
        onChange={this.handleChanges}
        placeholder={'search for ID'} 
        />
      </form>
      {console.log(this.state)}
        <img className='userAvatar' src={this.state.card.avatar_url} />
        <h1 className='name'>{this.state.card.login}</h1>
        <p className='location'>{this.state.card.location}</p>
        <h2>Followers:</h2>
        <div className='followers'>
        {this.state.followers.map(follower => {
          return(
            <div key={follower.login} className='follower'> 
            <img className='avatar' src={follower.avatar_url} />
            <a onClick={() => this.newUser(follower.login)}>{follower.login}</a>
            </div>
            )
        })}
        </div>
      </div>
    )
  }
}

export default App;

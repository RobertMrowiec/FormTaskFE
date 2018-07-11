import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import React, {Component} from 'react'
import TextField from '@material-ui/core/TextField'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      date: ''
    }
    this.blankState = this.state
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
  }
  
  reset = () => {
    return this.setState(this.blankState)
  }

  send = () => {
    fetch('localhost:8030/api/events', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(this.state)
    }).then(res => {
      
    }).catch(() => console.log)
  }
  render() {
    return (
      <div className='App'>
        <AppBar position='static' color='primary'>
          <Toolbar>
            <Typography variant='title' color='inherit'>
              Event App
            </Typography>
          </Toolbar>
        </AppBar>

        <div>

          <TextField
            className='Form'
            id='firstName'
            label='First name'
            margin='normal'
            onChange={this.handleChange('firstName')}
            required
            value={this.state.firstName}
          />
          <br/>

          <TextField
            className='Form'
            id='lastName'
            label='Last name'
            margin='normal'
            onChange={this.handleChange('lastName')}
            required
            value={this.state.lastName}
          />
          <br/>

          <TextField
            className='Form'
            id='email'
            label='Email'
            margin='normal'
            onChange={this.handleChange('email')}
            required
            value={this.state.email}
          />
          <br/>

          <TextField
            className='Form'
            id='date'
            InputLabelProps={{
              shrink: true
            }}
            label='Date'
            margin='normal'
            onChange={this.handleChange('date')}
            required
            type='date'
            value={this.state.date}
          />
        </div>

        <div>
          
          <Button color='primary'>
            Send
          </Button>

          <Button color='secondary' onClick={this.reset}>
            Reset
          </Button>

        </div>
      </div>
    )
  }
}

export default App

import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import React, {Component} from 'react'
import TextField from '@material-ui/core/TextField'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import * as EmailValidator from 'email-validator';
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: '',
      dataError: false,
      email: '',
      emailError: false,
      firstName: '',
      firstNameError: false,
      lastName: '',
      lastNameError: false
    }
    this.blankState = this.state
  }

  emailValidation = (email, errorName) => event => {
    this.handleChange(email, event.target.value)
    const tempErr = !EmailValidator.validate(event.target.value) ? true : false
    this.handleChange(errorName, tempErr)
  }

  validationString = (name, errorName) => event  => {
    event.target.value = event.target.value.replace(/\s/g, '');
    this.handleChange(name, event.target.value)
    const tempErr = event.target.value.length < 3 ? true : false
    this.handleChange(errorName, tempErr)
  }

  handleChange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };
  
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
            error={this.state.firstNameError}
            id='firstName'
            label='First name'
            margin='normal'
            onChange={this.validationString('firstName', 'firstNameError')}
            required
            type="string"
            value={this.state.firstName}
          />
          <br/>

          <TextField
            className='Form'
            error={this.state.lastNameError}
            id='lastName'
            label='Last name'
            margin='normal'
            onChange={this.validationString('lastName', 'lastNameError')}
            required
            type="string"
            value={this.state.lastName}
          />
          <br/>

          <TextField
            autoComplete="false"
            className='Form'
            error={this.state.emailError}
            id='email'
            label='Email'
            margin='normal'
            onChange={this.emailValidation('email', 'emailError')}
            required
            type="string"
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

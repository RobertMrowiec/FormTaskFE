import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import React, {Component} from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import TextField from '@material-ui/core/TextField'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import * as EmailValidator from 'email-validator';
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date().toISOString().substr(0,10),
      dataError: false,
      email: '',
      emailError: false,
      firstName: '',
      firstNameError: false,
      lastName: '',
      lastNameError: false,
      open: false,
      message: ''
    }
    this.blankState = this.state
  }

  emailValidation = (email, errorName) => event => {
    const val = event.target.value
    this.handleChange(email, val)
    this.handleChange(errorName, !EmailValidator.validate(val))
  }

  stringValidation = (name, errorName) => event => {
    const val = event.target.value.replace(/\s/g, '')
    this.handleChange(name, val)
    this.handleChange(errorName, val.length < 3)
  }

  handleChange = (name, value) => {
    this.setState({
      [name]: value
    });
  };
  
  handleDateChange = () => event => {
    this.setState({
      'date': event.target.value
    })
  }
  reset = () => {
    return this.setState(this.blankState)
  }

  send = () => {
    const newObject = (({ firstName, lastName, email, date }) => ({ firstName, lastName, email, date }))(this.state);

    for (let key in newObject) {
      if (newObject[key] === "") {
        const tmpKey = key + "Error"
        console.log(tmpKey)
        this.setState({[tmpKey]: true})
      }
    }

    fetch('http://localhost:8030/api/events', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(newObject)
    }).then(async res => {
      const ctx = await res.json()
      this.setState({
        open: true,
        message: await ctx.message
      })
      return ctx
    }).then(ctx => {
      if (ctx.saved) setTimeout(() => this.reset(), 2000)

      setTimeout(() => this.setState({open: false}), 2000)
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
            error={this.state.firstNameError}
            id='firstName'
            label='First name'
            margin='normal'
            onChange={this.stringValidation('firstName', 'firstNameError')}
            required
            type="string"
            value={this.state.firstName}
          />
          <br/>

          <TextField
            error={this.state.lastNameError}
            id='lastName'
            label='Last name'
            margin='normal'
            onChange={this.stringValidation('lastName', 'lastNameError')}
            required
            type="string"
            value={this.state.lastName}
          />
          <br/>

          <TextField
            autoComplete="false"
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
            id='date'
            InputLabelProps={{
              shrink: true
            }}
            label='Date'
            margin='normal'
            onChange={this.handleDateChange()}
            required
            type='date'
            value={this.state.date}
          />
        </div>

        <div>
          
          <Button color='primary' onClick={this.send}>
            Send
          </Button>

          <Button color='secondary' onClick={this.reset}>
            Reset
          </Button>

        </div>

        <Snackbar
          open={this.state.open}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={this.state.message}
        />

      </div>
    )
  }
}

export default App

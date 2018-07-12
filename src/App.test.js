import App from './App'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import React from 'react'
import sinon from 'sinon'
import enzyme from 'enzyme'
import Snackbar from '@material-ui/core/Snackbar'
import TextField from '@material-ui/core/TextField'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { shallow } from 'enzyme';

describe('Event Form', () => {

  it('should render four <TextField /> components', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(TextField).length).toEqual(4)
  });

  it('should render two <Button /> components', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Button).length).toEqual(2)
  });

  it('should render four <AppBar /> components', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(AppBar).length).toEqual(1)
  });

  it('should render four <Toolbar /> components', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Toolbar).length).toEqual(1)
  });

  it('should render four <Typography /> components', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Typography).length).toEqual(1)
  });

  it('should simulate reset button click', () => {
    const onButtonClick = sinon.spy();
    const wrapper = shallow(
      <Button color='secondary' onClick={onButtonClick}> 
        {"Reset"}
      </Button>
    );
    wrapper.find('Button').simulate('click');
    expect(onButtonClick.calledOnce).toEqual(true);
  });

  it('should simulate send button click', () => {
    const onButtonClick = sinon.spy();
    const wrapper = shallow(
      <Button color='secondary' onClick={onButtonClick}> 
        {"Send"}
      </Button>
    );
    wrapper.find('Button').simulate('click');
    expect(onButtonClick.calledOnce).toEqual(true);
  });

  it('should open snackbar on {this.state.open:true}', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Snackbar).length).toEqual(1);
  }) 

  it('should call handleDateChange with input value for TextField with firstName value', () => {
    const handleDateChange = jest.fn();
    const component = enzyme.mount(<TextField id='date' onChange={handleDateChange("2019-02-01")} />);
    component.find(TextField).simulate('change');
    expect(handleDateChange).toBeCalledWith("2019-02-01");
  });
  
  it('should call stringValidation with input value for TextField with firstName value', () => {
    const stringValidation = jest.fn();
    const component = enzyme.mount(<TextField id='firstName' onChange={stringValidation('firstName', 'firstNameError')} />);
    component.find(TextField).simulate('change');
    expect(stringValidation).toBeCalledWith('firstName', 'firstNameError');
  });

  it('should call stringValidation with input value for TextField with lastName value', () => {
    const stringValidation = jest.fn();
    const component = enzyme.mount(<TextField id='lastName' onChange={stringValidation('lastName', 'lastNameError')} />);
    component.find(TextField).simulate('change');
    expect(stringValidation).toBeCalledWith('lastName', 'lastNameError');
  });

  it('should call emailValidation with input value for TextField with firstName value', () => {
    const emailValidation = jest.fn();
    const component = enzyme.mount(<TextField id='firstName' onChange={emailValidation('email', 'emailError')} />);
    component.find(TextField).simulate('change');
    expect(emailValidation).toBeCalledWith('email', 'emailError');
  });

});

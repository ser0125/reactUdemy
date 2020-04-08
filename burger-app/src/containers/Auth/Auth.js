import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actionsAuth from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { updateObject, checkValidity } from '../../shared/utility';
class Auth extends Component {
  state = {
    controls: {
      email: {
        elementtype: 'input',
        elementconfig: {
          type: 'email',
          placeholder: 'Mail Address'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
        password: {
          elementtype: 'input',
          elementconfig: {
            type: 'password',
            placeholder: 'Password'
          },
          value: '',
          validation: {
            required: true,
            minLength: 6
          },
          valid: false,
          touched: false
        },
      },
      isSignUp: true
  }

  componentDidMount() {
    if(!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath();
    }
  }

  inputChangedHandler = (event, controlName) => {
    const updateControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      })
    });
    this.setState({
      controls: updateControls
    })
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        isSignUp: !prevState.isSignUp
      }
    })
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
  }

  render () {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    };

    let form = formElementsArray.map(formElement => (
      <Input 
        key={formElement.id}
        elementtype={formElement.config.elementtype} 
        elementconfig={formElement.config.elementconfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event)=> this.inputChangedHandler(event, formElement.id)}/>
           ));

           if(this.props.loading) {
            form = <Spinner />
           }
      let errorMessage = null;

           if(this.props.error) {
            errorMessage = (
            <p>{this.props.error.message}</p>
            )
           }
      let authRedirect = null;
      if(this.props.isAuthenticated) {
        authRedirect = <Redirect to={this.props.authRedirectPath}/>
      }

    return (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
        <Button btnType="Success">SUBMIT</Button>
        </form>
        <Button 
        click={this.switchAuthModeHandler}
        btnType="Danger">SWITCH TO {this.state.isSignUp ? 'SIGNIN' : 'SIGNUP'}</Button>
      </div>
    )
  }
}

const mapStateToProps  = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) => dispatch(actionsAuth.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: () => dispatch(actionsAuth.setAuthRedirectPath('/'))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
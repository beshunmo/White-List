import React, { Component } from 'react';
import { Route } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sendLoginAC } from '../redux/actions/login-actions';
import { selectLogin } from '../redux/selectors/login-selectors';

const mapStateToProps = state => ({
  login: selectLogin(state)
})

const mapDispatchToProps = dispatch => bindActionCreators({
  sendLogin: sendLoginAC
}, dispatch);

class LoginPage extends Component {
  handleChangeLogin = (e) => {
    this.setState({ login: e.target.value });
  }

  handleClickButton = (e) => {
    e.preventDefault();
    this.props.sendLogin(this.state.login);

    console.log(this.props.login);
  }

  render() {
    if (this.props.login) {
      return <Route to='/' />
    }
    return (
      <div>
        <input type="text" onChange={this.handleChangeLogin} />
        <button onClick={this.handleClickButton}>Войти</button>
      </div>
    )
  }
};

const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
export default Login;

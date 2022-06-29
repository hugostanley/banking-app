import React from 'react'
import LoginForm from '../components/LoginForm'
import '../../css/login.css'

const Login = () => {
  return (
    <div className='two-col'>
      <Logo />
      <LoginForm />
    </div>
  )
}

const Logo = () => {
  return (
    <div className='col'>
      <img
        src={require('../../assets/logo.png')}
        className='logo'
        alt='logo'
      ></img>
    </div>
  )
}

export default Login

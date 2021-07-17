import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { UserContext } from './contexts/UserContext'
import { API, configJSON, setAuthToken } from './config/api'

import Home from './pages/Home'
import Header from './components/Header/Header'
import DetailProperty from './pages/DetailProperty'
import MyHouses from './pages/MyHouses'
import AddProperty from './pages/AddProperty'
import Profile from './pages/Profile'
import Booking from './pages/Booking'
import History from './pages/History'
import PrivateRoute from './components/route/PrivateRoute'

function App() {
  const [user, setUser] = useState({})

  const handleSignIn = async (username, password) => {
    const data = {
      username,
      password,
    }

    const response = await API.post('/signin', data, configJSON)

    if (response.data.status === 'failed') {
      return console.log(`Error: ${response.data.message}`)
    }

    const userData = response.data.data

    if (userData) {
      setUser({ ...userData })
      setAuthToken(userData.token)
      localStorage.setItem('user', JSON.stringify(userData))
      window.location.href = '/'
    }
  }

  const handleSignUp = async (data) => {
    const response = await API.post('/signup', data, configJSON)
    const userData = response.data.data

    if (userData.username) {
      setUser({ ...userData })
      setAuthToken(userData.token)
      localStorage.setItem('user', JSON.stringify(userData))
      window.location.href = '/'
    }
  }

  const handleLogOut = () => {
    // bersihkan state, localstorage, dan token
    // redirect ke halaman home
    setUser(null)
    localStorage.clear()
    setAuthToken()
    window.location.href = '/'
  }

  useEffect(() => {
    // get username (if exists)
    const userData = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null

    // get token (if exists)
    if (userData) {
      if (userData.token) {
        setAuthToken(userData.token)
      }
      setUser({ ...userData })
    }
  }, [])

  return (
    <UserContext.Provider
      value={{
        userState: user,
        setUser,
        handleSignIn: handleSignIn,
        handleSignUp: handleSignUp,
        handleLogOut: handleLogOut,
      }}
    >
      <Router>
        <Switch>
          <Route exact path='/'>
            <Home userState={user} />
          </Route>
          <PrivateRoute exact path='/booking' component={Booking} />
          <PrivateRoute exact path='/history' component={History} />
          <PrivateRoute exact path='/profile/:username' component={Profile} />
          <Route path='/detail/:id'>
            <Header />
            <DetailProperty />
          </Route>
          <PrivateRoute exact path='/addproperty' component={AddProperty} />
          <PrivateRoute exact path='/myhouses' component={MyHouses} />
          <Route path='*'>
            <h1>Sorry, this page doesn't exist</h1>
            <Link to='/'>Back to home</Link>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  )
}

export default App

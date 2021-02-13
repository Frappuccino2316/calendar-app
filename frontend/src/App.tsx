import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Auth from './components/Auth'
import Home from './pages/Home'
import Login from './pages/Login'
import './App.css'

function App() {
  // const [teams, setTeams] = React.useState([])

  // React.useEffect(() => {
  // axios
  //   .get('http://localhost:8000/api/v1/teams/', {
  //     headers: {
  //       Authorization:
  //         'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjEzMDUzNTA1LCJqdGkiOiJmMWEyMWU4ZDAwODQ0YmQ4OWQxYjJiYTVmZGZiZDJlMSIsInVzZXJfaWQiOjJ9.nRkgM1JLg5jpxmpgEy3VNZgNQeOU694ULFoaRyUu7b0',
  //     },
  //   })
  //   .then((res) => setTeams(res.data))
  //   .catch((e) => console.log('error'))
  // }, [])
  // console.log(teams)

  return (
    <Router>
      <div className="App">
        <Auth>
          <Route exact path="/" component={Home} />
        </Auth>
        <Route exact path="/login" component={Login} />
      </div>
    </Router>
  )
}

export default App

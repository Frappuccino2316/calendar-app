import React from 'react'
import { useHistory } from 'react-router-dom'
import { useCookies } from 'react-cookie'

const Login: React.FC = () => {
  const [cookie] = useCookies()
  const history = useHistory()

  React.useEffect(() => {
    !cookie && history.push('/')
  })
  return <div>Login</div>
}

export default Login

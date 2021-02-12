import React, { ReactNode } from 'react'
import { useHistory } from 'react-router-dom'
import { useCookies } from 'react-cookie'

type Props = {
  children: ReactNode
}

const Auth: React.FC<Props> = ({ children }) => {
  const [cookie, setCookie] = useCookies(['calendarJWT'])
  const history = useHistory()
  React.useEffect(() => {
    cookie && history.push('/login')
  })
  return <div>{children}</div>
}

export default Auth

import React from 'react'
import 'components/Title.css'

type Props = {
  title: string
}

const Title: React.FC<Props> = ({ title }) => {
  return <h1>{title}</h1>
}

export default Title

import React from 'react'
import { iDefaultProviderProps } from './@types'
import { UserProvider } from './UserContext'

const Providers = ({children}: iDefaultProviderProps) => {
  return (
    <UserProvider>
        {children}
    </UserProvider>
  )
}

export default Providers
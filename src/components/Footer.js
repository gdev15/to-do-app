import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import Logout from './Auth/Logout'

import './Footer.css'


export default function Footer() {
  const { currentUser } = useAuth()
  return (
    <>
    
    {currentUser && 
    <Logout />
    
    }
    <footer className="bg-light text-dark p-4">
        <strong>&copy; {new Date().getFullYear()} </strong>
    </footer>
    </>
  )
}
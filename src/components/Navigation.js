import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Navigation() {

    const { currentUser } = useAuth()   
 
  return (
    <Navbar bg='dark' data-bs-theme='dark' className='p-3' expand='md'>
        <Navbar.Brand href='/'>To Do App</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
            <Nav>              
            
                
                {currentUser &&
                <>  
                    <Link to='/todo' className='nav-link'>
                        ToDo List
                    </Link>             
                    <Link to='/categories' className='nav-link'>
                        Categories
                    </Link>
                </>
                  
                }
         
                {!currentUser &&
                    
                    <Link to='/login' className='nav-link'>
                        Login
                    </Link>
                }

            </Nav>
        </Navbar.Collapse>
    </Navbar>
  )
}

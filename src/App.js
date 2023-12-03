import React from 'react'

import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import NotFound from './components/NotFound/NotFound'
import AuthProvider from './contexts/AuthContext'
import Login from './components/Auth/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Categories from './components/Categories/Categories'
import ToDos from './components/ToDos/ToDos'



export default function App() {
  return (
    <div className="App">
      {/* The below component is actually calling the BrowserRouter but we made an alias in the import. We surround the Navigation because it has Link components called from react-router-dom package and rendered in that component. Per the docs on their site: Link, Routes, and each Route need to be rendered inside the Router. */}
      <AuthProvider>
          <Router>
            {/* Routes is like a switch that defines each individual Route */}
            <Navigation />
            <Routes>      
                       
                        {/*Routes to the homepage  */}
              {/* <Route path='/' element={<Login />} /> */}

              <Route path='/' element={<Login/>} />
              <Route path='/todo' element= {<ToDos/>} />
              <Route path='/categories' element={<ProtectedRoute> <Categories /> </ProtectedRoute>} />                          
              <Route path='/login' element={<Login />} />
              <Route path='*' element={< NotFound />} />          
            </Routes>
            <Footer />
          </Router>
        </AuthProvider>
    </div>
  )
}
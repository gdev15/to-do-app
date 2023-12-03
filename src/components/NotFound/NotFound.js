import React from 'react'
import './NotFound.css'
import image from '../../images/404.jpg'

export default function NotFound() {
  return (
    <div className='notFound'>
        <img src={image} alt="Resource Not Found" />
        <h1>Resource Not Found</h1>
    </div>
  )
}

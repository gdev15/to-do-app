
import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Dropdown from 'react-bootstrap/Dropdown'

export default function FilterCat(props) {

  const [categories, setCategories] = useState([])

  useEffect(() => {
    axios.get(`https://localhost:7049/api/Categories`).then(response => {
      console.log(response)
      setCategories(response.data)
    })
  }, []);

  return (
    <Container className='search-container'>
      <Row>
        <div className="search-filter">
        <button onClick={() => props.setFilter(0)} className="btn btn-outline-info bg-dark m-1">
            All
        </button>
       
        {categories.map(cat => 
            <button key={cat.categoryId} className="btn btn-outline-info bg-dark m-1"
            onClick={() => props.setFilter(+cat.categoryId)}>
            {cat.catName}
            </button>  
        )}
        </div>
      </Row>
    </Container>
  
  )
}
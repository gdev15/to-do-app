import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'

import { FaEdit, FaTrashAlt  } from 'react-icons/fa'
import axios from 'axios'
import CatEdit from './CatEdit'

import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'

import './SingleCategory.css'

export default function SingleCategory(props) {

  const { catName, catDesc, categoryId } = props.category


  const { currentUser } = useAuth()

  const [showEdit, setShowEdit] = useState(false);


  const deleteCat = (id) => {
    if(window.confirm(`Are you sure you want to delete ${catName}?`)){
      axios.delete(`https://localhost:7049/api/Categories/${id}`).then(() => {
        props.getCategories()
      })
    }
  }


  return ( 
    <Col className='mb-5'>
      {/* CARD UI */}

      <Card style={{ width: '18rem' }}>      
        <Card.Body className='cat-cards'>
          
          <Card.Title>{catName}</Card.Title>
          <Card.Text>
            
            {catDesc}
          </Card.Text>
          
           {/* Card Edit UI */}
          {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL && 
            <>
              <Button onClick={() => setShowEdit(true)} className="cat-card-edit m-1 rounded" id="editLink">
                <FaEdit />
              </Button>
              <Button onClick={() => deleteCat(categoryId)} className="cat-card-delete m-1 rounded" id="deleteLink">
                <FaTrashAlt />
              </Button>
              {showEdit && 
                <CatEdit 
                 
                  showEdit={showEdit}
                  setShowEdit={setShowEdit}
            
                  getCategories={props.getCategories}
                  category={props.category}
                
                />
              }
            </>
          }
        </Card.Body>
      </Card>   
    </Col>
  )
}

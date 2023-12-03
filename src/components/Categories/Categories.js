import React, { useState, useEffect } from 'react'
import axios from 'axios'

import SingleCategory from './SingleCategory'


import { useAuth } from '../../contexts/AuthContext'
import CatCreate from './CatCreate';

import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

export default function Categories() {

    const [categories, setCategories] = useState([]);
    const { currentUser } = useAuth()
    const [showCreate, setShowCreate] = useState(false)

    const getCategories = () => { 
        axios.get(`https://localhost:7049/api/Categories`).then(response => {
           console.log(response)
           setCategories(response.data)
        })
        
    }

    useEffect(() => {
        getCategories()
    }, []);

  return (
    <section className="categories">
        <article className="bg-dark text-light p-5 mb-5">
            <h1 className="text-center">Categories Dashboard</h1>
        </article>

        {/* BEGIN CREATE UI */}
        {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
            <div className=" p-2 mb-3">                
            {showCreate ?
                <>
                    <button onClick={() => setShowCreate(false)} className="btn btn-warning">
                        Cancel
                    </button>
                    <CatCreate getCategories={getCategories} setShowCreate={setShowCreate}/>
                </> :
                <button onClick={() => setShowCreate(true)} className="cat-create-buttn btn btn-info">
                    Create Category
                </button>
            }
            </div>
        
        }

        {/* END CREATE UI */}

        <Container className='p-2'>                     
            <Row>           
                {categories.map(cat =>                    
                    <SingleCategory key={cat.categoryId} category={cat} getCategories={getCategories} />                        
                )}
                            
            </Row>           
        </Container>
    </section>
  )
}

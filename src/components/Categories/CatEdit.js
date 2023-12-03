import React from 'react'
//Bring in the modal from bootstrap
import Modal from 'react-bootstrap/Modal'
import CatForm from './CatForm'

export default function CatEdit(props) {
  return (
    <Modal 
        show={ props.showEdit }
        onHide={ () => props.setShowEdit(false) }
        size='lg'>
            <Modal.Header closeButton>
                <h2>Editing {props.category.catName}</h2>
            </Modal.Header>
            <Modal.Body>
                <CatForm getCategories= {props.getCategories}
                setShowEdit={props.setShowEdit}
                category={props.category}
                />
            </Modal.Body>
    </Modal>
  )
}

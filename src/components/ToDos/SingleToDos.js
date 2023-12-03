import React, {useState, useEffect} from 'react'
import { useAuth } from '../../contexts/AuthContext'
import axios from 'axios'

//react-bootstrap styling
import ListGroup from 'react-bootstrap/ListGroup'
import './ToDos.css'
import { FaEdit, FaTrashAlt  } from 'react-icons/fa'
import ToDoEditForm from './ToDoEditForm'

export default function SingleToDos(props) {

    
    const [categories, setCategories] = useState([])
   
  
    useEffect(() => {
        axios.get(`https://localhost:7049/api/Categories`).then(response => {
            setCategories(response.data) 
        })

   
    }, []);


    const getCategoryName = (categoryId) => {
        const category = categories.find(cat => cat.categoryId === categoryId);
        return category ? category.catName : 'Unknown Category';
    };


  
    const { toDoId, name, done:initialDone, categoryId} = props.toDo

    
    
    const [showEdit, setShowEdit] = useState(false)

    //Toggle the form
    const toggleEditForm = () => {
        setShowEdit(!showEdit)
    }

    const { currentUser } = useAuth()

 
    const [done, setToDone] = useState(initialDone)

    //toggle function
    const toggleDone = () => {
        const newDoneStatus = !done;
         
         const updatedTask = {
            toDoId: toDoId,
            name: name,
            done: newDoneStatus,
            categoryId: categoryId
        };

        props.updateToDoInDB(toDoId, updatedTask)
            .then(() => {
                setToDone(newDoneStatus)
                console.log('Status updated')
            })
            .catch(error => {
                console.error('Error toggling to-do status:', error)
            })
    }

   

  return (
    
    <>
    {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&       
        <ListGroup.Item className='list-item-text' style={{background: done? 'lightgreen' : 'lightcoral'}}>

            
            <button onClick={toggleDone} style={{ float: 'left' }}>
                {done ? '✓ Completed' : '✘ Incomplete'}
            </button>           
            <button  className="m-1 rounded" id="editLink" onClick={toggleEditForm}>
                <FaEdit />
            </button>
                {
                    showEdit &&
                    <ToDoEditForm 
                    todo={props.toDo} 
                    updateToDo={props.updateToDoInDB} 
                    setShowEdit={setShowEdit}
                    />
                }                
            
            <button className="m-1 rounded" id="deleteLink" onClick = {() => props.deleteToDo(toDoId, name)}>
                <FaTrashAlt />
            </button>
            
            <p className='my-4'>{ name } <br/> Category: {getCategoryName(categoryId)}</p>
            
            
        </ListGroup.Item>
        
    }           
       
    </>
  )
}

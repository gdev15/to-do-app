import React, {useState, useEffect} from 'react'

import { useAuth } from '../../contexts/AuthContext'
import axios from 'axios';
import { useContext } from 'react'
//react-bootstrap styling
import ListGroup from 'react-bootstrap/ListGroup'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Accordion from 'react-bootstrap/Accordion'
import AccordionContext from 'react-bootstrap/AccordionContext'
import { useAccordionButton } from 'react-bootstrap/AccordionButton'


//Card styling
import './ToDos.css'
import SingleToDos from './SingleToDos'
import ToDoForm from './ToDoForm'
import FilterCat from './FilterCat';


export default function ToDos() {

    //Hook to store the to do list
    //Since we are storing a collection the use state should take in an empty array
    const [toDos, setToDos] = useState([])

    //Hook to gain access to the properties of the current user
    const { currentUser } = useAuth()
    
    const [filter, setFilter] = useState(0)

    //Axios function to fetch the ToDo list from the To Do API
    const getToDos = () => {
        axios.get(`https://localhost:7049/api/Tasks`).then(response => {
            console.log(response)
            setToDos(response.data)
        })
    }

        //Update the database
        function updateToDoInDB(toDoId, updatedTask){
            //toDoId will be passed in by the specific single todo that is selected
            //Posting the new status by passing in the value of the newDoneStatus
            return axios.put(`https://localhost:7049/api/Tasks/${toDoId}`, updatedTask).then(() => {
                getToDos()
            })
            .catch(error=> {
                console.error('Error updating to-do item:', error)
            })
            //then wait for the response
        }

        //Delete the do from database
        const deleteToDo = (id, todoName) => {           
            if(window.confirm(`Are you sure you want to delete ${todoName}?`)){
                //We only enter these scopes if our user clicks "OK"
                axios.delete(`https://localhost:7049/api/Tasks/${id}`).then(() => {
                  getToDos()//this refreshes the resources tiled view
                })
              }
        }
        

         //Update the database when a new todo Is posted
         function updateNewToDo(newToDo){           
            return axios.post(`https://localhost:7049/api/Tasks`, newToDo).then(() => {
                getToDos()
            })
            .catch(error=> {
                console.error('Error updating to-do item:', error)
            })
            //then wait for the response
        }

    //use effect to call the function
    useEffect(() => {
        getToDos()
    }, []);

    const BLUE = 'rgb(49, 147, 245)'
    const GRAYBLUE = 'rgb(78, 136, 194)'

    function ContextAwareToggle({ children, eventKey, callback }) {
        const { activeEventKey } = useContext(AccordionContext)
      
        const decoratedOnClick = useAccordionButton(
          eventKey,
          () => callback && callback(eventKey),
        );
      
        const isCurrentEventKey = activeEventKey === eventKey;
      
        return (
          <button className='rounded'
            type="button"
            style={{ backgroundColor: isCurrentEventKey ? BLUE : GRAYBLUE }}
            onClick={decoratedOnClick}
          >
            {children}
          </button>
        )
      } 


  return (
    <>  
       
        <FilterCat setFilter={setFilter}/>
        
        <div className='d-flex justify-content-center todo-cont my-5'>
            
          
            {/* Layout */}
                    
            
            <Container className='todo-cont '>
              
                    <Row className="justify-content-md-center">
                        <Col className='todo-card'>
                            <Card>                
                                <Card.Body>
                                    <Card.Title className='todo-card-title'>ToDo</Card.Title>
                                    <Card.Text>
                                    <Row>
                                        <ListGroup>                    
                                          
                            {/* Below we write conditional rendering to see if the user is trying to filter results or not, and display the right resources according to what they want.  */}
                            {filter === 0 ? toDos.map(todo => 
                                //Below we .map our SingleResource component for each resource in our collection
                                <SingleToDos 
                                    updateToDoInDB={updateToDoInDB}
                                    key={todo.toDoId} toDo = {todo}
                                    getTasks={getToDos}
                                    deleteToDo = {deleteToDo}
                                
                                />  
                            ) :
                            toDos.filter(todo => todo.categoryId === filter).map(todo =>
                                <SingleToDos
                                updateToDoInDB={updateToDoInDB}
                                key={todo.toDoId} toDo = {todo}
                                getTasks={getToDos}
                                deleteToDo = {deleteToDo} 
                                
                                />
                            )}
                            {/* Below we throw a message to the user if there are no resources in the category */}
                            {filter !== 0 && toDos.filter(r => r.categoryId === filter).length === 0 &&
                                <h2 className="alert alert-warning text-dark">
                                There are no results for this category.
                                </h2>
                            }

                      
                                        </ListGroup>        
                                    </Row>
                                    </Card.Text>                                                            
                        
                                </Card.Body>                                                            
                            </Card>   
                        </Col>                       
                        <Col lg={4}  md="auto">
                            {/* Accordion */}                    
                            <Accordion defaultActiveKey={[]}>
                                <Card className='accordion-card bg-light'>
                                    <Card.Header>
                                    <ContextAwareToggle className = 'accordion-button' eventKey="0">                                        
                                        Add Task                                       
                                    </ContextAwareToggle>
                                    </Card.Header>
                                    <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <ToDoForm  updateNewToDo={updateNewToDo} getToDos={getToDos}/>  
                                    </Card.Body>
                                    </Accordion.Collapse>
                                </Card>                       
                            </Accordion>                             
                            {/* End Accordion  */}
          
                      
                        </Col>   
                       
                    </Row>  
                    
                 
                </Container> 
        </div>
        

      
             
           
    </>
    
  )
}

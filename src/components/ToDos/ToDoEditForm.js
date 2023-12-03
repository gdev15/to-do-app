import React, {useState, useEffect} from 'react'
import axios from 'axios' //Handles the connection to the database and the data transfer http based library
import { Formik, Field, Form } from 'formik' //Open source form library for processing react data
import { taskSchema } from '../../utilities/validationSchema' //Access the task table from the DB
import Accordion from 'react-bootstrap/Accordion'

import './ToDoEditForm.css'

export default function ToDoEditForm(props) {
  
    const [categories, setCategories] = useState([])
   
  
    useEffect(() => {
        axios.get(`https://localhost:7049/api/Categories`).then(response => {
            setCategories(response.data) 
        })

   
    }, []);




        const handleCancel = () => {
            props.setShowEdit(false)
        }
   
        const handleSubmit = (values) => {
                console.log(values)
                props.updateToDo(values.toDoId, values).then(() => {
                props.setShowEdit(false); // Hide form after submission
                
            });
        };
    
        return (
            <div className='edit-form'>
                <h4 className='text-light'>Currently Editing</h4>
                <small className='text-info'>{props.todo.name}</small>
                <Formik  
                initialValues= {{
                    toDoId: props.todo.toDoId,
                    name: props.todo ? props.todo.name : '',
                    done: props.todo ? props.todo.done : false, 
                    categoryId: props.todo ? props.todo.categoryId : ''
                }} onSubmit={(values) => handleSubmit(values)}>
                    {/* form fields */}
                    {({errors, touched}) => (
                    <Form id='toDoForm'>
                    <div className="form-group m-3">
                        <Field name='name' className="form-control" placeholder='Name'/>
                        {errors.name && touched.name &&
                        <div className="text-danger">{errors.name}</div>
                        }
                    </div>
                    
                    {/* Hidden field for 'done' */}
                    <Field type="hidden" name="done" />
                    <option value='false'>
                            
                        </option>
                    <div className="form-group m-3">
                        <Field as='select' name='categoryId' className='form-control'>
                        <option value='' disabled>
                            [--Please Choose--]
                        </option>
                        {/* Below we will map out an option for every category in the API */}
                        {categories.map(cat => 
                            <option key={cat.categoryId} value={cat.categoryId}>
                            {cat.catName}
                            </option>  
                        )}
                        </Field>
                    </div>

                    
                    <div className="form-group m-3">
                        <button type='submit' className="btn btn-success m-3">
                        Post Edit
                        </button>
                        <button type='button' className="btn btn-danger m-3" onClick={handleCancel}>
                        Cancel
                        </button>
                    </div>
                    </Form>
                    )}
                </Formik>
            </div>
        )
    }


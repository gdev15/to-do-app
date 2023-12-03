import React, {useState, useEffect} from 'react'
import axios from 'axios' //Handles the connection to the database and the data transfer http based library
import { Formik, Field, Form } from 'formik' //Open source form library for processing react data
import { taskSchema } from '../../utilities/validationSchema' //Access the task table from the DB
import Accordion from 'react-bootstrap/Accordion'

export default function ToDosForm(props) {

    //Get the list of categories from the API so that the user can select an option when creating a new task
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get(`https://localhost:7049/api/Categories`).then(response => {
            setCategories(response.data) //Access the db located at the URL. Wait for the connection then grab the data that is in the Categories table and save it to the setCategories useState which was an empty array until now...
        })
    }, []);

    //Handle the form submission
    //This handleSubmit function will be taking in parameters as values
    //The values will be the data that will be plugged into the data base table after submission
    //So the database will need to recieve all the required values or will throw an error
    const handleSubmit = (values) => {
        const createToDo = values;
        props.updateNewToDo(createToDo)
        props.getToDos()
    }

  return (
   
    <Formik
    initialValues={{
      name: props.todo ? props.todo.name : '',
      done: props.todo ? props.todo.done : false, 
      categoryId: props.todo ? props.todo.categoryId : ''
    }}
    onSubmit={(values) => handleSubmit(values)}>
    
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
              Post ToDo
            </button>
          </div>
        </Form>
      )}
  </Formik>

  )
}

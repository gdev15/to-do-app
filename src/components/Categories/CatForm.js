import React from 'react'
// Import 3 components using Formik
import { Formik, Form, Field } from 'formik'
// Import schema
import { catSchema } from '../../utilities/validationSchema'
import axios from 'axios'

export default function CatForm(props) {

    const handleSubmit = (values) => {
        console.log(values)
        if(!props.category){
                const catToCreate = values
            
            axios.post(`https://localhost:7049/api/Categories`, catToCreate).then(()=> {
               
                props.setShowCreate(false)
                props.getCategories()
            })
        }else{
            const catToEdit = {
                categoryId: props.category.categoryId,
                catName: values.catName,
                catDesc: values.catDesc
            }

          
            axios.put(`https://localhost:7049/api/Categories/${props.category.categoryId}`, catToEdit).then(() => {
                props.setShowEdit(false)
                props.getCategories()
            })
        }
    }

  return (
    <div className='createCategory m-2 text-white text-center'>
        <Formik
            initialValues={{         
                categoryName: props.category ? props.category.categoryName : '',
                categoryDescription: props.category ? props.category.categoryDescription : ''
            }}
            validationSchema={catSchema}
            onSubmit={(values) => handleSubmit(values)} >              
                {({errors,touched}) => (                    
                    <Form id='catForm' className='row text-center m-auto'>
                        <div className="form-group m-1 p-1">
                            <Field name='catName' className='form-control' placeholder='Name' />
                            {errors.catName && touched.catName &&
                                <div className="text-danger">{errors.catName}</div>
                            }
                        </div>
                        <div className="form-group m-1 p-1">
                            <Field name='catDesc' className='form-control' placeholder='Description' />
                            {errors.catDesc && touched.catDesc &&
                                <div className="text-danger">{errors.catDesc}</div>
                            }
                        </div>
                        <div className="form-group m-1">
                            <button className="btn btn-success">
                                Post Category
                            </button>
                        </div>
                    </Form>
                )}
            
        </Formik>
    </div>
  )
}

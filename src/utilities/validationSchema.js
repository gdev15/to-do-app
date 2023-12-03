//This file will house the schemas for both resources and categories for the create/edit form.
//To bring in a simple validation implementation, we are going to use Yup by installing it in
//our app -- npm install yup...see implementation below

//Yup will work in tandem with Formik, which is an npm package that creates and stores form
//inputs for each item (categoryName, categoryDescription) that we need to capture in our forms. 
//npm install formik

/* This is what we need for category POST...These are inputs we need in the form. 
    {
        "categoryName": "Test",
        "categoryDescription": "Test desc"
    }
*/

import * as Yup from 'yup'

const catSchema = Yup.object().shape({
    //Below we call to each property that will need to be validated and use Yup to define the requirements for each property (required, maxLength, etc.)
    catName: Yup.string().max(25, 'Max 25 Characters').required('Required'),
    catDesc: Yup.string().max(100, 'Max 100 Characters')
})

const taskSchema = Yup.object().shape({
    toDoId: Yup.number().required(),
    name: Yup.string().max(100, 'Max 100 Characters').required('Required'),
    done: Yup.bool().required('Required'),    
    categoryId: Yup.number().required()
})

export { catSchema, taskSchema}
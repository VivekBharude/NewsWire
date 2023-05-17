
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { getNewsItemsById } from '../Store/Action/index';

const  EditNews = ()=>{
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [ inputValues, setInputValues ] = useState({
		title: '',
		body: '',
		author: ''
	});

	useEffect(
		() => {
			dispatch(getNewsItemsById(id)).then((action) => {
				setInputValues({
					title: action.payload.newsItem ? action.payload.newsItem.title : '',
					body: action.payload.newsItem ? action.payload.newsItem.body : '',
					image: action.payload.newsItem ? action.payload.newsItem.image : ''
				});
			});
		},
		[ dispatch, id ]
	);

    const updateNewsToDB = async(values)=>{
       try {
         const response = await axios.patch(`/api/news/${id}`,{
             title:values.title,
             image:values.image,
             body:values.body
         });
         console.log('response is', response);
     }
       catch (error) {
        console.log('error is', error);
        
       }
    }


    const formik = useFormik({
        initialValues: {
			title: inputValues.title,
			body: inputValues.body,
			image: inputValues.image
		},
		enableReinitialize: true,
        validationSchema: Yup.object({
          title: Yup.string()
            .max(500, 'Must be 500 characters or less')
            .required('Required'),
         image: Yup.string()
            .max(200, 'Must be 200 characters or less')
            .required('Required'),
        body: Yup.string()
            .max(5000, 'Must be 5000 characters or less')
            .required('Required'),
        }),
        onSubmit: (values, { resetForm }) => {
            console.log(values);
			updateNewsToDB(values);
            navigate(`/news/${id}`);
		}
      });

    return(
    <React.Fragment>
      <form onSubmit={formik.handleSubmit}>
         <div className="mt-4">    
       <label htmlFor="title">Title</label>
       <input
       className="form-control"
         id="title"
         type="text"
         {...formik.getFieldProps('title')}
       />
       {formik.touched.title && formik.errors.title ? (
         <div>{formik.errors.name}</div>
       ) : null}

       </div>
        

        <div className="mt-4">
       <label htmlFor="image">image URL</label>
       <input 
       className="form-control"
        id="image" type="text"
         {...formik.getFieldProps('image')} />
       {formik.touched.image && formik.errors.image ? (
         <div>{formik.errors.image}</div>
       ) : null}
        </div> 

        <div className="mt-4" >
       <label htmlFor="body">Write what you want</label>
       <textarea
        className="form-control"
        id="body" 
        type="text" 
        {...formik.getFieldProps('body')} />
       {formik.touched.body && formik.errors.body ? (
         <div>{formik.errors.body}</div>
       ) : null}
        </div>
       <button className="btn btn-primary mt-4" type="submit">Update</button>
     </form>
    </React.Fragment>
    )
}

export default EditNews;
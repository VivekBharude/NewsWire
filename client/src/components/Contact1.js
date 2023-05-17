import React from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import emailjs from 'emailjs-com';



const Contact1 = ()=>{
    function sendEmail(event) {
		emailjs.sendForm('service_8ougyrp', 'template_5unx9zn', event.target, '3A-3hpe-ufeuHoMhH').then(
			(result) => {
				console.log(result);
			},
			(error) => {
				console.log(error.text);
				// showToast('error', 'something went wrong, please try again later');
			}
		);
	}
     



    const formik = useFormik({
        initialValues: {
          name: '',
          message: '',
          email: '',
        },
        validationSchema: Yup.object({
          name: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
         message: Yup.string()
            .max(200, 'Must be 200 characters or less')
            .required('Required'),
          email: Yup.string().email('Invalid email address').required('Required'),
        }),
        onSubmit: (values, { resetForm }) => {
			// console.log(values);
			resetForm();
		}
      });

 

    return (
    <React.Fragment>
         <form
				onSubmit={(event) => {
					event.preventDefault();
					sendEmail(event);
					formik.handleSubmit();
				}}
			>
         <div className="mt-4">    
       <label htmlFor="name">Name</label>
       <input
       className="form-control"
         id="name"
         type="text"
         {...formik.getFieldProps('name')}
       />
       {formik.touched.firstName && formik.errors.firstName ? (
         <div>{formik.errors.name}</div>
       ) : null}

       </div>
        

        <div className="mt-4">
       <label htmlFor="message">Message</label>
       <textarea 
       className="form-control"
        id="message" type="text"
         {...formik.getFieldProps('message')} />
       {formik.touched.message && formik.errors.message ? (
         <div>{formik.errors.message}</div>
       ) : null}
        </div> 

        <div className="mt-4" >
       <label htmlFor="email">Email Address</label>
       <input
        className="form-control"
        id="email" 
        type="email" 
        {...formik.getFieldProps('email')} />
       {formik.touched.email && formik.errors.email ? (
         <div>{formik.errors.email}</div>
       ) : null}
        </div>
       <button className="btn btn-primary mt-4" type="submit">Submit</button>
     </form>
    </React.Fragment>
    )
}

export default Contact1;
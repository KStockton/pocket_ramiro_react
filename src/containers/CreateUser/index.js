import React from 'react';
import { connect } from 'react-redux';
import { postUser } from '../../thunks/postUser';
import { Formik } from 'formik';
import { withRouter } from 'react-router';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .required("Password is Required.")
    .max(13, "Too long")
    .min(8, "Too short"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

const CreateUser = ({formConfig, postUser, history}) => (
  <div id='form-container'>
    <h1>Create User</h1>
    <Formik
      initialValues={
        {
          name: '', 
          email: '',
          password: '',
          password_confirmation: ''
        }
      }
      onSubmit={ async (values, actions) => {   
        actions.setSubmitting(false);
        const newUser = {...values, role: 'admin'};       
        const response =  await postUser(newUser);

        if (response.message) {
          actions.resetForm();
          actions.setStatus({ success: "User created" });
        } 
      }}
      
      validationSchema={SignupSchema}
      render={(props) => {
        const BASE_PROPS = {
          onChange: props.handleChange,
          onBlur: props.handleBlur,
          status: props.status
        };
        const inputNodes = formConfig.map(({type, name, placeholder}, inputIx) => (
          <div key={inputIx}>
            <input
              {...BASE_PROPS}
              type={type}
              value={props.values[name]}
              name={name}
              placeholder={placeholder}
            />
            {props.errors[name] && <div id="feedback">{props.errors[name]}</div>}
            {props.status && props.status.success && 
            <div id={`${'messages' + inputIx}`}>{props.status.success}
              <i class="material-icons" id='message-check'>
                check
              </i>
            </div>}
          </div>
        ));
        
        return (
          <form onSubmit={props.handleSubmit}>            
            {inputNodes}
            <button type="submit" disabled={props.isSubmitting} id='submit-user'>Submit</button>
          </form>
        );
      }} 
    />
  </div>
);

CreateUser.defaultProps = {
  formConfig: [
    {
      type: 'text',
      name: 'name',
      placeholder: 'Name'
    },
    {
      type: 'text',
      name: 'email',
      placeholder: 'Email'
    },
    {
      type: 'password',
      name: 'password',
      placeholder: 'Password'
    },
    {
      type: 'password',
      name: 'password_confirmation',
      placeholder: 'Confirm Password'
    }
  ]
};

export const mapStateToProps = state => ({
  user: state.user
});

export const mapDispatchToProps = dispatch => ({
  postUser: (user) => dispatch(postUser(user))
});

export default withRouter(
  connect(null, mapDispatchToProps)(CreateUser)
);
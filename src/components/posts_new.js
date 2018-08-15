import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {

    renderField(field){
        const { meta: { touched, error } } = field
        const className = `form-group ${touched && error ? "has-danger" : ""}`
        return (
            <div className={className}>
                <label> {field.label} </label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        )
    }

    // inside function, want to call action creator
    onSubmit(values) {
        // values are the values out of the form
        // this === the component because we have bound it
        this.props.createPost(values, () => {
            this.props.history.push('/')
        })
    }

    render() {
        console.log('this.props is ', this.props)
        // handleSubmit is being passed to PostsNew on behalf of reduxForm
        const { handleSubmit } = this.props
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Title"
                    name="title"
                    component={this.renderField}
                />
                <Field
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                />
                <Field
                    label="Post Content"
                    name="content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary"> Submit </button>
                <Link to="/" className='btn btn-danger'> Cancel </Link>
            </form>
        );
    }
}


// underneath component, create helper validation function
// values is an object of all the values someone entered into the form
// { title: 'sdasd', categories: 'talking', content: 'sup'}
function validate(values) {
    // start off by creating an errors object
    const errors = {}

    // Validate the inputs from 'values'
    // In this case, we just want to make sure there are values in each field
    if (!values.title) {
        errors.title = "Enter a title!";
    }
    if (!values.categories) {
        errors.categories = "Enter some categories!"
    }
    if (!values.content) {
        errors.content = 'Enter some content!'
    }

    // if errors object is empty, the form is ok to submit
    // otherwise, there is an issue and should not submit
    // the property in error needs to be the name of the particular function
    return errors
}

export default reduxForm({
    form: 'PostsNewForm',
    validate: validate
})(
    connect(null, { createPost })(PostsNew)
);

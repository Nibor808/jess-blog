import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';

class AddComment extends Component {

  render() {
    const { handleSubmit, fields: {  } } = this.props;
    return(
      <form>

      </form>
    )
  }
}

export default reduxForm({
  form: 'addComment',
  fields: [ 'title', 'content' ]
})
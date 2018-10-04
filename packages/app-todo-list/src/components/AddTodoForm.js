import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import { FormGroup, ControlLabel, Button } from 'react-bootstrap'
import { IbField } from 'interbit-ui-components'

import formNames from '../constants/formNames'

class AddTodoForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <form onSubmit={handleSubmit}>
        <h3>Add a new to-do item</h3>
        <FormGroup>
          <ControlLabel>Title *</ControlLabel>
          <IbField type="text" name="title" placeholder="Title" />
        </FormGroup>

        <FormGroup>
          <ControlLabel>Description</ControlLabel>
          <IbField type="text" name="description" placeholder="Description" />
        </FormGroup>

        <FormGroup>
          <Button type="submit" onClick={handleSubmit} className="ibweb-button">
            Add
          </Button>
        </FormGroup>
      </form>
    )
  }
}

export default reduxForm({
  form: formNames.ADD_TODO
})(AddTodoForm)

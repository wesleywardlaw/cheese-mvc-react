import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import request from '../../utils/api-request';
import { categoryPropType } from '../../utils/prop-types';
import { categoryOption } from './CheeseCategorySelector';

class CheeseForm extends Component {
  state = {
    disabled: true,
    fields: {
      name: '',
      description: '',
      categoryID: this.props.categories[0].id, // initial value, ID of first category option
    },
  }

  shouldDisable(formFields) {
    let disabled = false;
    for (const [name, value] of Object.entries(formFields)) {
      switch (name) {
        case 'name':
          if (value.length < 3 || value.length > 15) disabled = true;
          break;
        case 'description':
        case 'categoryID':
        default:
          if (value === '') disabled = true;
      }
    }

    return disabled;
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;

    const fields = { ...this.state.fields, [name]: value };
    this.setState({ fields, disabled: this.shouldDisable(fields) })
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { fields } = this.state;
    const { addToCheeses, hideForm } = this.props;
    
    const res = await request.post('/cheeses', { ...fields });
    const cheese= res.data;

    addToCheeses(cheese);
    hideForm();
  } 

  render() {
    const { categories, hideForm } = this.props;
    const { disabled, fields: { name, description, categoryID } } = this.state;

    return (
      <Form>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Name</Form.Label>
            <Form.Control name='name' value={name} minLength={3} maxLength={15}
               onChange={this.handleInputChange}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Cheese Category</Form.Label>
            <Form.Control as='select' name='categoryID' value={categoryID}
               onChange={this.handleInputChange}
            >
              {categories.map(categoryOption)}
            </Form.Control>
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Description</Form.Label>
            <Form.Control name='description' value={description} required
               onChange={this.handleInputChange}
            />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Col xs={{ span: 4, offset: 2 }} lg={{ span: 2, offset: 4 }}>
            <Button disabled={disabled} variant='primary' type='submit' onClick={this.handleSubmit}>
              Create
            </Button>
          </Col>
          <Col xs={{ span: 3 }} lg={{ span: 2 }}>
            <Button variant='outline-secondary' type='button' onClick={hideForm}>
              Cancel
            </Button>
          </Col>
        </Form.Row>
      </Form>
    );
  }
}


const CheeseFormModal = (props) => {
  const { categories, showForm, hideForm, addToCheeses } = props;

  return (
    <Modal centered size='lg' show={showForm} onHide={hideForm}>
      <Modal.Header closeButton />
      <Modal.Title className='text-center'>Create a New Cheese</Modal.Title>
      <Modal.Body>
        <CheeseForm categories={categories} addToCheeses={addToCheeses} hideForm={hideForm} />
      </Modal.Body>
    </Modal>
  );
}

const CheeseFormPropTypes = {
  categories: PropTypes.arrayOf(categoryPropType).isRequired,
  hideForm: PropTypes.func.isRequired,
  addToCheeses: PropTypes.func.isRequired,
};

CheeseForm.propTypes = CheeseFormPropTypes;

CheeseFormModal.propTypes = {
  ...CheeseFormPropTypes,
  showForm: PropTypes.bool.isRequired,
}

export default CheeseFormModal;

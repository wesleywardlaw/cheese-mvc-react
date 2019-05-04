import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import request from '../../utils/api-request';

class CategoryForm extends Component {
  state = {
    name: '',
    disabled: true,
  }

  handleInputChange = (event) => {
    const { value } = event.target;
    const disabled = value.length < 3 || value.length > 15;
    this.setState({ disabled, name: value });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { name } = this.state;
    const { addToCategories, hideForm } = this.props;

    const res = await request.post('/categories', { name })
    const category = res.data;
    
    addToCategories(category);
    hideForm();
  }

  render() {
    const { disabled, name } = this.state;
    const { hideForm } = this.props;

    return (
      <Form>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Category Name</Form.Label>
            <Form.Control name='name' value={name} minLength={3} maxLength={15}
              onChange={this.handleInputChange}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Col xs={{ span: 4, offset: 2 }} lg={{ span: 2 }}>
            <Button disabled={disabled} variant='primary' type='submit'
              onClick={this.handleSubmit}
            >
              Create
            </Button>
          </Col>
          <Col xs={{ span: 3 }} lg={{ span: 2, offset: 2 }}>
            <Button variant='outline-secondary' type='button'
              onClick={hideForm}
            >
              Cancel
            </Button>
          </Col>
        </Form.Row>
      </Form>
    );
  }
}

const CategoryFormModal = (props) => {
  const { showForm, hideForm, addToCategories } = props;

  return (
    <Modal centered size='sm' show={showForm} onHide={hideForm}>
      <Modal.Header closeButton />
      <Modal.Title className='text-center'>Create a New Menu</Modal.Title>
      <Modal.Body>
        <CategoryForm addToCategories={addToCategories} hideForm={hideForm} />
      </Modal.Body>
    </Modal>
  );
}

const CategoryFormPropTypes = {
  addToCategories: PropTypes.func.isRequired,
  hideForm: PropTypes.func.isRequired,
};

CategoryForm.propTypes = CategoryFormPropTypes;

CategoryFormModal.propTypes = {
  ...CategoryFormPropTypes,
  showForm: PropTypes.bool.isRequired,
}

export default CategoryFormModal;

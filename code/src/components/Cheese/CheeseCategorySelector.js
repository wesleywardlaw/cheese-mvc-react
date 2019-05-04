import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { categoryPropType } from '../../utils/prop-types';

export const categoryOption = category => (
  <option key={category.id} value={category.id}>
    {category.name}
  </option>
);


class CheeseCategorySelector extends Component {
  state = { categoryID: '' }

  handleInputChange = event => this.setState({ categoryID: event.target.value });

  handleSubmit = (event) => {
    event.preventDefault();
    const { categoryID } = this.state;
    const { changeCategory } = this.props;
    
    changeCategory(categoryID);
  }

  render = () => {
    const { categoryID } = this.state;
    const { categories } = this.props;

    return (
      <Form className='text-center'>
        <Form.Label as={Col}>Cheeses by Category</Form.Label>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Control name='categoryID' as='select' value={categoryID}
              onChange={this.handleInputChange}
            >
              <option value=''>All Cheeses</option>
              {categories.map(categoryOption)}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Button type='submit' variant='primary'
              onClick={this.handleSubmit}
            >
              Load Cheeses
            </Button>
          </Form.Group>
        </Form.Row>
      </Form>
    );
  }
}

CheeseCategorySelector.propTypes = {
  categories: PropTypes.arrayOf(categoryPropType).isRequired,
  changeCategory: PropTypes.func.isRequired,
};

export default CheeseCategorySelector;

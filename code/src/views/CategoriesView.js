import React, { Component } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import request from '../utils/api-request';
import CategoriesList from '../components/Category/CategoriesList';
import CategoryFormModal from '../components/Category/CategoryForm';

class CategoriesView extends Component {
  state = {
    categories: [],
    showForm: false,
  }

  async componentDidMount() {
    const res = await request.get('/categories');
    const categories = res.data;

    this.setState({ categories });
  }

  showForm = () => this.setState({ showForm: true });
  hideForm = () => this.setState({ showForm: false });

  addToCategories = category => this.setState((state) => {
    const { categories } = state;
    return { categories: [category, ...categories] };
  });

  render() {
    const { categories, showForm } = this.state;

    return (
      <Container>
        <CategoryFormModal
          showForm={showForm}
          hideForm={this.hideForm}
          addToCategories={this.addToCategories}
        />
        <Row>
          <Col xs={{ span: 6, offset: 6 }} lg={{ span: 3, offset: 10 }}>
            <Button variant='outline-primary' size='md'
              onClick={this.showForm}
            >
              New Category
            </Button>
          </Col>
        </Row>
        <br/>
        <Row>
          <CategoriesList categories={categories} />
        </Row>
      </Container>
    );
  }
}

export default CategoriesView;
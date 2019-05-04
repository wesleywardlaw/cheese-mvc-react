import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import request from '../utils/api-request';
import CheesesList from '../components/Cheese/CheesesList';
import CheeseFormModal from '../components/Cheese/CheeseForm';
import CheeseCategorySelector from '../components/Cheese/CheeseCategorySelector';

class CheesesView extends Component {
  state = {
    cheeses: [],
    categories: [],
    categoryID: '',
    showForm: false,
  }

  async componentDidMount() {
    const cheesesRes = await request.get('/cheeses');
    const cheeses = cheesesRes.data;

    const categoriesRes = await request.get('/categories');
    const categories = categoriesRes.data;

    this.setState({ cheeses, categories });
  }

  showForm = () => this.setState({ showForm: true });

  hideForm = () => this.setState({ showForm: false });

  addToCheeses = cheese => this.setState((state) => {
    const { cheeses } = state;
    return { cheeses: [cheese, ...cheeses] };
  });

  removeFromCheeses = async (cheeseID) => {
    const res = await request.delete(`/cheeses/${cheeseID}`);

    if (res.status !== 204) {
      console.log('didnt delete', { status: res.status });
    }
    
    this.setState((state) => {
      const cheeses = state.cheeses.filter(cheese => cheese.id !== cheeseID);
      return { cheeses };
    });
  }

  getCategoryCheeses = async (categoryID) => {
    const endpoint = categoryID === ''
      ? '/cheeses'
      : `/cheeses/category/${categoryID}`;
    
    const res = await request.get(endpoint);
    return res.data;
  }

  changeCategory = async (categoryID) => {
    if (categoryID === this.state.categoryID) return;
    
    const cheeses = await this.getCategoryCheeses(categoryID);
    this.setState({ categoryID, cheeses });
  }

  render() {
    const { cheeses, categories, showForm, categoryID } = this.state;

    return (
      <Container>
        <CheeseFormModal
          categories={categories}
          showForm={showForm}
          hideForm={this.hideForm}
          addToCheeses={this.addToCheeses}
        />
        <Row>
          <Col xs={{ span: 6, offset: 7 }} lg={{ span: 3, offset: 10 }}>
            <Button variant='outline-primary' size='md' onClick={this.showForm}>New Cheese</Button>
          </Col>
        </Row>
        <hr/>
        <Row>
          <Col xs={12} md={8} lg={4}>
            <CheeseCategorySelector categories={categories} changeCategory={this.changeCategory} />
          </Col>
        </Row>
        <br/>
        <CheesesList
          cheeses={cheeses}
          // only show [remove] button if in 'All' category
          removeFromCheeses={categoryID === '' && this.removeFromCheeses}
        />
      </Container>
    );
  }
}

export default CheesesView;

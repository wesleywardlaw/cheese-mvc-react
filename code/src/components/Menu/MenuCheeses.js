import React, { Component } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import { menuPropType } from '../../utils/prop-types';
import CheesesList from '../Cheese/CheesesList';
import MenuAddCheeseForm from './MenuAddCheeseForm';

import request from '../../utils/api-request';

class MenuCheeses extends Component {
  state = { cheeses: [] }

  async componentDidMount() {
    const { menu } = this.props;

    const res = await request.get(`/menus/${menu.id}/cheeses`);
    const cheeses = res.data;

    this.setState({ cheeses });
  }

  addToCheeses = cheese => this.setState((state) => {
    const { cheeses } = state;
    return { cheeses: [cheese, ...cheeses] };
  });

  removeFromCheeses = async (cheeseID) => {
    const { menu } = this.props;
    const res = await request.delete(`/menus/${menu.id}/cheeses/${cheeseID}`);

    if (res.status !== 204) {
      // TODO: error handling
    }
    
    this.setState((state) => {
      const cheeses = state.cheeses.filter(cheese => cheese.id !== cheeseID);
      return { cheeses };
    });
  }
  
  render = () => {
    const { menu } = this.props;
    const { cheeses } = this.state;

    return (
      <Container className='text-center'>
        <h1>{menu.name.toUpperCase()}</h1>   
        <hr/>  
        <Row>
          <Col xs={12} lg={{ span: 4, offset: 4 }}>
            <MenuAddCheeseForm
              menuID={menu.id}
              currentCheeses={cheeses}
              addToCheeses={this.addToCheeses}
            />
          </Col>
        </Row>
        <hr/>  
        <CheesesList cheeses={cheeses} removeFromCheeses={this.removeFromCheeses} />
      </Container>
    );
  }  
};

MenuCheeses.propTypes = {
  menu: menuPropType.isRequired,
};

export default MenuCheeses;

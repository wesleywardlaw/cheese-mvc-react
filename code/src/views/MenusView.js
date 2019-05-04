import React, { Component } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import request from '../utils/api-request';
import MenusList from '../components/Menu/MenusList';
import MenuFormModal from '../components/Menu/MenuForm';
import MenuCheeses from '../components/Menu/MenuCheeses';


class MenusView extends Component {
  state = {
    menus: [],
    showForm: false,
    selectedMenu: null,
  }

  async componentDidMount() {
    const res = await request.get('/menus');
    const menus = res.data;
    this.setState({ menus });
  }

  viewMenuCheeses = selectedMenu => this.setState({ selectedMenu });

  clearSelectedMenu = () => this.setState({ selectedMenu: null });

  showForm = () => this.setState({ showForm: true });

  hideForm = () => this.setState({ showForm: false });

  addToMenus = menu => this.setState((state) => {
    const { menus } = state;
    return { menus: [menu, ...menus] };
  });

  renderSelectedMenu = (selectedMenu) => (
    <Container>
      <Row>
        <Button variant='outline-secondary' size='sm'
          onClick={this.clearSelectedMenu}
        >
          {'<< All Menus'}
        </Button>
      </Row>
      <br/>
      <Row>
        <MenuCheeses menu={selectedMenu} />
      </Row>
    </Container>
  );

  renderAllMenus = () => {
    const { menus, showForm } = this.state;

    return (
      <Container>
        <MenuFormModal
          showForm={showForm}
          hideForm={this.hideForm}
          addToMenus={this.addToMenus}
        />
        <Row>
          <Col xs={{ span: 6, offset: 7 }} lg={{ span: 3, offset: 10 }}>
            <Button variant='outline-primary' size='md'
              onClick={this.showForm}
            >
              New Menu
            </Button>
          </Col>
        </Row>
        <MenusList
          menus={menus}
          viewMenuCheeses={this.viewMenuCheeses}
        />
      </Container>
    );
  }

  render = () => {
    const { menus, selectedMenu } = this.state;
    
    if (selectedMenu) return this.renderSelectedMenu(selectedMenu);
    return this.renderAllMenus(menus);
  }
}

export default MenusView;

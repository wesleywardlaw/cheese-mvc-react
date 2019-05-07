import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import request from '../utilities/api-request';
import MenusList from '../components/menu/MenusList';
import MenuForm from '../components/menu/MenuForm';

class MenusView extends Component {
    state = {
        menus: []
    };

    async componentDidMount() {
        // TODO: request the menus from the API
        // TODO: update state with the menus
        const res = await request.get('/menus');
        const menus = res.data;
        this.setState({ menus });
    }

    addToMenus = newMenu => {
        this.setState(state => {
            const { menus } = state;
            // DONE: implement returning a new state with the category added to categories list

            return { menus: [...menus, newMenu] };
        });
    };

    render() {
        const { menus } = this.state;

        return (
            <Container>
                <Row>
                    <Col>
                        <MenuForm addMenu={this.addToMenus} />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <MenusList menus={menus} />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default MenusView;

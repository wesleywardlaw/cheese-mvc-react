import React from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

import { menuType } from '../../utilities/prop-types';

const menuRow = (menu, viewMenuCheeses) => (
    <tr key={menu.id}>
        <td>{menu.name}</td>
        <td style={{ width: '120px' }}>
            <Link to={`/menus/${menu.id}`}>
                <Button variant="outline-primary" size="sm">
                    View Menu
                </Button>
            </Link>
        </td>
    </tr>
);

const MenusList = props => {
    const { menus, viewMenuCheeses } = props;

    return (
        <Container>
            <Row>
                <Col>
                    <h2 className="text-center">Menus</h2>
                </Col>
            </Row>
            <Row>
                <Col xs={12} lg={{ span: 4, offset: 4 }}>
                    <Table
                        responsive
                        bordered
                        size="lg"
                        style={{ marginBottom: '50px' }}
                    >
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th className="text-center">Cheeses</th>
                            </tr>
                        </thead>
                        <tbody>
                            {menus.map(menu => menuRow(menu, viewMenuCheeses))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

MenusList.propTypes = {
    menus: PropTypes.arrayOf(menuType).isRequired
};

export default MenusList;

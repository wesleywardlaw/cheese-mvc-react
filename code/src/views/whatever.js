import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import request from '../utilities/api-request';
import MenusList from '../components/menu/MenusList';
import MenuFormModal from '../components/menu/MenuForm';
import MenuCheeses from '../components/menu/MenuCheeses';
import MenuForm from '../components/menu/MenuForm';

class MenusView extends React.Component {
    state = {
        menus: []
    };
    async componentDidMount() {
        const res = await request.get('/menus');
        const menus = res.data;
        this.setState({ menus });
    }
    render() {
        return (
            <div>
                <MenuForm />
            </div>
        );
    }
}

export default MenusView;

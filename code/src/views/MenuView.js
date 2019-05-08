import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import request from '../utilities/api-request';
import Loading from '../components/Loading';
import CheesesList from '../components/cheese/CheesesList';
import MenuAddCheeseForm from '../components/menu/MenuAddCheeseForm';

class MenuView extends Component {
    state = {
        menu: null
    };

    async componentDidMount() {
        // get the menuID from the matched path
        const { menuID } = this.props.match.params;

        // TODO: request the menu for the given menuID
        // check the API reference for the correct endpoint to use
        const res = await request.get(`/menus/${menuID}`);
        const menu = res.data;

        // if no menu is found will be "undefined"

        this.setState({ menu });
    }

    addToCheeses = cheese =>
        this.setState(state => {
            const { cheeses } = state.menu;

            return { menu: { cheeses: [cheese, ...cheeses] } };
        });

    removeFromCheeses = cheeseID =>
        this.setState(state => {
            const { cheeses } = state.menu;

            // TODO: provide the filter() callback
            // should return true for any cheese whos ID DOES NOT match the cheeseID
            const updatedCheeses = cheeses.filter(
                cheese => cheese.id !== cheeseID
            );

            return { menu: { cheeses: updatedCheeses } };
        });

    deleteCheese = async cheeseID => {
        const { menuID } = this.props.match.params;
        // TODO: make an API request to remove the cheese from the menu
        // check the API reference for the correct endpoint
        const res = await request.delete(
            `/menus/${menuID}/cheeses/${cheeseID}`
        );

        // if the request failed exit early
        if (res.status !== 201) {
            return;
        }

        this.removeFromCheeses(cheeseID);
    };

    render() {
        const { menu } = this.state;
        // if menu is our initial value, null, we are still loading
        if (menu === '') return <Redirect to="/menus" />;

        if (menu === null) return <Loading />;
        // if the response did not find a menu with the given ID it will be "undefined"
        // redirect to the MenusView at /menus

        // otherwise we render our MenuView
        // const { cheeses } = menu;
        const { cheeses } = menu;
        const { menuID } = this.props.match.params;
        return (
            <Container>
                <h2>{menu.name}</h2>
                <Row>
                    <MenuAddCheeseForm
                        currentCheeses={cheeses}
                        addToCheeses={this.addToCheeses}
                        menuID={menuID}
                    />
                </Row>
                <Row>
                    <CheesesList
                        cheeses={cheeses}
                        removeCheese={this.deleteCheese}
                    />
                </Row>
            </Container>
        );
    }
}

export default MenuView;

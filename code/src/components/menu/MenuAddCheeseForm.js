import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import request from '../../utilities/api-request';
import { cheeseType } from '../../utilities/prop-types';

const cheeseOption = cheese => (
    <option key={cheese.id} value={cheese.id}>
        {cheese.name}
    </option>
);

const uniqueCheese = (cheese, currentCheeses) => {
    const inCurrentCheeses = currentCheeses.some(
        currentCheese => currentCheese.id === cheese.id
    );

    return !inCurrentCheeses;
};

class MenuAddCheeseForm extends Component {
    state = {
        disabled: true,
        cheeseID: '',
        allCheeses: []
    };

    async componentDidMount() {
        const res = await request.get('/cheeses');
        const cheeses = res.data;

        this.setState({ allCheeses: cheeses });
    }

    resetForm = () => this.setState({ disabled: true, cheeseID: '' });

    handleInputChange = event => {
        const { value } = event.target;
        const disabled = value === '';

        this.setState({ disabled, cheeseID: value });
    };

    handleSubmit = async event => {
        event.preventDefault();
        const { cheeseID } = this.state;
        const { menuID, addToCheeses } = this.props;

        const res = await request.post(`/menus/${menuID}/cheeses`, {
            cheeseID
        });
        const cheese = res.data;

        addToCheeses(cheese);
        this.resetForm();
    };

    render = () => {
        const { disabled, cheeseID, allCheeses } = this.state;
        const { currentCheeses } = this.props;

        const availableCheeses = allCheeses.filter(cheese =>
            uniqueCheese(cheese, currentCheeses)
        );

        if (availableCheeses.length === 0) return null;

        return (
            <Form>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Control
                            as="select"
                            name="cheeseID"
                            value={cheeseID}
                            onChange={this.handleInputChange}
                        >
                            <option value="">Select a Cheese</option>
                            {availableCheeses.map(cheeseOption)}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Button
                            variant="outline-primary"
                            type="submit"
                            disabled={disabled}
                            onClick={this.handleSubmit}
                        >
                            Add Cheese
                        </Button>
                    </Form.Group>
                </Form.Row>
            </Form>
        );
    };
}

MenuAddCheeseForm.propTypes = {
    addToCheeses: PropTypes.func.isRequired,
    currentCheeses: PropTypes.arrayOf(cheeseType).isRequired
};

export default MenuAddCheeseForm;

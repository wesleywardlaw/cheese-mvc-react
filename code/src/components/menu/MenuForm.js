import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import request from '../../utilities/api-request';

class MenuForm extends Component {
    state = {
        // TODO: implement initial state
        name: '',
        disabled: true
    };

    handleInputChange = event => {
        // the value attribute of the input that was changed
        const { value } = event.target;
        // true or false based on whether the value is invalid
        const disabled = value.length >= 3 && value.length <= 15 ? false : true;
        // TODO: implement an expression that will set disabled based on the validity of the input value

        // TODO: update state with the new values of "disabled" and "name"
        this.setState({ name: value, disabled });
    };

    // sets the value to an empty string to reset the form
    resetForm = () => this.setState({ name: '' });

    handleSubmit = async event => {
        event.preventDefault();
        const { name } = this.state;
        const { addMenu } = this.props;

        const res = await request.post('/menus', { name });
        // TODO: send a POST request with the form data (don't forget to await the Promise!)
        const menu = res.data;

        // TODO: send the new category back to the <CategoriesView> Parent
        addMenu(menu);
        this.resetForm();
    };

    render() {
        const { disabled, name } = this.state;

        return (
            <Container className="text-center">
                <h2>Create a Menu</h2>
                <Form>
                    <Form.Group as={Col} sm={{ offset: 4, span: 4 }}>
                        <Form.Label>Menu Name</Form.Label>
                        <Form.Control
                            name="name"
                            value={name}
                            minLength="3"
                            maxLength="15"
                            onChange={this.handleInputChange}
                            // TODO: implement the remaining props
                        />
                    </Form.Group>

                    <Button
                        type="submit"
                        variant="primary"
                        disabled={disabled}
                        onClick={this.handleSubmit}
                        // TODO: implement the remaining props
                    >
                        Create
                    </Button>
                </Form>
                <hr />
            </Container>
        );
    }
}

MenuForm.propTypes = {
    // TODO: implement the prop types for this component (see below)
    addMenu: PropTypes.func.isRequired
};

export default MenuForm;

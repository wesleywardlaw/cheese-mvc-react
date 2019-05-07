import React from 'react';
import PropTypes from 'prop-types';
import { categoryType } from '../../utilities/prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';

const createCategoryRow = category => {
    // TODO: implement this utility function
    // it should return a row and column with the category name
    return (
        <tr key={category.id}>
            <td>{category.name}</td>
        </tr>
    );
};

const CategoriesList = props => {
    const { categories } = props;

    return (
        <Container>
            <Row>
                <Col>
                    <h2 className="text-center">Categories</h2>
                </Col>
            </Row>
            <Row>
                <Col xs={12} lg={{ span: 6, offset: 3 }}>
                    <Table size="sm" bordered>
                        <thead>
                            <tr>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* TODO: implement the body (category name rows) */}
                            {categories.map(category => {
                                return createCategoryRow(category);
                            })}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

CategoriesList.propTypes = {
    categories: PropTypes.arrayOf(categoryType).isRequired
};

export default CategoriesList;

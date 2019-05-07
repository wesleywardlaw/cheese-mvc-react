import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Footer = () => (
    <footer className="fixed-bottom">
        <Row className="text-center">
            <Col xs={12}>
                Coded by&nbsp;
                <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/wesleywardlaw"
                >
                    Wesley Wardlaw
                </a>
            </Col>
        </Row>
    </footer>
);

export default Footer;

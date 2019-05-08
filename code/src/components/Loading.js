import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const Loading = () => (
    <div style={{ margin: '30% auto', width: '30%' }}>
        <Spinner animation="grow" variant="primary" />
        <Spinner animation="grow" variant="secondary" />
        <Spinner animation="grow" variant="success" />
        <Spinner animation="grow" variant="danger" />
        <Spinner animation="grow" variant="warning" />
        <Spinner animation="grow" variant="info" />
        <Spinner animation="grow" variant="dark" />
    </div>
);

export default Loading;

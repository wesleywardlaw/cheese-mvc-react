import React, { Component } from 'react';

class HomeView extends Component {
    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                <h1>Cheese MVC</h1>
                <h2>Cheese MVC allows for the creation of cheese menus</h2>
                <ol
                    style={{
                        width: '10%',
                        margin: '0 auto',
                        padding: '0'
                    }}
                >
                    <a href="/categories">
                        <li>Add Categories</li>
                    </a>
                    <a href="/cheeses">
                        <li>Create Cheeses</li>
                    </a>
                    <a href="/menus">
                        <li>Create Menus</li>
                    </a>
                </ol>
            </div>
        );
    }
}

export default HomeView;

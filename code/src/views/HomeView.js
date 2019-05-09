import React, { Component } from 'react';
import '../HomeView.css';

const listStyle = {
    color: 'white',
    fontSize: '1.5em'
};

class HomeView extends Component {
    render() {
        return (
            <div
                style={{
                    textAlign: 'center',
                    background: 'url(/images/cheese.jpg) center',
                    height: '85vh',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                }}
            >
                <div style={{ paddingTop: '10%' }}>
                    <h1 style={{ color: 'white' }}>Cheese MVC</h1>
                    <h2 style={{ color: 'white' }}>
                        Cheese MVC allows for the creation of cheese menus
                    </h2>
                    <ol
                        style={{
                            width: '15%',
                            margin: '0 auto',
                            padding: '0',
                            textShadow:
                                '0px 4px 3px rgba(0,0,0,0.4)' +
                                ',' +
                                '0px 8px 13px rgba(0,0,0,0.1)' +
                                ',' +
                                '0px 18px 23px rgba(0,0,0,0.1)'
                        }}
                    >
                        <a href="/categories">
                            <li style={listStyle}>Add Categories</li>
                        </a>
                        <a href="/cheeses">
                            <li style={listStyle}>Create Cheeses</li>
                        </a>
                        <a href="/menus">
                            <li style={listStyle}>Create Menus</li>
                        </a>
                    </ol>
                    {/* <img alt="cheese" src="/images/cheese.jpg" /> */}
                </div>
            </div>
        );
    }
}

export default HomeView;

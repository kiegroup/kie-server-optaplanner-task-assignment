import React, { Component } from 'react';
import { Nav, NavList, NavItem, NavVariants } from '@patternfly/react-core';

class Home extends Component {
    state = {
        activeItem: 0
    };

    onSelect = result => {
        this.setState({
            activeItem: result.itemId
        });
    };

    render() {
        const { activeItem } = this.state;

        return (
            <div style={{ backgroundColor: '#292e34', padding: '1rem' }}>
                <Nav onSelect={this.onSelect} aria-label="Primary Nav Horizontal Example">
                    <NavList variant={NavVariants.horizontal}>
                        <NavItem to="/home" itemId={0} isActive={activeItem === 0}>
                            Home
                        </NavItem>
                        <NavItem to="/tasks" itemId={1} isActive={activeItem === 1}>
                            Tasks
                        </NavItem>
                        <NavItem to="/employees" itemId={2} isActive={activeItem === 2}>
                            Employees
                        </NavItem>
                        <NavItem to="/employees" itemId={3} isActive={activeItem === 3}>
                            Customers
                        </NavItem>
                    </NavList>
                </Nav>
            </div>
        );
    }
}

export default Home;
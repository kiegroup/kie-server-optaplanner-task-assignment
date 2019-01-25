import React, { Component } from 'react';
import {
  Nav, NavList, NavItem, NavVariants,
} from '@patternfly/react-core';
import { NavLink } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 0,
    };

    this.onSelect = this.onSelect.bind(this);
  }

  onSelect = (result) => {
    this.setState({
      activeItem: result.itemId,
    });
  };

  render() {
    const { activeItem } = this.state;
    return (
      <div style={{ backgroundColor: '#292e34', padding: '1rem' }}>
        <div className="container">
          <div className="row">
            <Nav onSelect={this.onSelect} aria-label="Primary Nav Horizontal" className="mx-auto">
              <NavList variant={NavVariants.horizontal}>
                <NavItem itemId={0} isActive={activeItem === 0}>
                  <NavLink className="nav-link" to="/home"> Home</NavLink>
                </NavItem>
                <NavItem itemId={1} isActive={activeItem === 1}>
                  <NavLink className="nav-link" to="/skills"> Skills</NavLink>
                </NavItem>
                <NavItem itemId={2} isActive={activeItem === 2}>
                  <NavLink className="nav-link" to="/taskTypes"> Task Types</NavLink>
                </NavItem>
                <NavItem to="/customers" itemId={3} isActive={activeItem === 3}>
                  <NavLink className="nav-link" to="/customers"> Customers</NavLink>
                </NavItem>
                <NavItem to="/employees" itemId={4} isActive={activeItem === 4}>
                  <NavLink className="nav-link" to="/employees"> Employees</NavLink>
                </NavItem>
                <NavItem itemId={5} isActive={activeItem === 5}>
                  <NavLink className="nav-link" to="/tasks"> Tasks</NavLink>
                </NavItem>
              </NavList>
            </Nav>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;

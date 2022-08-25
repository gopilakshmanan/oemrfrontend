import React from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import Config from '../../config/Config.json'
import RolebasedNavigation from './RolebaseNavigation'

import './NavigationBar.css'

const NavigationBar = () => {
  return (
    <section id='nav-container'>
      <Navbar expand="md">
      <Navbar.Brand href="/">{Config.brand}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <RolebasedNavigation/>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </section>
  )
}

export default NavigationBar
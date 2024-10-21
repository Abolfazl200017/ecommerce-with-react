import * as React from 'react'
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarText } from 'reactstrap'
import { Link as RouterLink } from 'react-router-dom'

function Header(args) {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <header className='fixed-top left-0 vw-100 d-flex justify-content-center bg-white z-10'>
            <div className='container-lg'>
                <Navbar {...args} expand='md' >
                    <RouterLink to="/">
                        Ecommerce
                    </RouterLink>
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="me-auto" navbar>
                            <NavItem>
                                <NavLink href="/components/">Components</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="https://github.com/reactstrap/reactstrap">
                                    GitHub
                                </NavLink>
                            </NavItem>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Options
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>Option 1</DropdownItem>
                                    <DropdownItem>Option 2</DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem>Reset</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                        <div>
                            <NavbarText>Simple Text</NavbarText>
                            <RouterLink to="/login">Login</RouterLink>
                        </div>
                    </Collapse>
                </Navbar>
            </div>
        </header>
    );
}

export { Header }
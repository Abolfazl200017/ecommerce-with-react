import * as React from 'react'
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, NavLink, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarText, Spinner } from 'reactstrap'
import { Link as RouterLink } from 'react-router-dom'
import { useAuth } from '../context/auth-context';

// eslint-disable-next-line react/prop-types
function UserProfileLink({ user, status }) {
    if (status === 'resolved')
        if (!user)
            return <RouterLink to="/login">Login</RouterLink>
        else
            return <span>
                {user.username}
            </span>
    return <Spinner />
}

function Header(args) {
    const [isOpen, setIsOpen] = React.useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const { user, status } = useAuth()

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
                                    {user ? user.username : ''}
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
                        <div className='d-flex align-items-center'>
                            <NavbarText>Simple Text</NavbarText>
                            <UserProfileLink user={user} status={status} />
                        </div>
                    </Collapse>
                </Navbar>
            </div>
        </header>
    );
}

export { Header }
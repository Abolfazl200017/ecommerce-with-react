/* eslint-disable react/prop-types */
import * as React from 'react'
import { Collapse, Navbar, NavbarToggler, Nav, Spinner, NavItem, NavLink } from 'reactstrap'
import { Link as RouterLink } from 'react-router-dom'
import { useAuth } from '../context/auth-context';
import add from '../assets/images/add-to-cart.png'

function UserProfileLink({ user, status, logout }) {
    if (status === 'resolved')
        if (!user)
            return <div className='px-3'>
                <RouterLink to="/login">Login</RouterLink>
            </div>
        else
            return <div className='px-3 d-flex align-items-center'>
                <RouterLink to='/basket' className='px-3'>
                    <img style={{ width: '25px', height: '25px' }} src={add} />
                </RouterLink>
                <button onClick={logout} className='px-2 text-secondary bg-white border-0 outline-0'>
                    logout
                </button>
                <span className='user-select-none'>
                    {user.username}
                </span>
            </div>
    return <Spinner />
}

function Header(args) {
    const [isOpen, setIsOpen] = React.useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const { user, status, logout } = useAuth()

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
                            <NavItem className='px-3'>
                                <RouterLink to='/products' >
                                    products
                                </RouterLink>
                            </NavItem>
                        </Nav>
                        <div className='d-flex align-items-center justify-content-center'>
                            <UserProfileLink user={user} status={status} logout={logout} />
                        </div>
                    </Collapse>
                </Navbar>
            </div>
        </header>
    );
}

export { Header }
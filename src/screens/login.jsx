import { Form, FormGroup, Col, Label, Input, Button } from 'reactstrap'
import { useAuth } from '../context/auth-context'
import { Spinner, Alert } from 'reactstrap'
import * as React from "react"
import FullPageSpinner from '../components/full-page-loading'

function Login() {
    const { login, status, user } = useAuth()
    const [showAlert, setShowAlert] = React.useState(false)
    const handleSubmit = (e) => {
        setShowAlert(true)
        e.preventDefault()
        if (e.target[0].value && e.target[1].value)
            login({ username: e.target[0].value, password: e.target[1].value })
    }

    React.useEffect(() => {
        if (status === 'resolved' && Boolean(user)) {
            console.log('redirect')
            window.location.href = '/'
        }
    }, [status, user])

    if (!user)
        return <div className='container-lg rounded border p-3'>
            <div className='pb-3 fs-2 fw-bold text-primary' >
                Login
            </div>
            <Form onSubmit={handleSubmit}>
                <FormGroup row>
                    <Label
                        for="exampleUsername"
                        sm={4}
                    >
                        Username
                    </Label>
                    <Col sm={8}>
                        <Input
                            id="exampleUsername"
                            name="username"
                            placeholder="kevinryan"
                            type="text"
                        // readOnly="false"
                        />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label
                        for="examplePassword"
                        sm={4}
                    >
                        Password
                    </Label>
                    <Col sm={8}>
                        <Input
                            id="examplePassword"
                            name="password"
                            placeholder="kev02937@"
                            type="password"
                        // readOnly="false"
                        />
                    </Col>
                </FormGroup>
                {
                    status === 'pending' ? (
                        <Spinner color="primary">
                            Loading...
                        </Spinner>
                    ) : (
                        <Button color='primary'>
                            Submit
                        </Button>
                    )
                }
                <Alert isOpen={showAlert && Boolean(status === 'resolved' && !user)} color="danger" className='mt-3'>
                    username or password was wrong
                </Alert>
            </Form>
        </div>

    return <FullPageSpinner />
}

export default Login
import { Form, FormGroup, Col, Label, Input, Button } from 'reactstrap'

const submitLogin = (e) => {
    e.preventDefault()
    if (e.target[0].value && e.target[1].value)
        console.log(e.target[0].value)
}

function Login() {
    return <div className='container-lg rounded border p-3'>
        <div className='pb-3 fs-2 fw-bold text-primary' >
            Login
        </div>
        <Form onSubmit={submitLogin}>
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
            <Button color='primary'>
                Submit
            </Button>
        </Form>
    </div>
}

export default Login
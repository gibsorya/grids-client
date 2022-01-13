import React, { Component, useRef, useState, useEffect, useContext } from "react";
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import "../../styles/main.scss"
import axios from "axios";
// class Login extends Component {
//     constructor(){
//         super();
//         this.state = {
//             validated: false
//         };
//     }

//     handleSubmit = (event) => {
//       const form = event.currentTarget;
//       if (form.checkValidity() === false) {
//         event.preventDefault();
//         event.stopPropagation();
//       }
      
//       axios.post("/login")

//       this.setValidated();
//     //   console.log(this.state.validated)
//     };

//     findFormErrors = () => {
//         const { username, password } = form
//         const newErrors = {}
//         if(!username || username === '') newErrors.name = ""
//     }

//     setValidated() {
//         this.state.validated = true;
//     }
    

//     render() {
//         return(
//             <div className="justify-content-center align-items-center d-flex vh-100">
//                 <Container className="" fluid="">
//                     <Row xs={1} className="g-4 justify-content-xl-center">
//                         <Card style= {{width: "20rem" }} className="bg-dark p-3">
//                             <Card.Body className="font-weight-bold header text-white justify-content-md-center">
//                                 Login
//                             </Card.Body>
//                             <Form noValidate onSubmit={this.handleSubmit} >
//                                 {/* <InputGroup hasValidation> */}
//                                     <Form.Group className="mb-3" controlId="formUsername">
//                                         <Form.Label className="d-flex text-white align-items-start">Username</Form.Label>
//                                         <Form.Control type="text" placeholder="Enter username" required />
//                                         <Form.Control.Feedback type="invalid">
//                                             Please enter your username!
//                                         </Form.Control.Feedback>
//                                     </Form.Group>
//                                 {/* </InputGroup> */}
//                                 <Form.Group className="mb-3" controlId="formPassword">
//                                     <Form.Label className="text-white align-items-start d-flex">Password</Form.Label>
//                                     <Form.Control type="password" placeholder="Password" required />
//                                     <Form.Control.Feedback type="invalid">
//                                         Please enter your password!
//                                     </Form.Control.Feedback>
//                                 </Form.Group>
//                                 <Button variant="flat" type="submit">
//                                     Submit
//                                 </Button>
//                             </Form>
//                         </Card>
//                     </Row>
//                 </Container>
//             </div>
//         );
//     }
// }

const Login = () => {
    const [validated, setValidated] = useState(false);
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    // useEffect(() => {
    //     userRef.current.focus();
    // }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async(e) => {
        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        console.log(validated)

        try {
            const response = await axios.post('/login',
                JSON.stringify({ username: user, password: pwd }),
                {
                    headers: {'Content-Type': 'application/json'},
                    withCredentials: true
                });
            
            console.log(JSON.stringify(response?.data));

            setValidated(true);

            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
        } catch(err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            // errRef.current.focus();
        }
    }

    return(
    <div className="justify-content-center align-items-center d-flex vh-100">
    <Container className="" fluid="">
        <Row xs={1} className="g-4 justify-content-xl-center">
            <Card style= {{width: "20rem" }} className="bg-dark p-3">
                <Card.Body className="font-weight-bold header text-white justify-content-md-center">
                    Login
                </Card.Body>
                <Form noValidate validated={validated} onSubmit={handleSubmit} >
                    {/* <InputGroup hasValidation> */}
                        <Form.Group className="mb-3" controlId="formUsername">
                            <Form.Label className="d-flex text-white align-items-start">Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter username"  onChange={(e) => setUser(e.target.value)} required />
                            <Form.Control.Feedback type="invalid">
                                Please enter your username!
                            </Form.Control.Feedback>
                        </Form.Group>
                    {/* </InputGroup> */}
                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label className="text-white align-items-start d-flex">Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" required onChange={(e) => setPwd(e.target.value)} />
                        <Form.Control.Feedback type="invalid">
                            Please enter your password!
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button variant="flat" type="submit">
                        Submit
                    </Button>
                </Form>
            </Card>
        </Row>
    </Container>
    </div>
    );
}

export default Login;
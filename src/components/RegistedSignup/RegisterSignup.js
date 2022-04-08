import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import app from '../../firebase.init';
import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';

const auth = getAuth(app);
const RegisterSignup = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('')
    const [error, setError] = useState('')
    const [validated, setValidated] = useState(false);
    const [registered, setRegistered] = useState(false);


    const handleEmailBlur = e => {
        setEmail(e.target.value)
    }
    const handlePassBlur = e => {
        setPass(e.target.value)
    }

    const handleFormSubmit = e => {
        e.preventDefault()
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
            return
        }

        if (!/^(?=(.*[a-z]){3,})(?=(.*[A-Z]){2,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/.test(pass)) {
            setError('Password should contain at leaset 8 charecter,2 number, 2 uppercase, 1 special charecter, 3 lowercase')
            return;
        }

        setValidated(true);
        setError('')

        if (registered) {
            signInWithEmailAndPassword(auth, email, pass)
                .then(result => {
                    console.log(result.user)
                })
                .catch(error => {
                    console.error(error);
                    setError(error.message)
                })
        }
        else {
            createUserWithEmailAndPassword(auth, email, pass)
                .then((userCredential) => {
                    const user = userCredential.user
                    console.log(user)
                    setEmail('')
                    setPass('')
                    varifyEmail()
                })
                .catch(error => {
                    console.error(error)
                    setError(error.message)
                })
        }
    }
    const handleRegistered = event => {
        setRegistered(event.target.checked)
    }
    const varifyEmail = () => {
        sendEmailVerification(auth.currentUser)
            .then(() => {
                console.log('varification sent')
            })
    }

    const handlePassReset = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                console.log('reset pass send')
            })
            .catch(error => {
                setError(error.message)
            })
    }

    return (
        <div>

            <div className="register w-50 mx-auto">
                <h2 className="text-primary my-3">{registered ? 'LogIn' : "Register"} Now!!!</h2>
                <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onBlur={handleEmailBlur} required type="email" placeholder="Enter email" />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid Email.
                        </Form.Control.Feedback>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onBlur={handlePassBlur} required type="password" placeholder="Password" />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid Password.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check onChange={handleRegistered} type="checkbox" label="Already Registered?" />
                    </Form.Group>
                    <p className="text-danger">{error}</p>
                    <Button onClick={handlePassReset} variant='link' >Forgot Password?</Button>
                    <br />
                    <Button variant="primary" type="submit">
                        {registered ? 'LogIn' : "Register"}
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default RegisterSignup;
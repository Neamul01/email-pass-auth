import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from './firebase.init';
import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';


const auth = getAuth(app);

function App() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')
  const [validated, setValidated] = useState(false);


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


    createUserWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        const user = userCredential.user
        console.log(user)
      })
      .catch(error => {
        console.error(error)
      })
  }

  return (
    <div>
      <div className="register w-50 mx-auto">
        <h2 className="text-primary my-3">Register Now!!!</h2>
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
          <p className="text-danger">{error}</p>
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;

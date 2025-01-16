import { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from '../store/slices/userSlice';
import { ApiError } from '../types/ApiError';
import { getError } from '../utils';
import { RootState } from '../store/store';
import axios from 'axios';

// SignupPage Component
export default function SignupPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');

  const { user, isLoggedIn } = useSelector(
    (state: RootState) => state.user as { user: any; isLoggedIn: boolean }
  );

  useEffect(() => {
    if (isLoggedIn && user) {
      navigate('/');
    }
  }, [isLoggedIn, user, navigate]);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('Name is required');
      return;
    }
    if (!phone.trim() || phone.length < 10) {
      toast.error('Valid phone number is required');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const data = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", {
        name, email, phone, password,
      });
      dispatch(signUp({ name, email, phone, password, userInfo: data }));
      localStorage.setItem('userInfo', JSON.stringify(data));
      toast.success('Sign up successfully');
      navigate('/');
    } catch (err) {
      toast.error(getError(err as ApiError));
    }
  };

  return (
    <Container className="small-container">
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <h1 className="my-3">Sign Up</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="phone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            required
            placeholder="Enter your phone number"
            onChange={(e) => setPhone(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            required
            placeholder="Confirm your password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">
            Sign Up
          </Button>
        </div>
        <div className="mb-3">
          Already have an account? <Link to="/signin">Sign In</Link>
        </div>
      </Form>
    </Container>
  );
}

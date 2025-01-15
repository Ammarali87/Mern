import { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingBox from '../components/LoadingBox';
import { useSigninMutation } from '../hooks/userHooks';
import { ApiError } from '../types/ApiError';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../store/slices/userSlice';
 import { getError } from '../utils';
import { RootState } from '../store/store';

export default function SigninPage() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const dispatch = useDispatch();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { user, isLoggedIn } = useSelector((state: RootState) => state.user as { user: any; isLoggedIn: boolean });

  useEffect(() => {
    if (isLoggedIn && user) {
      navigate(redirect);
    }
  }, [isLoggedIn, user, navigate, redirect]);
             
  // update loading to status

  const { mutateAsync: signin, status } = useSigninMutation();

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await signin({ email, password });
      dispatch(signIn(data));
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect);
    } catch (err) {
      toast.error(getError(err as ApiError));
    }
  };

  return (
    <Container className="small-container">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h1 className="my-3">Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button disabled={status === 'pending'} type="submit">
            Sign In
          </Button>
          {status === 'pending' && <LoadingBox />}
        </div>
        <div className="mb-3">
          New customer?{' '}
          <Link to={`/signUp`}>Create your account</Link>
        </div>
      </Form>
    </Container>
  );
}

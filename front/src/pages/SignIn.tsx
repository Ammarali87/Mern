import { useFormik } from 'formik';
import * as yup from 'yup';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { signIn } from '../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutateAsync } = useMutation(async (values: { email: string; password: string }) => {
    const res = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    if (!res.ok) throw new Error('Login failed');
    return res.json();
  });

  const validationSchema = yup.object({
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().min(3, 'Password must be at least 3 characters').required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const data = await mutateAsync(values);
        dispatch(signIn({ user: data.user, token: data.token }));
        localStorage.setItem('token', data.token);
        navigate('/');
      } catch (error) {
        console.error('Error signing in:', error);
        formik.setFieldError('email', 'Invalid email or password');
      }
    },
  });

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={formik.handleSubmit}>
        <input
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Email"
        />
        {formik.errors.email && formik.touched.email && <div>{formik.errors.email}</div>}

        <input
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Password"
          type="password"
        />
        {formik.errors.password && formik.touched.password && <div>{formik.errors.password}</div>}

        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

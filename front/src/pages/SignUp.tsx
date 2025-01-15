import React from 'react'

export default function SignUp() {
  return (
    <div>SignUp</div>
  )
}


// import { useFormik } from 'formik';
// import * as yup from 'yup';
// import { useMutation } from 'react-query';
// import { useNavigate } from 'react-router-dom';

// export default function SignUp() {
//   const navigate = useNavigate();

//   const { mutateAsync } = useMutation(async (values: { name: string; email: string; password: string; rePassword: string }) => {
//     const res = await fetch('https://ecommerce.routemisr.com/api/v1/auth/signup', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(values),
//     });
//     if (!res.ok) throw new Error('Sign up failed');
//     return res.json();
//   });

//   const validationSchema = yup.object({
//     name: yup.string().required('Name is required'),
//     email: yup.string().email('Invalid email format').required('Email is required'),
//     password: yup.string().min(3, 'Password must be at least 3 characters').required('Password is required'),
//     rePassword: yup
//       .string()
//       .oneOf([yup.ref('password'), undefined], 'Passwords must match')
//       .required('Confirm password is required'),
//   });

//   const formik = useFormik({
//     initialValues: {
//       name: '',
//       email: '',
//       password: '',
//       rePassword: '',
//     },
//     validationSchema,
//     onSubmit: async (values) => {
//       try {
//         await mutateAsync(values);
//         navigate('/login');
//       } catch (error) {
//         console.error('Error signing up:', error);
//         formik.setFieldError('email', 'Sign up failed');
//       }
//     },
//   });

//   return (
//     <div>
//       <h1>Sign Up</h1>
//       <form onSubmit={formik.handleSubmit}>
//         <input
//           name="name"
//           value={formik.values.name}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           placeholder="Name"
//         />
//         {formik.errors.name && formik.touched.name && <div>{formik.errors.name}</div>}

//         <input
//           name="email"
//           value={formik.values.email}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           placeholder="Email"
//         />
//         {formik.errors.email && formik.touched.email && <div>{formik.errors.email}</div>}

//         <input
//           name="password"
//           value={formik.values.password}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           placeholder="Password"
//           type="password"
//         />
//         {formik.errors.password && formik.touched.password && <div>{formik.errors.password}</div>}

//         <input
//           name="rePassword"
//           value={formik.values.rePassword}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           placeholder="Confirm Password"
//           type="password"
//         />
//         {formik.errors.rePassword && formik.touched.rePassword && <div>{formik.errors.rePassword}</div>}

//         <button type="submit">Sign Up</button>
//       </form>
//     </div>
//   );
// }

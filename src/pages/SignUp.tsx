import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { string, ref, object } from 'yup';
import { useSignUpMutation } from '../queries/useSignUpMutation';
import { useState } from 'react';

export default function SignUp() {
  const passwordFormatLabel =
    'Your password must contain at least 8 characters, including 1 uppercase letter, 1 lowercase letter, 1 digit and 1 special character';
  const passwordRules =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+]).{8,}$/;

  const [error, setError] = useState<string | null>(null);

  const { mutate } = useSignUpMutation();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: object({
      email: string().email('Invalid email address').required('Required'),
      password: string()
        .matches(passwordRules, passwordFormatLabel)
        .required('Required'),
      passwordConfirmation: string()
        .oneOf([ref('password')], 'Passwords should match')
        .required('Required'),
    }),
    onSubmit: values => {
      mutate(
        {
          email: values.email,
          password: values.password,
        },
        {
          onSuccess: () => navigate('/login'),
          onError: () =>
            setError(
              'Something went wrong while signing up, please try again later.',
            ),
        },
      );
    },
  });

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="card card-compact flex w-10/12 flex-col items-stretch bg-slate-100 p-12 md:w-3/5 lg:w-2/5">
        <h1 className="mb-8 text-2xl font-medium ">Sign up</h1>
        <form
          className="flex flex-col items-stretch"
          onSubmit={formik.handleSubmit}
        >
          <div className="form-control w-full">
            <label className="label">Email</label>
            <input
              type="text"
              name="email"
              placeholder="ulysse@gmail.com"
              className="input input-bordered w-full"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <label className="label text-sm text-red-600">
              {formik.errors.email}
            </label>
          </div>
          <div className="form-control w-full">
            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              autoComplete="on"
              placeholder="************"
              className="input input-bordered w-full"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <label className="label text-sm text-red-600">
              {formik.errors.password}
            </label>
          </div>
          <div className="form-control w-full">
            <label className="label">Password confirmation</label>
            <input
              type="password"
              name="passwordConfirmation"
              autoComplete="on"
              placeholder="************"
              className="input input-bordered w-full"
              onChange={formik.handleChange}
              value={formik.values.passwordConfirmation}
            />
            <label className="label text-sm text-red-600">
              {formik.errors.passwordConfirmation}
            </label>
          </div>
          <button
            className="btn btn-primary btn-sm mt-4 self-center"
            type="submit"
          >
            Sign up
          </button>
        </form>
        <label className="label mt-4 text-sm text-red-600">{error}</label>
        <span className="mt-6 text-sm">
          Already have an account?{' '}
          <Link className="link mt-8" to="/login">
            Login
          </Link>
        </span>
      </div>
    </div>
  );
}

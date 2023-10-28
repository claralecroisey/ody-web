import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSignInMutation } from '../queries/useSignInMutation';
import { useSignIn } from 'react-auth-kit';

export default function Login() {
  const signIn = useSignIn();
  const { mutate } = useSignInMutation();
  const navigate = useNavigate();

  const [error, setError] = useState<string | null>(null);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!loginForm.email || !loginForm.password) {
      setError('Please fill in all fields');
      return;
    }

    mutate(loginForm, {
      onSuccess: data => {
        if (data) {
          signIn({
            token: data.access_token,
            expiresIn: data.expires_in,
            tokenType: 'Bearer',
            authState: { email: loginForm.email },
          });
          navigate('/dashboard');
        }
      },
      onError: error => {
        setError(error.response!.data.message);
      },
    });
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="card card-compact flex w-10/12 flex-col items-stretch bg-slate-100 p-12 md:w-3/5 lg:w-2/5">
        <h1 className="mb-8 text-2xl font-medium ">Welcome back!</h1>
        <form onSubmit={handleSubmit} className="flex flex-col items-stretch">
          <div className="form-control w-full">
            <label className="label">Email</label>
            <input
              type="text"
              name="email"
              placeholder="ulysse@gmail.com"
              className="input input-bordered w-full"
              onChange={handleInputChange}
              value={loginForm.email}
            />
          </div>
          <div className="form-control w-full">
            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              autoComplete="on"
              placeholder="************"
              className="input input-bordered w-full"
              onChange={handleInputChange}
              value={loginForm.password}
            />
          </div>
          <button
            className="btn btn-primary btn-sm mt-4 self-center"
            type="submit"
          >
            Log in
          </button>
        </form>
        <label className="label min-h-12 mt-4 text-sm text-red-600">
          {error}
        </label>
        <span className="mt-4 text-sm">
          Don't have an account yet?{' '}
          <Link className="link mt-8" to="/login">
            Sign up
          </Link>
        </span>
      </div>
    </div>
  );
}

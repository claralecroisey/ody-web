import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className="container">
      <h1 className="text-2xl font-medium">Login page</h1>
      Don't have an account yet?
      <Link className="link" to="/sign-up">
        Sign up
      </Link>
    </div>
  );
}

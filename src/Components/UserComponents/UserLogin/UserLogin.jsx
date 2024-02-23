import React, { useEffect, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, signInWithGoogle } from '../../../firebase';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import './UserLogin.scss';

const UserLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading, error] = useAuthState(auth);


  useEffect(() => {
    if (loading) return;
    if (user) navigate("/")
  }, [user, loading]);

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate('/');
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <main>
      <section className="user-login-container">
        <div className="user-login-form">
          {/* <p className="text-white text-center">FocusApp</p> */}
          <form>
            <div>
              <label htmlFor="email-address">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <button onClick={onLogin}>Login</button>
              <button className="login__btn login__google" onClick={signInWithGoogle}>
                Login with Google
              </button>
            </div>
          </form>

          <p className="text-sm text-white text-center">
            No account yet?{' '}
            <NavLink to="/user-register">
              Sign up
            </NavLink>
          </p>
        </div>
      </section>
    </main>
  );
};

export default UserLogin;

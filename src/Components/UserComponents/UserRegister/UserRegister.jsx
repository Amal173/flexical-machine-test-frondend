import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, signInWithGoogle } from '../../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import './UserRegister.scss'; 

const UserRegister = () => {
  
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (!loading && user) navigate('/');
  }, [user, loading]);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;
      console.log(newUser);
      navigate('/user-login');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
    }
  };

  return (
    <main>
      <section className="user-register-container">
        <div className="user-register-form">
          <h1>Register Here</h1>
          <form>
            <div>
              <label htmlFor="email-address">Email address</label>
              <input
                type="email"
                label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email address"
              />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                label="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
              />
            </div>

            <button type="submit" onClick={onSubmit}>Sign up</button>
            <button className="register__btn register__google" onClick={signInWithGoogle}>
              Register with Google
            </button>
          </form>

          <p className="already-have-account">
            Already have an account?{' '}
            <NavLink to="/user-login">
              Sign in
            </NavLink>
          </p>
        </div>
      </section>
    </main>
  );
};

export default UserRegister;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/login.module.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'username' && password === 'password') {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/home');
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div className={styles.loginBackground}>
      <div className={styles.loginContainer}>
        <div className={styles.loginBox}>
          <h2>Iniciar sesión</h2>
          <form onSubmit={handleLogin}>
            <div className={styles.inputGroup}>
              <label htmlFor="username">Usuario</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className={styles.links}>
              <a href="/forgot-password" className={styles.link}>Olvidé mi clave</a>
              <a href="/register" className={styles.link}>Registrarse</a>
            </div>
            <button type="submit" className={styles.loginButton}>Ingresar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
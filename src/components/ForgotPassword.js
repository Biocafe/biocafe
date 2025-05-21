import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/login.module.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === confirmEmail) {
      setMessage(`El correo para restablecer su clave fue enviado de manera satisfactoria a ${email}`);
    } else {
      setMessage('Los correos no coinciden.');
    }
  };

  return (
    <div className={styles.loginBackground}>
      <div className={styles.loginContainer}>
        <div className={styles.loginBox}>
          <h2>Restablecer Clave</h2>
          {message ? (
            <>
              <p>{message}</p>
              <button className={styles.loginButton} onClick={() => navigate('/')}>Volver</button>
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label htmlFor="email">Correo electrónico</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="confirmEmail">Confirmar correo</label>
                <input
                  type="email"
                  id="confirmEmail"
                  value={confirmEmail}
                  onChange={(e) => setConfirmEmail(e.target.value)}
                  required
                />
              </div>
              <div className={styles.links}>
                <button type="submit" className={styles.loginButton}>Enviar</button>
                <button type="button" className={styles.loginButton} onClick={() => navigate('/')}>Volver</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
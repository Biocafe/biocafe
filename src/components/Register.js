import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Register.module.css';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [idType, setIdType] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === confirmEmail) {
      setMessage(`Su usuario ha sido registrado exitosamente. Se acaba de enviar un correo electrónico a ${email} con más detalles.`);
    } else {
      setMessage('Los correos no coinciden.');
    }
  };

  return (
    <div className={styles.loginBackground}>
      <div className={styles.loginContainer}>
        <div className={styles.loginBox}>
          <h2>Registrarse</h2>
          {message ? (
            <>
              <p>{message}</p>
              <button className={styles.loginButton} onClick={() => navigate('/')}>Volver</button>
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className={styles.inputGroup}>
                <label htmlFor="fullName">Nombre Completo</label>
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className={styles.selectGroup}>
                  <label htmlFor="idType">Tipo de Identificación</label>
                  <select id="idType" value={idType} onChange={(e) => setIdType(e.target.value)} required>
                    <option value="">Seleccione</option>
                    <option value="cedula">Cédula</option>
                    <option value="permiso">Permiso por Protección Temporal</option>
                    <option value="pasaporte">Pasaporte</option>
                    <option value="cedula-extranjeria">Cédula de Extranjería</option>
                  </select>
                </div>

              <div className={styles.inputGroup}>
                <label htmlFor="idNumber">Número de Identificación</label>
                <input
                  type="text"
                  id="idNumber"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="email">Correo Electrónico</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <label htmlFor="confirmEmail">Confirmar Correo</label>
                <input
                  type="email"
                  id="confirmEmail"
                  value={confirmEmail}
                  onChange={(e) => setConfirmEmail(e.target.value)}
                  required
                />
              </div>
              <div className={styles.links}>
                <button type="submit" className={styles.loginButton}>Registrarse</button>
                <button type="button" className={styles.loginButton} onClick={() => navigate('/')}>Volver</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
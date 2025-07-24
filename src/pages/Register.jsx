import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import styles from '../styles/Register.module.css'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [name, setName] = useState('')


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post('/auth/register', { name, email, password })
      alert(res.data.msg || 'Usuario registrado correctamente')
      navigate('/login')
    } catch (err) {
      const msg = err.response?.data?.msg || (err.response?.data?.errors?.[0]?.msg) || 'Error al registrarse'
      alert(msg)
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Crear cuenta</h2>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
          required
        />

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          required
        />

        <button type="submit" className={styles.button}>
          Registrarse
        </button>

        <p className={styles.link}>
          ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
        </p>
      </form>
    </div>
  )
}

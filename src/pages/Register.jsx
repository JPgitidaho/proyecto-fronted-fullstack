import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../lib/api';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
await api.post('/api/auth/register', form);
      navigate('/login');
    } catch (err) {
      setError(err?.response?.data?.message || 'Error al registrarte');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input name="name" value={form.name} onChange={onChange} />
      <input name="email" type="email" value={form.email} onChange={onChange} />
      <input name="password" type="password" value={form.password} onChange={onChange} />
      {error && <p>{error}</p>}
      <button type="submit" disabled={loading}>{loading ? 'Guardando...' : 'Crear cuenta'}</button>
      <p>¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
    </form>
  );
}

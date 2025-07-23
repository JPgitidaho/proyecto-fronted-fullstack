import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await api.post('/auth/login', form)
      localStorage.setItem('token', res.data.token)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Error al iniciar sesión')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
      <form onSubmit={handleSubmit} className="bg-slate-800 p-8 rounded-lg shadow-md w-full max-w-sm space-y-5">
        <h2 className="text-3xl font-bold text-center text-white">Iniciar sesión</h2>
        <input
          type="email"
          name="email"
          placeholder="Correo"
          onChange={handleChange}
          className="w-full p-2 bg-slate-700 text-white border border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={handleChange}
          className="w-full p-2 bg-slate-700 text-white border border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Entrar
        </button>
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        <p className="text-center text-sm text-slate-300">
          ¿No tienes cuenta? <a href="/register" className="text-blue-400 hover:underline">Regístrate</a>
        </p>
      </form>
    </div>
  )
}

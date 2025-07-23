import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await api.post('/auth/register', form)
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrar')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
      <form onSubmit={handleSubmit} className="bg-slate-800 p-8 rounded-lg shadow-md w-full max-w-sm space-y-5">
        <h2 className="text-3xl font-bold text-center text-white">Crear cuenta</h2>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          onChange={handleChange}
          className="w-full p-2 bg-slate-700 text-white border border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
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
          Registrarse
        </button>
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        <p className="text-center text-sm text-slate-300">
          ¿Ya tienes cuenta? <a href="/login" className="text-blue-400 hover:underline">Inicia sesión</a>
        </p>
      </form>
    </div>
  )
}

import { useEffect, useState } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'

export default function Tasks() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const navigate = useNavigate()

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks')
      setTasks(res.data)
    } catch {
      navigate('/login')
    }
  }

  const createTask = async e => {
    e.preventDefault()
    if (!newTask.trim()) return
    await api.post('/tasks', { title: newTask })
    setNewTask('')
    fetchTasks()
  }

  const deleteTask = async id => {
    await api.delete(`/tasks/${id}`)
    fetchTasks()
  }

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  return (
    <div className="min-h-screen bg-[#0f172a] p-4 text-white">
      <div className="max-w-xl mx-auto bg-slate-800 p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Mis Tareas</h2>
          <button onClick={logout} className="text-sm text-red-400 hover:underline">Cerrar sesión</button>
        </div>
        <form onSubmit={createTask} className="flex mb-4 gap-2">
          <input
            type="text"
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            className="flex-grow p-2 bg-slate-700 text-white border border-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Escribe una nueva tarea"
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Crear
          </button>
        </form>
        <ul className="space-y-2">
          {tasks.map(t => (
            <li key={t._id} className="flex justify-between items-center p-3 border border-slate-700 rounded hover:bg-slate-700 transition">
              <span>{t.title}</span>
              <button onClick={() => deleteTask(t._id)} className="text-sm text-red-400 hover:underline">
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

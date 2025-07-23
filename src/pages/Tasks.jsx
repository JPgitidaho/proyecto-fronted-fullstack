import { useEffect, useState } from 'react'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'
import styles from '../styles/Tasks.module.css'

export default function Tasks() {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const navigate = useNavigate()

  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) return navigate('/login')

    api
      .get('/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setTasks(res.data))
      .catch(() => navigate('/login'))
  }, [token, navigate])

  const handleCreate = async (e) => {
    e.preventDefault()
    if (!newTask.trim()) return
    try {
      const res = await api.post(
        '/tasks',
        { title: newTask },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setTasks([...tasks, res.data])
      setNewTask('')
    } catch (err) {
      alert('Error al crear tarea')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Mis Tareas</h1>

      <form onSubmit={handleCreate} className={styles.form}>
        <input
          type="text"
          placeholder="Nueva tarea"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Agregar
        </button>
      </form>

      <ul className={styles.list}>
        {tasks.map((task) => (
          <li key={task._id} className={styles.item}>
            {task.title}
          </li>
        ))}
      </ul>

      <button onClick={handleLogout} className={styles.logout}>
        Cerrar sesión
      </button>
    </div>
  )
}

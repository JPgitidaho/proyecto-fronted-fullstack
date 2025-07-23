import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Tasks from './pages/Tasks'
import styles from './styles/App.module.css'


function App() {
  const isAuthenticated = !!localStorage.getItem('token')

  return (
    <div className={styles.container}>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Tasks /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  )
}

export default App

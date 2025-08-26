import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute() {
  const t = localStorage.getItem('token');
  return t ? <Outlet/> : <Navigate to="/login" replace/>;
}

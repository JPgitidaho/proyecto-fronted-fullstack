import { useEffect, useState } from 'react';
import { api, endpoints } from '../lib/api';

export default function Tasks() {
  const [me, setMe] = useState(null);
  const [err, setErr] = useState('');
  useEffect(() => {
    api.get(endpoints.me).then(r => setMe(r.data)).catch(e => setErr(e?.response?.data?.message || 'Error'));
  }, []);
  return (
    <div style={{padding:16}}>
      <h1>Tareas</h1>
      {err && <p>{err}</p>}
      {me && <p>Hola, {me.name} ({me.email})</p>}
    </div>
  );
}

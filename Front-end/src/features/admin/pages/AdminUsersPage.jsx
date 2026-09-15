import { useState } from 'react';

export default function AdminUsersPage({ users, onDelete, onToggleBlock }) {
  const [busyId, setBusyId] = useState('');
  const [error, setError] = useState('');

  const run = async (action, id) => {
    try {
      setBusyId(id);
      setError('');
      await action(id);
    } catch (requestError) {
      setError(requestError?.response?.data?.message || 'Unable to update user.');
    } finally {
      setBusyId('');
    }
  };

  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '1rem' }}>
      <h2 style={{ marginTop: 0 }}>Users</h2>
      {error && <p style={{ color: '#dc2626' }}>{error}</p>}
      <div style={{ display: 'grid', gap: '0.8rem' }}>
        {users.map((user) => (
          <div key={user._id || user.id} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.6rem' }}>
            <div>
              <strong>{user.name}</strong>
              <div style={{ color: '#64748b' }}>{user.email}</div>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <span>{user.role}</span>
              <button type="button" disabled={busyId === user._id} onClick={() => run(onToggleBlock, user._id)}>{user.isBlocked ? 'Unblock' : 'Block'}</button>
              <button type="button" disabled={busyId === user._id} onClick={() => run(onDelete, user._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

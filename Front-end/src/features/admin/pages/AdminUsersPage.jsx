export default function AdminUsersPage({ users }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '1rem' }}>
      <h2 style={{ marginTop: 0 }}>Users</h2>
      <div style={{ display: 'grid', gap: '0.8rem' }}>
        {users.map((user) => (
          <div key={user.id} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.6rem' }}>
            <div>
              <strong>{user.name}</strong>
              <div style={{ color: '#64748b' }}>{user.email}</div>
            </div>
            <span>{user.role}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

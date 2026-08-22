const profileStyles = {
  card: { background: '#fff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '1.25rem' },
  label: { display: 'block', marginBottom: '0.35rem', fontWeight: 600 },
  input: { width: '100%', padding: '0.8rem 0.9rem', borderRadius: '12px', border: '1px solid #cbd5e1', background: '#fff' }
};

export default function ProfilePage({ currentUser }) {
  if (!currentUser) {
    return <div style={profileStyles.card}>Please log in to view your profile.</div>;
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
      <div style={profileStyles.card}>
        <h2 style={{ marginTop: 0 }}>Profile</h2>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <label>
            <span style={profileStyles.label}>Full name</span>
            <input value={currentUser.name} style={profileStyles.input} readOnly />
          </label>
          <label>
            <span style={profileStyles.label}>Email</span>
            <input value={currentUser.email} style={profileStyles.input} readOnly />
          </label>
          <label>
            <span style={profileStyles.label}>Role</span>
            <input value={currentUser.role} style={profileStyles.input} readOnly />
          </label>
        </div>
      </div>

      <div style={profileStyles.card}>
        <h2 style={{ marginTop: 0 }}>Account status</h2>
        <div style={{ display: 'grid', gap: '0.8rem' }}>
          <div><strong>Verification:</strong> {currentUser.isVerified ? 'Verified' : 'Pending'}</div>
          <div><strong>Active:</strong> {currentUser.isActive ? 'Active' : 'Blocked'}</div>
          <div><strong>Phone:</strong> {currentUser.phone || 'Not set'}</div>
          <div><strong>Address:</strong> {currentUser.address || 'Not set'}</div>
        </div>
      </div>
    </div>
  );
}

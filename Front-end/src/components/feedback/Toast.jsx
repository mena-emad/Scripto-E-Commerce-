export default function Toast({ message, type = 'success', visible }) {
  if (!visible) return null;

  const tones = {
    success: { background: '#dcfce7', color: '#166534' },
    error: { background: '#fee2e2', color: '#991b1b' },
    info: { background: '#dbeafe', color: '#1d4ed8' }
  };

  return (
    <div style={{
      position: 'fixed',
      right: '1.2rem',
      bottom: '1.2rem',
      zIndex: 2000,
      borderRadius: '12px',
      padding: '0.9rem 1rem',
      boxShadow: '0 16px 35px rgba(15, 23, 42, 0.12)',
      ...tones[type]
    }}>
      {message}
    </div>
  );
}

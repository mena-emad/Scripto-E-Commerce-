export default function Modal({ open, onClose, title, children, actions }) {
  if (!open) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(15, 23, 42, 0.48)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '1rem'
    }} onClick={onClose}>
      <div
        style={{
          width: '100%',
          maxWidth: 540,
          background: '#fff',
          borderRadius: '18px',
          padding: '1.5rem',
          boxShadow: '0 18px 45px rgba(15, 23, 42, 0.18)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h3 style={{ margin: 0, fontSize: '1.2rem' }}>{title}</h3>
          <button onClick={onClose} style={{ border: 'none', background: 'transparent', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
        </div>
        <div>{children}</div>
        {actions && <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.25rem' }}>{actions}</div>}
      </div>
    </div>
  );
}

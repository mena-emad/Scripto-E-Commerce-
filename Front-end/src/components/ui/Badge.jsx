export default function Badge({ children, tone = 'primary' }) {
  const tones = {
    primary: { background: '#dbeafe', color: '#1d4ed8' },
    success: { background: '#dcfce7', color: '#166534' },
    warning: { background: '#fef3c7', color: '#92400e' },
    danger: { background: '#fee2e2', color: '#991b1b' },
    neutral: { background: '#f1f5f9', color: '#334155' }
  };

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '999px',
        padding: '0.35rem 0.7rem',
        fontSize: '0.72rem',
        fontWeight: 700,
        ...tones[tone]
      }}
    >
      {children}
    </span>
  );
}

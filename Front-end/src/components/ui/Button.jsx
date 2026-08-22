export default function Button({ children, variant = 'primary', fullWidth = false, onClick, type = 'button', disabled = false, sx = {}, ...props }) {
  const variants = {
    primary: {
      background: '#1d4ed8',
      color: '#fff',
      border: '1px solid #1d4ed8'
    },
    secondary: {
      background: '#fff',
      color: '#0f172a',
      border: '1px solid #cbd5e1'
    },
    danger: {
      background: '#dc2626',
      color: '#fff',
      border: '1px solid #dc2626'
    },
    success: {
      background: '#16a34a',
      color: '#fff',
      border: '1px solid #16a34a'
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        width: fullWidth ? '100%' : 'auto',
        padding: '0.8rem 1.2rem',
        borderRadius: '12px',
        fontWeight: 700,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.7 : 1,
        transition: 'all 0.2s ease',
        ...variants[variant],
        ...sx
      }}
      {...props}
    >
      {children}
    </button>
  );
}

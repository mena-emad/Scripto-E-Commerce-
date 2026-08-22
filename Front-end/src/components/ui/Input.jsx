export default function Input({ label, type = 'text', value, onChange, placeholder, error, name, required, ...props }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
      {label && (
        <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#334155' }} htmlFor={name}>
          {label} {required && <span style={{ color: '#dc2626' }}>*</span>}
        </label>
      )}
      <input
        id={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        style={{
          width: '100%',
          padding: '0.8rem 0.9rem',
          borderRadius: '10px',
          border: error ? '1px solid #dc2626' : '1px solid #cbd5e1',
          background: '#fff',
          outline: 'none',
          fontSize: '0.96rem'
        }}
        {...props}
      />
      {error && (
        <span style={{ color: '#dc2626', fontSize: '0.75rem', fontWeight: 600 }}>{error}</span>
      )}
    </div>
  );
}

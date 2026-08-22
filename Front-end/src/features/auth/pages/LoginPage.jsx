import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const styles = {
  wrapper: {
    minHeight: '78vh',
    display: 'grid',
    placeItems: 'center'
  },
  card: {
    width: '100%',
    maxWidth: '520px',
    background: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: '22px',
    boxShadow: '0 15px 35px rgba(15, 23, 42, 0.08)',
    padding: '2rem'
  },
  header: { fontSize: '2rem', margin: '0 0 0.5rem', textAlign: 'center' },
  subtitle: { textAlign: 'center', marginBottom: '1.5rem', color: '#64748b' },
  form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
  row: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem', gap: '0.75rem' },
  label: { display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#334155' },
  smallLink: { color: '#1d4ed8', fontWeight: 700 }
};

export default function LoginPage({ onLogin, users }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: 'customer@example.com', password: 'Pass123!' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const nextErrors = {};
    if (!form.email.trim()) nextErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(form.email)) nextErrors.email = 'Enter a valid email';
    if (!form.password) nextErrors.password = 'Password is required';
    return nextErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    setTimeout(() => {
      const matched = users.find((user) => user.email.toLowerCase() === form.email.toLowerCase() && user.password === form.password);
      if (!matched) {
        setErrors({ form: 'Invalid email or password.' });
        setLoading(false);
        return;
      }

      if (matched.isBlocked) {
        setErrors({ form: 'This account is blocked.' });
        setLoading(false);
        return;
      }

      onLogin(matched);
      if (matched.role === 'admin') navigate('/admin/dashboard');
      else if (matched.role === 'vendor') navigate('/vendor/dashboard');
      else navigate('/');
      setLoading(false);
    }, 700);
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h1 style={styles.header}>Welcome back</h1>
        <p style={styles.subtitle}>Login to continue shopping on Scripto</p>

        <form style={styles.form} onSubmit={handleSubmit}>
          <Input
            label="Email"
            name="email"
            type="email"
            value={form.email}
            placeholder="you@example.com"
            error={errors.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <Input
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={form.password}
            placeholder="Enter your password"
            error={errors.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />

          <div style={styles.row}>
            <label style={styles.label}>
              <input type="checkbox" checked={showPassword} onChange={() => setShowPassword((prev) => !prev)} />
              Show password
            </label>
            <Link to="/register" style={styles.smallLink}>Forgot password?</Link>
          </div>

          {errors.form && <div style={{ color: '#dc2626', fontWeight: 700 }}>{errors.form}</div>}

          <Button type="submit" fullWidth disabled={loading}>
            {loading ? 'Signing in...' : 'Login'}
          </Button>
        </form>

        <div style={{ marginTop: '1.25rem', textAlign: 'center', color: '#475569' }}>
          New to Scripto? <Link to="/register" style={styles.smallLink}>Create account</Link>
        </div>
      </div>
    </div>
  );
}

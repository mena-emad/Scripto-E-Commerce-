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
    maxWidth: '620px',
    background: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: '22px',
    boxShadow: '0 15px 35px rgba(15, 23, 42, 0.08)',
    padding: '2rem'
  },
  header: { fontSize: '2rem', margin: '0 0 0.5rem', textAlign: 'center' },
  subtitle: { textAlign: 'center', marginBottom: '1.5rem', color: '#64748b' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: '1rem' },
  full: { gridColumn: '1 / -1' },
  row: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem', color: '#334155', gap: '0.5rem', margin: '0.25rem 0 1rem' },
  strength: { fontWeight: 700, color: '#1d4ed8' },
  smallLink: { color: '#1d4ed8', fontWeight: 700 }
};

function passwordStrength(password) {
  if (!password) return 'None';
  if (password.length >= 8 && /[A-Z]/.test(password) && /[a-z]/.test(password) && /\d/.test(password) && /[^A-Za-z0-9]/.test(password)) return 'Strong';
  if (password.length >= 6) return 'Medium';
  return 'Weak';
}

export default function RegisterPage({ users, onRegister }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: 'Sara Ahmed',
    email: 'sara@example.com',
    password: 'Pass123!',
    confirmPassword: 'Pass123!',
    role: 'user',
    storeAdress: '',
    storePhone: '',
    storeDescription: '',
    acceptTerms: false
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = 'Name is required';
    if (!form.email.trim()) nextErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(form.email)) nextErrors.email = 'Enter a valid email';
    if (!form.password) nextErrors.password = 'Password is required';
    if (form.password && passwordStrength(form.password) === 'Weak') nextErrors.password = 'Use at least 8 chars with uppercase, lowercase, number, and symbol';
    if (!form.confirmPassword) nextErrors.confirmPassword = 'Confirm password is required';
    if (form.confirmPassword && form.confirmPassword !== form.password) nextErrors.confirmPassword = 'Passwords do not match';
    if (form.role === 'vendor') {
      if (!form.storeAdress.trim()) nextErrors.storeAdress = 'Store address is required';
      if (!form.storePhone.trim()) nextErrors.storePhone = 'Store phone is required';
      if (!form.storeDescription.trim()) nextErrors.storeDescription = 'Store description is required';
    }
    if (!form.acceptTerms) nextErrors.acceptTerms = 'Please accept the terms and conditions';
    return nextErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    setTimeout(() => {
      const existingUser = users.find((user) => user.email.toLowerCase() === form.email.toLowerCase());
      if (existingUser) {
        setErrors({ email: 'This email is already registered.' });
        setLoading(false);
        return;
      }

      const newUser = {
        id: `u${Date.now()}`,
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
        isBlocked: false,
        isVerified: false,
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80'
      };
      users.push(newUser);
      onRegister(newUser);
      navigate(form.role === 'vendor' ? '/vendor/dashboard' : '/');
      setLoading(false);
    }, 800);
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h1 style={styles.header}>Create account</h1>
        <p style={styles.subtitle}>Register as a customer or a vendor</p>

        <form onSubmit={handleSubmit}>
          <div style={styles.grid}>
            <div style={styles.full}>
              <Input label="Full name" name="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} error={errors.name} required />
            </div>

            <div style={styles.full}>
              <Input label="Email" name="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} error={errors.email} required />
            </div>

            <div>
              <Input label="Password" name="password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} error={errors.password} required />
            </div>

            <div>
              <Input label="Confirm password" name="confirmPassword" type={showPassword ? 'text' : 'password'} value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} error={errors.confirmPassword} required />
            </div>

            <div style={styles.full}>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.4rem' }}>Role</label>
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                style={{ width: '100%', padding: '0.8rem 0.9rem', borderRadius: '10px', border: '1px solid #cbd5e1', background: '#fff' }}
              >
                <option value="user">Customer</option>
                <option value="vendor">Vendor</option>
              </select>
            </div>

            {form.role === 'vendor' && (
              <>
                <div style={styles.full}>
                  <Input label="Store address" name="storeAdress" value={form.storeAdress} onChange={(e) => setForm({ ...form, storeAdress: e.target.value })} error={errors.storeAdress} required />
                </div>
                <div>
                  <Input label="Store phone" name="storePhone" value={form.storePhone} onChange={(e) => setForm({ ...form, storePhone: e.target.value })} error={errors.storePhone} required />
                </div>
                <div>
                  <Input label="Store description" name="storeDescription" value={form.storeDescription} onChange={(e) => setForm({ ...form, storeDescription: e.target.value })} error={errors.storeDescription} required />
                </div>
              </>
            )}

            <div style={{ ...styles.full, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={styles.strength}>Password strength: {passwordStrength(form.password)}</div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="checkbox" checked={showPassword} onChange={() => setShowPassword((prev) => !prev)} />
                Show
              </label>
            </div>

            <div style={styles.full}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input type="checkbox" checked={form.acceptTerms} onChange={(e) => setForm({ ...form, acceptTerms: e.target.checked })} />
                I agree to the terms and conditions
              </label>
              {errors.acceptTerms && <div style={{ color: '#dc2626', marginTop: '0.35rem', fontWeight: 600 }}>{errors.acceptTerms}</div>}
            </div>
          </div>

          <div style={{ marginTop: '1.25rem' }}>
            <Button type="submit" fullWidth disabled={loading}>{loading ? 'Creating account...' : 'Create account'}</Button>
          </div>
        </form>

        <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
          Already have an account? <Link to="/login" style={styles.smallLink}>Login</Link>
        </div>
      </div>
    </div>
  );
}

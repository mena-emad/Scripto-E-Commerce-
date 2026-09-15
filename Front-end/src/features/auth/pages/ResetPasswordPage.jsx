import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/auth/useAuth';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { resetPassword } = useAuth();
  const [form, setForm] = useState({ email: location.state?.email || '', otp: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    try {
      setLoading(true);
      setError('');
      await resetPassword(form.email, form.otp, form.password, form.confirmPassword);
      navigate('/login');
    } catch (requestError) {
      setError(requestError?.response?.data?.message || 'Unable to reset your password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={cardStyle}>
      <h1>Reset password</h1>
      <p style={mutedStyle}>Enter the six-digit code sent to your email.</p>
      <form onSubmit={submit} style={formStyle}>
        {['email', 'otp', 'password', 'confirmPassword'].map((field) => <input key={field} required type={field.includes('password') ? 'password' : field === 'email' ? 'email' : 'text'} maxLength={field === 'otp' ? 6 : undefined} value={form[field]} onChange={(event) => setForm({ ...form, [field]: event.target.value })} placeholder={field} style={inputStyle} />)}
        {error && <p style={errorStyle}>{error}</p>}
        <button type="submit" disabled={loading}>{loading ? 'Resetting...' : 'Reset password'}</button>
      </form>
      <Link to="/login">Back to login</Link>
    </div>
  );
}

const cardStyle = { width: '100%', maxWidth: '520px', margin: '4rem auto', padding: '2rem', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '22px' };
const formStyle = { display: 'grid', gap: '1rem' };
const inputStyle = { width: '100%', padding: '0.8rem 0.9rem', borderRadius: '12px', border: '1px solid #cbd5e1' };
const mutedStyle = { color: '#64748b' };
const errorStyle = { color: '#dc2626' };

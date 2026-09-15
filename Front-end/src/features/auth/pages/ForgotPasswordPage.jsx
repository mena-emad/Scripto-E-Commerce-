import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/auth/useAuth';

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      setError('');
      await forgotPassword(email);
      navigate('/reset-password', { state: { email } });
    } catch (requestError) {
      setError(requestError?.response?.data?.message || 'Unable to send a reset code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={cardStyle}>
      <h1>Forgot password</h1>
      <p style={mutedStyle}>Enter your email to receive a password reset code.</p>
      <form onSubmit={submit} style={formStyle}>
        <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" style={inputStyle} />
        {error && <p style={errorStyle}>{error}</p>}
        <button type="submit" disabled={loading}>{loading ? 'Sending...' : 'Send reset code'}</button>
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

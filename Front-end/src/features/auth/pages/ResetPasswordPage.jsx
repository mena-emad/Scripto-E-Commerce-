
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/auth/useAuth';

const initialForm = {
  email: '',
  otp: '',
  password: '',
  confirmPassword: '',
};

const fields = [
  {
    name: 'email',
    type: 'email',
    placeholder: 'Email address',
    autoComplete: 'email',
  },
  {
    name: 'otp',
    type: 'text',
    placeholder: 'Verification code',
    autoComplete: 'one-time-code',
    inputMode: 'numeric',
    maxLength: 6,
  },
  {
    name: 'password',
    type: 'password',
    placeholder: 'New password',
    autoComplete: 'new-password',
  },
  {
    name: 'confirmPassword',
    type: 'password',
    placeholder: 'Confirm new password',
    autoComplete: 'new-password',
  },
];

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { resetPassword } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    ...initialForm,
    email: location.state?.email || '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      await resetPassword(
        form.email,
        form.otp,
        form.password,
        form.confirmPassword
      );

      navigate('/login');
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          'Unable to reset your password.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={cardStyle}>
      <h1>Reset password</h1>

      <p style={mutedStyle}>
        Enter the six-digit code sent to your email.
      </p>

      <form onSubmit={handleSubmit} style={formStyle}>
        {fields.map((field) => {
          const isPassword = field.name.includes('Password') ||
            field.name === 'password';

          return (
            <div key={field.name} style={fieldStyle}>
              <label
                htmlFor={field.name}
                style={labelStyle}
              >
                {field.placeholder}
              </label>

              <input
                {...field}
                id={field.name}
                type={
                  isPassword && showPassword
                    ? 'text'
                    : field.type
                }
                value={form[field.name]}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>
          );
        })}

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          style={toggleButtonStyle}
        >
          {showPassword ? 'Hide passwords' : 'Show passwords'}
        </button>

        {error && (
          <p role="alert" style={errorStyle}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={submitButtonStyle}
        >
          {loading ? 'Resetting...' : 'Reset password'}
        </button>
      </form>

      <Link to="/login" style={linkStyle}>
        Back to login
      </Link>
    </div>
  );
}

const cardStyle = {
  width: '100%',
  maxWidth: '520px',
  margin: '4rem auto',
  padding: '2rem',
  background: '#fff',
  border: '1px solid #e2e8f0',
  borderRadius: '22px',
};

const formStyle = {
  display: 'grid',
  gap: '1rem',
};

const fieldStyle = {
  display: 'grid',
  gap: '0.5rem',
};

const labelStyle = {
  fontSize: '0.9rem',
  fontWeight: '500',
  color: '#334155',
};

const inputStyle = {
  width: '100%',
  padding: '0.8rem 0.9rem',
  borderRadius: '12px',
  border: '1px solid #cbd5e1',
  fontSize: '1rem',
};

const mutedStyle = {
  color: '#64748b',
};

const errorStyle = {
  color: '#dc2626',
  fontSize: '0.9rem',
};

const toggleButtonStyle = {
  justifySelf: 'start',
  padding: 0,
  border: 'none',
  background: 'transparent',
  color: '#2563eb',
  cursor: 'pointer',
};

const submitButtonStyle = {
  padding: '0.9rem',
  border: 'none',
  borderRadius: '12px',
  background: '#2563eb',
  color: '#fff',
  fontSize: '1rem',
  fontWeight: '600',
  cursor: 'pointer',
};

const linkStyle = {
  display: 'block',
  marginTop: '1.5rem',
  textAlign: 'center',
  color: '#2563eb',
  textDecoration: 'none',
};
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/auth/useAuth';

const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 60;

const styles = {
  wrapper: {
    minHeight: '78vh',
    width: '100%',
    display: 'grid',
    placeItems: 'center',
    padding: '2rem 1rem',
    boxSizing: 'border-box',
    minWidth: 0,
  },

  container: {
    width: '100%',
    maxWidth: '520px',
    minWidth: 0,
    boxSizing: 'border-box',
  },

  card: {
    width: '100%',
    maxWidth: '520px',
    background: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: '22px',
    boxShadow: '0 15px 35px rgba(15, 23, 42, 0.08)',
    padding: '2rem',
    boxSizing: 'border-box',
    minWidth: 0,
  },

  logo: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.7rem',
    marginBottom: '1.5rem',
    color: '#0f172a',
    fontWeight: 800,
    fontSize: '1.35rem',
  },

  logoMark: {
    width: '38px',
    height: '38px',
    display: 'grid',
    placeItems: 'center',
    borderRadius: '12px',
    background: '#0f172a',
    color: '#fff',
    fontSize: '1.1rem',
    flexShrink: 0,
  },

  icon: {
    width: '62px',
    height: '62px',
    display: 'grid',
    placeItems: 'center',
    margin: '0 auto 1.25rem',
    borderRadius: '18px',
    background: '#eff6ff',
    color: '#1d4ed8',
  },

  heading: {
    margin: 0,
    textAlign: 'center',
    fontSize: '2rem',
    color: '#0f172a',
    overflowWrap: 'anywhere',
  },

  subtitle: {
    margin: '0.6rem auto 0',
    maxWidth: '360px',
    textAlign: 'center',
    color: '#64748b',
    lineHeight: 1.6,
  },

  email: {
    display: 'block',
    margin: '0.75rem auto 0',
    maxWidth: '100%',
    width: 'fit-content',
    padding: '0.45rem 0.7rem',
    borderRadius: '8px',
    background: '#f8fafc',
    color: '#334155',
    fontWeight: 700,
    overflowWrap: 'anywhere',
    wordBreak: 'break-word',
    textAlign: 'center',
    boxSizing: 'border-box',
  },

  message: {
    display: 'flex',
    gap: '0.65rem',
    alignItems: 'flex-start',
    marginTop: '1.25rem',
    padding: '0.8rem 0.9rem',
    borderRadius: '10px',
    fontSize: '0.9rem',
    lineHeight: 1.45,
    overflowWrap: 'anywhere',
    wordBreak: 'break-word',
    minWidth: 0,
    boxSizing: 'border-box',
  },

  otpLabel: {
    margin: '1.7rem 0 0.65rem',
    textAlign: 'center',
    color: '#475569',
    fontSize: '0.85rem',
    fontWeight: 700,
  },

  otpRow: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.55rem',
    width: '100%',
    minWidth: 0,
    boxSizing: 'border-box',
  },

  otpInput: {
    width: '48px',
    height: '56px',
    padding: 0,
    border: '1px solid #cbd5e1',
    borderRadius: '10px',
    background: '#f8fafc',
    color: '#0f172a',
    textAlign: 'center',
    fontSize: '1.35rem',
    fontWeight: 800,
    outline: 'none',
    boxSizing: 'border-box',
    flexShrink: 1,
  },

  primaryButton: {
    width: '100%',
    minHeight: '48px',
    marginTop: '1.5rem',
    border: 0,
    borderRadius: '12px',
    background: '#1d4ed8',
    color: '#fff',
    fontWeight: 700,
    cursor: 'pointer',
    boxSizing: 'border-box',
  },

  secondaryButton: {
    border: 0,
    background: 'transparent',
    color: '#1d4ed8',
    fontWeight: 700,
    cursor: 'pointer',
    padding: 0,
  },

  backLink: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.45rem',
    marginTop: '1.5rem',
    paddingTop: '1.5rem',
    borderTop: '1px solid #f1f5f9',
    color: '#475569',
    fontWeight: 700,
    fontSize: '0.9rem',
  },

  footer: {
    marginTop: '1.25rem',
    textAlign: 'center',
    color: '#94a3b8',
    fontSize: '0.75rem',
  },
};

export default function VerifyEmailPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { verify, resend } = useAuth();

  const email = location.state?.email || 'your email';

  const [code, setCode] = useState(
    Array(OTP_LENGTH).fill('')
  );

  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [resendTimer, setResendTimer] =
    useState(RESEND_COOLDOWN);

  const inputRefs = useRef([]);

  useEffect(() => {
    if (resendTimer <= 0) return undefined;

    const timer = setInterval(() => {
      setResendTimer((previous) => previous - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [resendTimer]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleVerify = async (
    verificationCode = code.join('')
  ) => {
    if (verificationCode.length !== OTP_LENGTH) {
      setError(
        'Please enter the complete verification code.'
      );
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      setSuccess('');

      await verify(email, verificationCode);

      navigate('/login');
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          'Invalid or expired verification code.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const nextCode = [...code];

    nextCode[index] = value.slice(-1);

    setCode(nextCode);

    setError('');
    setSuccess('');

    if (
      value &&
      index < OTP_LENGTH - 1
    ) {
      inputRefs.current[index + 1]?.focus();
    }

    if (
      value &&
      index === OTP_LENGTH - 1 &&
      nextCode.every(Boolean)
    ) {
      handleVerify(nextCode.join(''));
    }
  };

  const handleKeyDown = (event, index) => {
    if (
      event.key === 'Backspace' &&
      code[index]
    ) {
      const nextCode = [...code];

      nextCode[index] = '';

      setCode(nextCode);

      return;
    }

    if (
      event.key === 'Backspace' &&
      !code[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }

    if (
      event.key === 'ArrowLeft' &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }

    if (
      event.key === 'ArrowRight' &&
      index < OTP_LENGTH - 1
    ) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();

    const pastedCode = event.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, OTP_LENGTH);

    if (!pastedCode) return;

    const nextCode = Array.from(
      { length: OTP_LENGTH },
      (_, index) => pastedCode[index] || ''
    );

    setCode(nextCode);

    setError('');
    setSuccess('');

    inputRefs.current[
      Math.min(
        pastedCode.length,
        OTP_LENGTH - 1
      )
    ]?.focus();

    if (pastedCode.length === OTP_LENGTH) {
      handleVerify(pastedCode);
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0 || isResending) return;

    try {
      setIsResending(true);

      setError('');
      setSuccess('');

      await resend(email);

      setCode(Array(OTP_LENGTH).fill(''));

      setResendTimer(RESEND_COOLDOWN);

      setSuccess(
        'A new verification code has been sent to your email.'
      );

      inputRefs.current[0]?.focus();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          'Unable to resend the verification code.'
      );
    } finally {
      setIsResending(false);
    }
  };

  const isComplete = code.every(Boolean);

  return (
    <>
      <main style={styles.wrapper}>
        <div style={styles.container}>

          {/* Logo */}
          <Link
            to="/"
            style={styles.logo}
            className="verify-logo"
          >
            <span style={styles.logoMark}>
              S
            </span>

            <span>Scripto</span>
          </Link>

          {/* Card */}
          <section
            style={styles.card}
            className="verify-card"
          >

            {/* Icon */}
            <div
              style={styles.icon}
              aria-hidden="true"
              className="verify-icon"
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <rect
                  x="3"
                  y="5"
                  width="18"
                  height="14"
                  rx="2"
                />

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m3 7 9 6 9-6"
                />
              </svg>
            </div>

            {/* Heading */}
            <h1
              style={styles.heading}
              className="verify-heading"
            >
              Verify your email
            </h1>

            <p
              style={styles.subtitle}
              className="verify-subtitle"
            >
              Enter the 6-digit code we sent to
              your email address.
            </p>

            {/* Email */}
            <span
              style={styles.email}
              className="verify-email"
            >
              {email}
            </span>

            {/* Error */}
            {error && (
              <div
                style={{
                  ...styles.message,
                  color: '#b91c1c',
                  background: '#fef2f2',
                  border: '1px solid #fecaca',
                }}
                role="alert"
              >
                {error}
              </div>
            )}

            {/* Success */}
            {success && (
              <div
                style={{
                  ...styles.message,
                  color: '#15803d',
                  background: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                }}
                role="status"
              >
                {success}
              </div>
            )}

            {/* OTP */}
            <p style={styles.otpLabel}>
              Verification code
            </p>

            <div
              style={styles.otpRow}
              className="otp-row"
              onPaste={handlePaste}
            >
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(element) => {
                    inputRefs.current[index] =
                      element;
                  }}
                  type="text"
                  inputMode="numeric"
                  autoComplete={
                    index === 0
                      ? 'one-time-code'
                      : 'off'
                  }
                  maxLength={1}
                  value={digit}
                  disabled={
                    isLoading ||
                    isResending
                  }
                  aria-label={`Verification digit ${
                    index + 1
                  }`}
                  onChange={(event) =>
                    handleChange(
                      event.target.value,
                      index
                    )
                  }
                  onKeyDown={(event) =>
                    handleKeyDown(
                      event,
                      index
                    )
                  }
                  style={{
                    ...styles.otpInput,
                    borderColor: digit
                      ? '#1d4ed8'
                      : '#cbd5e1',
                    background: digit
                      ? '#eff6ff'
                      : '#f8fafc',
                  }}
                  className="otp-input"
                />
              ))}
            </div>

            {/* Verify */}
            <button
              type="button"
              disabled={
                !isComplete ||
                isLoading
              }
              onClick={() =>
                handleVerify()
              }
              style={{
                ...styles.primaryButton,
                opacity:
                  !isComplete ||
                  isLoading
                    ? 0.55
                    : 1,
              }}
            >
              {isLoading
                ? 'Verifying...'
                : 'Verify email'}
            </button>

            {/* Resend */}
            <div
              className="resend-section"
              style={{
                marginTop: '1.35rem',
                textAlign: 'center',
                color: '#64748b',
                fontSize: '0.9rem',
              }}
            >
              <span>
                Did not receive the code?{' '}
              </span>

              <button
                type="button"
                onClick={handleResend}
                disabled={
                  resendTimer > 0 ||
                  isResending
                }
                style={{
                  ...styles.secondaryButton,
                  color:
                    resendTimer > 0 ||
                    isResending
                      ? '#94a3b8'
                      : '#1d4ed8',
                }}
              >
                {isResending
                  ? 'Sending...'
                  : resendTimer > 0
                    ? `Resend in ${resendTimer}s`
                    : 'Resend code'}
              </button>
            </div>

            {/* Back */}
            <Link
              to="/login"
              style={styles.backLink}
              className="back-link"
            >
              <span aria-hidden="true">
                &#8592;
              </span>

              Back to login
            </Link>
          </section>

          {/* Footer */}
          <p style={styles.footer}>
            © {new Date().getFullYear()} Scripto.
            All rights reserved.
          </p>
        </div>
      </main>

      <style>{`
        .verify-card {
          min-width: 0;
          overflow: hidden;
        }

        .verify-heading,
        .verify-subtitle,
        .verify-email {
          max-width: 100%;
        }

        .otp-row {
          min-width: 0;
        }

        .otp-input {
          flex-shrink: 1;
        }

        .resend-section {
          min-width: 0;
          overflow-wrap: anywhere;
        }

        .back-link {
          min-width: 0;
        }

        @media (max-width: 600px) {
          .verify-card {
            padding: 1.35rem !important;
            border-radius: 18px !important;
          }

          .verify-heading {
            font-size: 1.7rem !important;
          }

          .verify-subtitle {
            font-size: 0.9rem !important;
          }

          .otp-row {
            gap: 0.45rem !important;
          }

          .otp-input {
            width: 44px !important;
            height: 52px !important;
            font-size: 1.2rem !important;
            border-radius: 9px !important;
          }
        }

        @media (max-width: 480px) {
          .verify-card {
            padding: 1rem !important;
            border-radius: 16px !important;
          }

          .verify-logo {
            margin-bottom: 1.15rem !important;
            font-size: 1.2rem !important;
          }

          .verify-logo span:first-child {
            width: 34px !important;
            height: 34px !important;
            border-radius: 10px !important;
          }

          .verify-icon {
            width: 54px !important;
            height: 54px !important;
            border-radius: 15px !important;
            margin-bottom: 1rem !important;
          }

          .verify-heading {
            font-size: 1.5rem !important;
          }

          .verify-subtitle {
            font-size: 0.85rem !important;
            line-height: 1.5 !important;
          }

          .verify-email {
            font-size: 0.85rem !important;
            padding: 0.4rem 0.55rem !important;
          }

          .otpLabel {
            margin-top: 1.4rem !important;
          }

          .otp-row {
            gap: 0.35rem !important;
          }

          .otp-input {
            width: 40px !important;
            height: 48px !important;
            font-size: 1.1rem !important;
            border-radius: 8px !important;
          }

          .resend-section {
            font-size: 0.82rem !important;
          }

          .back-link {
            margin-top: 1.25rem !important;
            padding-top: 1.25rem !important;
          }
        }

        @media (max-width: 380px) {
          .verify-card {
            padding: 0.85rem !important;
          }

          .otp-row {
            gap: 0.25rem !important;
          }

          .otp-input {
            width: 36px !important;
            height: 44px !important;
            font-size: 1rem !important;
            border-radius: 7px !important;
          }

          .verify-heading {
            font-size: 1.35rem !important;
          }

          .verify-subtitle {
            font-size: 0.8rem !important;
          }
        }

        @media (max-width: 330px) {
          .verify-card {
            padding: 0.7rem !important;
          }

          .otp-row {
            gap: 0.2rem !important;
          }

          .otp-input {
            width: 33px !important;
            height: 42px !important;
            font-size: 0.95rem !important;
          }
        }
      `}</style>
    </>
  );
}
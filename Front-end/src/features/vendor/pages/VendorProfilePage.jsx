import { useState } from 'react';
import useAuth from '../../../hooks/auth/useAuth';
import useTheme from '../../../hooks/useTheme';

const darkPalette = {
  background: '#0f172a',
  card: '#1e293b',
  surface: '#111827',
  border: '#334155',
  borderLight: '#475569',
  text: '#f8fafc',
  textSecondary: '#cbd5e1',
  textMuted: '#94a3b8',

  primary: '#3b82f6',
  primaryHover: '#2563eb',
  primarySoft: '#172554',

  success: '#22c55e',
  successBg: '#052e16',
  successBorder: '#166534',

  danger: '#ef4444',
  dangerBg: '#450a0a',
  dangerBorder: '#7f1d1d',

  warning: '#f59e0b',
  warningBg: '#451a03',
  warningBorder: '#854d0e',
};

const lightPalette = {
  background: '#f8fafc',
  card: '#ffffff',
  surface: '#f1f5f9',
  border: '#e2e8f0',
  borderLight: '#cbd5e1',
  text: '#0f172a',
  textSecondary: '#475569',
  textMuted: '#64748b',

  primary: '#2563eb',
  primaryHover: '#1d4ed8',
  primarySoft: '#eff6ff',

  success: '#16a34a',
  successBg: '#f0fdf4',
  successBorder: '#bbf7d0',

  danger: '#dc2626',
  dangerBg: '#fef2f2',
  dangerBorder: '#fecaca',

  warning: '#d97706',
  warningBg: '#fffbeb',
  warningBorder: '#fde68a',
};

export default function VendorProfilePage({
  vendor,
  onUpdate,
  accessError,
}) {
  const { updatePassword } = useAuth();
  const { theme } = useTheme();

  const colors = theme === 'light' ? lightPalette : darkPalette;

  const [form, setForm] = useState({
    storeName: vendor?.storeName || '',
    storeAdress: vendor?.storeAdress || '',
    storePhone: vendor?.storePhone || '',
    storeDescription: vendor?.storeDescription || '',
    storeLogo: null,
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  if (accessError) {
    return (
      <div
        style={{
          background: colors.card,
          border: `1px solid ${colors.border}`,
          borderRadius: '20px',
          padding: '2rem',
          color: colors.text,
          boxShadow:
            theme === 'light'
              ? '0 8px 30px rgba(15, 23, 42, 0.06)'
              : '0 8px 30px rgba(0, 0, 0, 0.2)',
        }}
      >
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            display: 'grid',
            placeItems: 'center',
            background: colors.warningBg,
            color: colors.warning,
            fontSize: '1.3rem',
            marginBottom: '1rem',
          }}
        >
          !
        </div>

        <h2
          style={{
            margin: 0,
            color: colors.text,
            fontSize: '1.4rem',
          }}
        >
          Vendor account pending
        </h2>

        <p
          style={{
            margin: '0.6rem 0 0',
            color: colors.textSecondary,
            lineHeight: 1.7,
          }}
        >
          {accessError}
        </p>
      </div>
    );
  }

  if (!vendor) {
    return (
      <div
        style={{
          background: colors.card,
          border: `1px solid ${colors.border}`,
          borderRadius: '20px',
          padding: '2rem',
          color: colors.text,
        }}
      >
        Vendor profile is unavailable.
      </div>
    );
  }

  const submit = async (event) => {
    event.preventDefault();

    const payload = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (value) {
        payload.append(key, value);
      }
    });

    try {
      setLoading(true);
      setError('');
      await onUpdate(payload);
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          'Unable to update vendor profile.'
      );
    } finally {
      setLoading(false);
    }
  };

  const updateVendorPassword = async (event) => {
    event.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError('New passwords do not match.');
      return;
    }

    try {
      setLoading(true);
      setError('');

      await updatePassword(
        passwordForm.currentPassword,
        passwordForm.newPassword,
        passwordForm.confirmPassword
      );

      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });

      setMessage('Password updated successfully.');
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          'Unable to update password.'
      );
    } finally {
      setLoading(false);
    }
  };

  const logo =
    vendor.storeLogo?.url ||
    vendor.storeLogo ||
    null;

  const inputStyle = {
    width: '100%',
    boxSizing: 'border-box',
    padding: '0.85rem 1rem',
    borderRadius: '12px',
    border: `1px solid ${colors.border}`,
    background: colors.surface,
    color: colors.text,
    outline: 'none',
    fontSize: '0.95rem',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.45rem',
    color: colors.textSecondary,
    fontSize: '0.85rem',
    fontWeight: 600,
  };

  const sectionStyle = {
    background: colors.card,
    border: `1px solid ${colors.border}`,
    borderRadius: '20px',
    padding: '1.4rem',
    boxShadow:
      theme === 'light'
        ? '0 8px 30px rgba(15, 23, 42, 0.05)'
        : '0 8px 30px rgba(0, 0, 0, 0.16)',
  };

  const buttonStyle = {
    border: 'none',
    borderRadius: '12px',
    padding: '0.85rem 1.2rem',
    background: colors.primary,
    color: '#fff',
    fontWeight: 700,
    cursor: loading ? 'not-allowed' : 'pointer',
    opacity: loading ? 0.7 : 1,
    transition: 'background 0.2s, transform 0.2s',
  };

  return (
    <div
      style={{
        display: 'grid',
        gap: '1.25rem',
        color: colors.text,
      }}
    >
      {/* Page Header */}
      <div>
        <h1
          style={{
            margin: 0,
            fontSize: '1.8rem',
            fontWeight: 800,
            color: colors.text,
          }}
        >
          Vendor Profile
        </h1>

        <p
          style={{
            margin: '0.4rem 0 0',
            color: colors.textMuted,
            fontSize: '0.95rem',
          }}
        >
          Manage your store information and account security.
        </p>
      </div>

      {/* Store Overview */}
      <section style={sectionStyle}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1.3rem',
          }}
        >
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              display: 'grid',
              placeItems: 'center',
              background: colors.primarySoft,
              color: colors.primary,
              fontWeight: 800,
              fontSize: '1.1rem',
            }}
          >
            S
          </div>

          <div>
            <h2
              style={{
                margin: 0,
                fontSize: '1.1rem',
                color: colors.text,
              }}
            >
              Store Overview
            </h2>

            <p
              style={{
                margin: '0.25rem 0 0',
                color: colors.textMuted,
                fontSize: '0.85rem',
              }}
            >
              Your current store information
            </p>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(240px, 0.8fr) minmax(0, 1.2fr)',
            gap: '1.5rem',
            alignItems: 'stretch',
          }}
          className="responsive-two-column"
        >
          {/* Logo */}
          <div
            style={{
              minHeight: '260px',
              borderRadius: '16px',
              overflow: 'hidden',
              background: colors.surface,
              border: `1px solid ${colors.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {logo ? (
              <img
                src={logo}
                alt={vendor.storeName}
                style={{
                  width: '100%',
                  height: '100%',
                  minHeight: '260px',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            ) : (
              <div
                style={{
                  textAlign: 'center',
                  color: colors.textMuted,
                }}
              >
                <div
                  style={{
                    fontSize: '2.5rem',
                    fontWeight: 800,
                    marginBottom: '0.4rem',
                  }}
                >
                  {vendor.storeName?.charAt(0)?.toUpperCase() || 'S'}
                </div>

                <div>No store logo</div>
              </div>
            )}
          </div>

          {/* Store Info */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '1.1rem',
            }}
          >
            <div>
              <div
                style={{
                  color: colors.textMuted,
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '0.35rem',
                }}
              >
                Store Name
              </div>

              <h3
                style={{
                  margin: 0,
                  fontSize: '1.45rem',
                  color: colors.text,
                }}
              >
                {vendor.storeName}
              </h3>
            </div>

            <p
              style={{
                margin: 0,
                color: colors.textSecondary,
                lineHeight: 1.7,
              }}
            >
              {vendor.storeDescription || 'No store description available.'}
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                gap: '0.8rem',
              }}
            >
              <div
                style={{
                  padding: '0.9rem',
                  borderRadius: '12px',
                  background: colors.surface,
                  border: `1px solid ${colors.border}`,
                }}
              >
                <div
                  style={{
                    color: colors.textMuted,
                    fontSize: '0.75rem',
                    marginBottom: '0.3rem',
                  }}
                >
                  Location
                </div>

                <strong style={{ color: colors.text }}>
                  {vendor.storeAdress || 'Not provided'}
                </strong>
              </div>

              <div
                style={{
                  padding: '0.9rem',
                  borderRadius: '12px',
                  background: colors.surface,
                  border: `1px solid ${colors.border}`,
                }}
              >
                <div
                  style={{
                    color: colors.textMuted,
                    fontSize: '0.75rem',
                    marginBottom: '0.3rem',
                  }}
                >
                  Phone
                </div>

                <strong style={{ color: colors.text }}>
                  {vendor.storePhone || 'Not provided'}
                </strong>
              </div>
            </div>

            {vendor.rating !== undefined && (
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  width: 'fit-content',
                  padding: '0.55rem 0.8rem',
                  borderRadius: '10px',
                  background: colors.warningBg,
                  border: `1px solid ${colors.warningBorder}`,
                  color: colors.warning,
                  fontWeight: 700,
                }}
              >
                ★ {vendor.rating} / 5
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Edit Store */}
      <section style={sectionStyle}>
        <div style={{ marginBottom: '1.2rem' }}>
          <h2
            style={{
              margin: 0,
              fontSize: '1.1rem',
              color: colors.text,
            }}
          >
            Store Information
          </h2>

          <p
            style={{
              margin: '0.3rem 0 0',
              color: colors.textMuted,
              fontSize: '0.85rem',
            }}
          >
            Update your store details and logo.
          </p>
        </div>

        <form
          onSubmit={submit}
          style={{
            display: 'grid',
            gap: '1rem',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1rem',
            }}
            className="responsive-two-column"
          >
            <div>
              <label style={labelStyle}>Store Name</label>

              <input
                required
                value={form.storeName}
                style={inputStyle}
                placeholder="Enter store name"
                onChange={(event) =>
                  setForm({
                    ...form,
                    storeName: event.target.value,
                  })
                }
              />
            </div>

            <div>
              <label style={labelStyle}>Phone</label>

              <input
                required
                value={form.storePhone}
                style={inputStyle}
                placeholder="Enter phone number"
                onChange={(event) =>
                  setForm({
                    ...form,
                    storePhone: event.target.value,
                  })
                }
              />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Address</label>

            <input
              required
              value={form.storeAdress}
              style={inputStyle}
              placeholder="Enter store address"
              onChange={(event) =>
                setForm({
                  ...form,
                  storeAdress: event.target.value,
                })
              }
            />
          </div>

          <div>
            <label style={labelStyle}>Description</label>

            <textarea
              required
              value={form.storeDescription}
              placeholder="Describe your store..."
              rows={5}
              style={{
                ...inputStyle,
                resize: 'vertical',
                lineHeight: 1.6,
              }}
              onChange={(event) =>
                setForm({
                  ...form,
                  storeDescription: event.target.value,
                })
              }
            />
          </div>

          <div>
            <label style={labelStyle}>Store Logo</label>

            <div
              style={{
                padding: '1rem',
                borderRadius: '12px',
                border: `1px dashed ${colors.borderLight}`,
                background: colors.surface,
              }}
            >
              <input
                type="file"
                accept="image/*"
                style={{
                  width: '100%',
                  color: colors.textSecondary,
                }}
                onChange={(event) =>
                  setForm({
                    ...form,
                    storeLogo:
                      event.target.files?.[0] || null,
                  })
                }
              />

              <div
                style={{
                  marginTop: '0.45rem',
                  color: colors.textMuted,
                  fontSize: '0.78rem',
                }}
              >
                Upload a new image to replace the current logo.
              </div>
            </div>
          </div>

          {error && (
            <div
              style={{
                padding: '0.85rem 1rem',
                borderRadius: '12px',
                background: colors.dangerBg,
                border: `1px solid ${colors.dangerBorder}`,
                color: colors.danger,
                fontSize: '0.9rem',
              }}
            >
              {error}
            </div>
          )}

          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <button
              type="submit"
              disabled={loading}
              style={buttonStyle}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </section>

      {/* Security */}
      <section style={sectionStyle}>
        <div style={{ marginBottom: '1.2rem' }}>
          <h2
            style={{
              margin: 0,
              fontSize: '1.1rem',
              color: colors.text,
            }}
          >
            Account Security
          </h2>

          <p
            style={{
              margin: '0.3rem 0 0',
              color: colors.textMuted,
              fontSize: '0.85rem',
            }}
          >
            Change your vendor account password.
          </p>
        </div>

        <form
          onSubmit={updateVendorPassword}
          style={{
            display: 'grid',
            gap: '1rem',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
              gap: '1rem',
            }}
            className="responsive-password-grid"
          >
            <div>
              <label style={labelStyle}>Current Password</label>

              <input
                required
                type="password"
                style={inputStyle}
                placeholder="Current password"
                value={passwordForm.currentPassword}
                onChange={(event) =>
                  setPasswordForm({
                    ...passwordForm,
                    currentPassword: event.target.value,
                  })
                }
              />
            </div>

            <div>
              <label style={labelStyle}>New Password</label>

              <input
                required
                type="password"
                style={inputStyle}
                placeholder="New password"
                value={passwordForm.newPassword}
                onChange={(event) =>
                  setPasswordForm({
                    ...passwordForm,
                    newPassword: event.target.value,
                  })
                }
              />
            </div>

            <div>
              <label style={labelStyle}>Confirm Password</label>

              <input
                required
                type="password"
                style={inputStyle}
                placeholder="Confirm password"
                value={passwordForm.confirmPassword}
                onChange={(event) =>
                  setPasswordForm({
                    ...passwordForm,
                    confirmPassword: event.target.value,
                  })
                }
              />
            </div>
          </div>

          {message && (
            <div
              style={{
                padding: '0.85rem 1rem',
                borderRadius: '12px',
                background: colors.successBg,
                border: `1px solid ${colors.successBorder}`,
                color: colors.success,
                fontSize: '0.9rem',
              }}
            >
              {message}
            </div>
          )}

          {error && (
            <div
              style={{
                padding: '0.85rem 1rem',
                borderRadius: '12px',
                background: colors.dangerBg,
                border: `1px solid ${colors.dangerBorder}`,
                color: colors.danger,
                fontSize: '0.9rem',
              }}
            >
              {error}
            </div>
          )}

          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <button
              type="submit"
              disabled={loading}
              style={buttonStyle}
            >
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </div>
        </form>
      </section>

      <style>
        {`
          .responsive-two-column {
            min-width: 0;
          }

          .responsive-password-grid {
            min-width: 0;
          }

          @media (max-width: 850px) {
            .responsive-two-column {
              grid-template-columns: 1fr !important;
            }

            .responsive-password-grid {
              grid-template-columns: 1fr !important;
            }
          }

          input:focus,
          textarea:focus {
            border-color: ${colors.primary} !important;
            box-shadow: 0 0 0 3px ${colors.primary}22;
          }

          button:not(:disabled):hover {
            background: ${colors.primaryHover} !important;
          }
        `}
      </style>
    </div>
  );
}
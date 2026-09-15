import useAuth from '../../../hooks/auth/useAuth';
import { useEffect, useState } from 'react';

const profileStyles = {
  page: {
    width: '100%',
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '1.5rem',
    color: '#f8fafc',
  },

  card: {
    backgroundColor: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '20px',
    padding: '1.25rem',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.12)',
  },

  profileHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1.25rem',
  },

  avatar: {
    width: '76px',
    height: '76px',
    flexShrink: 0,
    display: 'grid',
    placeItems: 'center',
    borderRadius: '50%',
    backgroundColor: '#172554',
    color: '#60a5fa',
    fontSize: '1.5rem',
    fontWeight: 800,
    objectFit: 'cover',
    border: '2px solid #334155',
  },

  title: {
    margin: 0,
    fontSize: '1.4rem',
    fontWeight: 800,
    color: '#f8fafc',
  },

  subtitle: {
    margin: '0.25rem 0 0',
    color: '#94a3b8',
  },

  sectionTitle: {
    margin: 0,
    color: '#f8fafc',
    fontSize: '1.2rem',
    fontWeight: 800,
  },

  sectionSubtitle: {
    margin: '0.3rem 0 0',
    color: '#94a3b8',
    fontSize: '0.9rem',
  },

  label: {
    display: 'block',
    marginBottom: '0.4rem',
    color: '#cbd5e1',
    fontSize: '0.85rem',
    fontWeight: 700,
  },

  input: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '0.8rem 0.9rem',
    borderRadius: '12px',
    border: '1px solid #334155',
    backgroundColor: '#111827',
    color: '#f8fafc',
    outline: 'none',
    fontSize: '0.9rem',
  },

  readonlyInput: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '0.8rem 0.9rem',
    borderRadius: '12px',
    border: '1px solid #334155',
    backgroundColor: '#111827',
    color: '#cbd5e1',
    outline: 'none',
    fontSize: '0.9rem',
  },

  form: {
    display: 'grid',
    gap: '0.8rem',
  },

  divider: {
    height: '1px',
    backgroundColor: '#334155',
    margin: '1.25rem 0',
  },

  button: {
    width: '100%',
    padding: '0.8rem 1rem',
    border: 'none',
    borderRadius: '11px',
    backgroundColor: '#2563eb',
    color: '#fff',
    fontSize: '0.9rem',
    fontWeight: 700,
    cursor: 'pointer',
  },

  dangerButton: {
    width: '100%',
    padding: '0.8rem 1rem',
    border: '1px solid #7f1d1d',
    borderRadius: '11px',
    backgroundColor: '#450a0a',
    color: '#fca5a5',
    fontSize: '0.9rem',
    fontWeight: 700,
    cursor: 'pointer',
  },

  fileInput: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '0.7rem',
    borderRadius: '12px',
    border: '1px dashed #475569',
    backgroundColor: '#111827',
    color: '#cbd5e1',
    cursor: 'pointer',
  },

  messageBox: {
    padding: '0.8rem 1rem',
    marginBottom: '1rem',
    borderRadius: '12px',
    backgroundColor: '#052e16',
    border: '1px solid #166534',
    color: '#86efac',
    fontSize: '0.9rem',
  },

  errorBox: {
    padding: '0.8rem 1rem',
    marginBottom: '1rem',
    borderRadius: '12px',
    backgroundColor: '#450a0a',
    border: '1px solid #7f1d1d',
    color: '#fca5a5',
    fontSize: '0.9rem',
  },

  infoGrid: {
    display: 'grid',
    gap: '0.75rem',
  },

  infoItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
    padding: '0.9rem 1rem',
    borderRadius: '12px',
    backgroundColor: '#111827',
    border: '1px solid #334155',
  },

  infoLabel: {
    color: '#94a3b8',
    fontSize: '0.85rem',
  },

  infoValue: {
    color: '#f8fafc',
    fontWeight: 700,
    textAlign: 'right',
  },

  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.35rem 0.7rem',
    borderRadius: '999px',
    fontSize: '0.75rem',
    fontWeight: 700,
  },

  statusActive: {
    backgroundColor: '#052e16',
    color: '#86efac',
    border: '1px solid #166534',
  },

  statusBlocked: {
    backgroundColor: '#450a0a',
    color: '#fca5a5',
    border: '1px solid #7f1d1d',
  },

  statusVerified: {
    backgroundColor: '#052e16',
    color: '#86efac',
    border: '1px solid #166534',
  },

  statusPending: {
    backgroundColor: '#451a03',
    color: '#fcd34d',
    border: '1px solid #854d0e',
  },

  loadingCard: {
    minHeight: '250px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '0.5rem',
    backgroundColor: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '20px',
    color: '#94a3b8',
  },
};

export default function ProfilePage() {
  const {
    getMe,
    updatePassword,
    updateProfile,
    deleteMyAccount,
    user: currentUser,
  } = useAuth();

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [profileForm, setProfileForm] = useState({
    name: '',
    profileImage: null,
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      await getMe();
    })();
  }, []);

  if (!currentUser) {
    return (
      <div style={profileStyles.loadingCard}>
        <h2 style={{ margin: 0, color: '#f8fafc' }}>
          Please log in
        </h2>

        <p style={{ margin: 0 }}>
          Please log in to view your profile.
        </p>
      </div>
    );
  }

  const initials =
    currentUser.name
      ?.split(' ')
      .filter(Boolean)
      .map((part) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || '?';

  const handlePasswordUpdate = async (event) => {
    event.preventDefault();

    if (
      passwordForm.newPassword !== passwordForm.confirmPassword
    ) {
      setError('New passwords do not match.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setMessage('');

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

  const handleProfileUpdate = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError('');
      setMessage('');

      const formData = new FormData();

      formData.append('name', profileForm.name.trim());

      if (profileForm.profileImage) {
        formData.append(
          'profileImage',
          profileForm.profileImage
        );
      }

      await updateProfile(formData);

      setMessage('Profile updated successfully.');

      setProfileForm({
        name: '',
        profileImage: null,
      });

      event.target.reset();
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          'Unable to update profile.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Delete your account permanently?')) {
      return;
    }

    try {
      setLoading(true);
      setError('');

      await deleteMyAccount();
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          'Unable to delete account.'
      );

      setLoading(false);
    }
  };

  return (
    <div style={profileStyles.page}>
      {/* Page Header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h1
          style={{
            margin: 0,
            fontSize: '2rem',
            fontWeight: 800,
            color: '#f8fafc',
          }}
        >
          My Profile
        </h1>

        <p
          style={{
            margin: '0.4rem 0 0',
            color: '#94a3b8',
          }}
        >
          Manage your profile information, security, and account.
        </p>
      </div>

      {/* Messages */}
      {message && (
        <div style={profileStyles.messageBox}>
          ✓ {message}
        </div>
      )}

      {error && (
        <div style={profileStyles.errorBox}>
          ! {error}
        </div>
      )}

      {/* Main Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns:
            'minmax(0, 1.25fr) minmax(320px, 0.75fr)',
          gap: '1.25rem',
          alignItems: 'start',
        }}
      >
        {/* Left Column */}
        <div
          style={{
            display: 'grid',
            gap: '1.25rem',
          }}
        >
          {/* Profile */}
          <section style={profileStyles.card}>
            <div style={profileStyles.profileHeader}>
              {currentUser.image?.url ? (
                <img
                  src={currentUser.image.url}
                  alt={`${currentUser.name}'s profile`}
                  style={profileStyles.avatar}
                />
              ) : (
                <div
                  style={profileStyles.avatar}
                  aria-label={`${currentUser.name}'s initials`}
                >
                  {initials}
                </div>
              )}

              <div>
                <h2 style={profileStyles.title}>
                  {currentUser.name}
                </h2>

                <p style={profileStyles.subtitle}>
                  {currentUser.email}
                </p>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gap: '0.9rem',
              }}
            >
              <label>
                <span style={profileStyles.label}>
                  Full name
                </span>

                <input
                  value={currentUser.name}
                  style={profileStyles.readonlyInput}
                  readOnly
                />
              </label>

              <label>
                <span style={profileStyles.label}>
                  Email
                </span>

                <input
                  value={currentUser.email}
                  style={profileStyles.readonlyInput}
                  readOnly
                />
              </label>

              <label>
                <span style={profileStyles.label}>
                  Role
                </span>

                <input
                  value={currentUser.role}
                  style={profileStyles.readonlyInput}
                  readOnly
                />
              </label>
            </div>

            <div style={profileStyles.divider} />

            <div style={{ marginBottom: '1rem' }}>
              <h3 style={profileStyles.sectionTitle}>
                Update Profile
              </h3>

              <p style={profileStyles.sectionSubtitle}>
                Change your name or profile picture.
              </p>
            </div>

            <form
              onSubmit={handleProfileUpdate}
              style={profileStyles.form}
            >
              <label>
                <span style={profileStyles.label}>
                  Change name
                </span>

                <input
                  required
                  value={profileForm.name}
                  placeholder={currentUser.name}
                  onChange={(event) =>
                    setProfileForm({
                      ...profileForm,
                      name: event.target.value,
                    })
                  }
                  style={profileStyles.input}
                />
              </label>

              <label>
                <span style={profileStyles.label}>
                  Change profile photo
                </span>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) =>
                    setProfileForm({
                      ...profileForm,
                      profileImage:
                        event.target.files?.[0] || null,
                    })
                  }
                  style={profileStyles.fileInput}
                />
              </label>

              <button
                type="submit"
                disabled={loading}
                style={{
                  ...profileStyles.button,
                  opacity: loading ? 0.6 : 1,
                  cursor: loading
                    ? 'not-allowed'
                    : 'pointer',
                }}
              >
                {loading ? 'Saving...' : 'Save Profile'}
              </button>
            </form>
          </section>

          {/* Security */}
          <section style={profileStyles.card}>
            <div style={{ marginBottom: '1rem' }}>
              <h2 style={profileStyles.sectionTitle}>
                Security
              </h2>

              <p style={profileStyles.sectionSubtitle}>
                Update your password and secure your account.
              </p>
            </div>

            <form
              onSubmit={handlePasswordUpdate}
              style={profileStyles.form}
            >
              <label>
                <span style={profileStyles.label}>
                  Current password
                </span>

                <input
                  required
                  type="password"
                  placeholder="Enter current password"
                  value={passwordForm.currentPassword}
                  onChange={(event) =>
                    setPasswordForm({
                      ...passwordForm,
                      currentPassword:
                        event.target.value,
                    })
                  }
                  style={profileStyles.input}
                />
              </label>

              <label>
                <span style={profileStyles.label}>
                  New password
                </span>

                <input
                  required
                  type="password"
                  placeholder="Enter new password"
                  value={passwordForm.newPassword}
                  onChange={(event) =>
                    setPasswordForm({
                      ...passwordForm,
                      newPassword:
                        event.target.value,
                    })
                  }
                  style={profileStyles.input}
                />
              </label>

              <label>
                <span style={profileStyles.label}>
                  Confirm new password
                </span>

                <input
                  required
                  type="password"
                  placeholder="Confirm new password"
                  value={passwordForm.confirmPassword}
                  onChange={(event) =>
                    setPasswordForm({
                      ...passwordForm,
                      confirmPassword:
                        event.target.value,
                    })
                  }
                  style={profileStyles.input}
                />
              </label>

              <button
                type="submit"
                disabled={loading}
                style={{
                  ...profileStyles.button,
                  opacity: loading ? 0.6 : 1,
                  cursor: loading
                    ? 'not-allowed'
                    : 'pointer',
                }}
              >
                {loading
                  ? 'Updating...'
                  : 'Update Password'}
              </button>
            </form>

            <div style={profileStyles.divider} />

            <div>
              <h3
                style={{
                  margin: 0,
                  color: '#f8fafc',
                  fontSize: '1rem',
                }}
              >
                Danger Zone
              </h3>

              <p
                style={{
                  margin: '0.3rem 0 0.8rem',
                  color: '#94a3b8',
                  fontSize: '0.85rem',
                }}
              >
                Permanently delete your account and its data.
              </p>

              <button
                type="button"
                disabled={loading}
                onClick={handleDeleteAccount}
                style={{
                  ...profileStyles.dangerButton,
                  opacity: loading ? 0.6 : 1,
                  cursor: loading
                    ? 'not-allowed'
                    : 'pointer',
                }}
              >
                Delete Account
              </button>
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div
          style={{
            display: 'grid',
            gap: '1.25rem',
          }}
        >
          {/* Account Status */}
          <section style={profileStyles.card}>
            <div style={{ marginBottom: '1rem' }}>
              <h2 style={profileStyles.sectionTitle}>
                Account Status
              </h2>

              <p style={profileStyles.sectionSubtitle}>
                Current account information.
              </p>
            </div>

            <div style={profileStyles.infoGrid}>
              <div style={profileStyles.infoItem}>
                <span style={profileStyles.infoLabel}>
                  Verification
                </span>

                <span
                  style={{
                    ...profileStyles.statusBadge,
                    ...(currentUser.isVerified
                      ? profileStyles.statusVerified
                      : profileStyles.statusPending),
                  }}
                >
                  {currentUser.isVerified
                    ? 'Verified'
                    : 'Pending'}
                </span>
              </div>

              <div style={profileStyles.infoItem}>
                <span style={profileStyles.infoLabel}>
                  Account
                </span>

                <span
                  style={{
                    ...profileStyles.statusBadge,
                    ...(currentUser.isBlocked
                      ? profileStyles.statusBlocked
                      : profileStyles.statusActive),
                  }}
                >
                  {currentUser.isBlocked
                    ? 'Blocked'
                    : 'Active'}
                </span>
              </div>

              {currentUser.phone && (
                <div style={profileStyles.infoItem}>
                  <span style={profileStyles.infoLabel}>
                    Phone
                  </span>

                  <span style={profileStyles.infoValue}>
                    {currentUser.phone || 'Not set'}
                  </span>
                </div>
              )}

              {currentUser.address && (
                <div style={profileStyles.infoItem}>
                  <span style={profileStyles.infoLabel}>
                    Address
                  </span>

                  <span style={profileStyles.infoValue}>
                    {currentUser.address || 'Not set'}
                  </span>
                </div>
              )}
            </div>
          </section>

          {/* Account Summary */}
          <section style={profileStyles.card}>
            <div style={{ marginBottom: '1rem' }}>
              <h2 style={profileStyles.sectionTitle}>
                Account Summary
              </h2>

              <p style={profileStyles.sectionSubtitle}>
                Your basic account information.
              </p>
            </div>

            <div style={profileStyles.infoGrid}>
              <div style={profileStyles.infoItem}>
                <span style={profileStyles.infoLabel}>
                  Name
                </span>

                <span style={profileStyles.infoValue}>
                  {currentUser.name}
                </span>
              </div>

              <div style={profileStyles.infoItem}>
                <span style={profileStyles.infoLabel}>
                  Email
                </span>

                <span
                  style={{
                    ...profileStyles.infoValue,
                    maxWidth: '60%',
                    overflowWrap: 'anywhere',
                  }}
                >
                  {currentUser.email}
                </span>
              </div>

              <div style={profileStyles.infoItem}>
                <span style={profileStyles.infoLabel}>
                  Role
                </span>

                <span style={profileStyles.infoValue}>
                  {currentUser.role}
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}


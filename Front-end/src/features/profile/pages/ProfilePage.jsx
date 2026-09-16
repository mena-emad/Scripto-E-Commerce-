import useAuth from '../../../hooks/auth/useAuth';
import { useEffect, useState } from 'react';
import './ProfilePage.css';

function ProfilePage() {
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
    getMe();
  }, []);

  useEffect(() => {
    if (currentUser) {
      setProfileForm({
        name: currentUser.name || '',
        profileImage: null,
      });
    }
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div className="profile-page">
        <div className="profile-loading-card">
          <p>Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  const initials = currentUser.name
    ? currentUser.name
        .split(' ')
        .map((word) => word[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'U';

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileChange = (e) => {
    const { name, value, files } = e.target;

    setProfileForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    setMessage('');
    setError('');

    if (
      !passwordForm.currentPassword ||
      !passwordForm.newPassword ||
      !passwordForm.confirmPassword
    ) {
      setError('Please fill in all password fields.');
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError('New password and confirmation password do not match.');
      return;
    }

    try {
      setLoading(true);

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
    } catch (err) {
      setError(
        err?.response?.data?.error?.message ||
          err?.response?.data?.message ||
          err?.message ||
          'Failed to update password.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    setMessage('');
    setError('');

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append('name', profileForm.name.trim());

      if (profileForm.profileImage) {
        formData.append('profileImage', profileForm.profileImage);
      }

      await updateProfile(formData);

      setProfileForm({
        name: currentUser.name || '',
        profileImage: null,
      });

      e.target.reset();

      setMessage('Profile updated successfully.');

      await getMe();
    } catch (err) {
      setError(
        err?.response?.data?.error?.message ||
          err?.response?.data?.message ||
          err?.message ||
          'Failed to update profile.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    );

    if (!confirmed) return;

    setMessage('');
    setError('');

    try {
      setLoading(true);

      await deleteMyAccount();
    } catch (err) {
      setError(
        err?.response?.data?.error?.message ||
          err?.response?.data?.message ||
          err?.message ||
          'Failed to delete account.'
      );
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = () => {
    if (currentUser.isBlocked) {
      return 'status-badge status-blocked';
    }

    if (currentUser.isVerified) {
      return 'status-badge status-verified';
    }

    return 'status-badge status-pending';
  };

  const getAccountStatus = () => {
    if (currentUser.isBlocked) return 'Blocked';
    return 'Active';
  };

  const getVerificationStatus = () => {
    return currentUser.isVerified ? 'Verified' : 'Not Verified';
  };

  return (
    <div className="profile-page">
      {/* Header */}
      <div className="profile-header">
        <div
          className="profile-avatar"
          aria-label="Profile avatar"
        >
          {currentUser.image?.url ? (
            <img
              src={currentUser.image.url}
              alt={currentUser.name || 'Profile'}
              className="profile-avatar-image"
            />
          ) : (
            initials
          )}
        </div>

        <div className="profile-header-info">
          <h1 className="profile-title">My Profile</h1>

          <p className="profile-subtitle">
            Manage your account information, security, and preferences.
          </p>
        </div>
      </div>

      {/* Messages */}
      {message && (
        <div className="message-box">
          {message}
        </div>
      )}

      {error && (
        <div className="error-box">
          {error}
        </div>
      )}

      {/* Main Grid */}
      <div className="profile-main-grid">
        {/* LEFT COLUMN */}
        <div className="profile-column">
          {/* Profile Information */}
          <section className="profile-card">
            <div className="section-header">
              <h2 className="section-title">Profile Information</h2>

              <p className="section-subtitle">
                Update your personal information and profile picture.
              </p>
            </div>

            <form
              className="profile-form"
              onSubmit={handleProfileUpdate}
            >
              {/* Name */}
              <div className="form-group">
                <label
                  htmlFor="name"
                  className="form-label"
                >
                  Full Name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={profileForm.name}
                  onChange={handleProfileChange}
                  className="profile-input"
                  placeholder="Enter your name"
                  disabled={loading}
                />
              </div>

              {/* Email */}
              <div className="form-group">
                <label
                  htmlFor="email"
                  className="form-label"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  value={currentUser.email || ''}
                  className="profile-readonly-input"
                  disabled
                  readOnly
                />
              </div>

              {/* Profile Image */}
              <div className="form-group">
                <label
                  htmlFor="profileImage"
                  className="form-label"
                >
                  Profile Image
                </label>

                <input
                  id="profileImage"
                  name="profileImage"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleProfileChange}
                  className="profile-file-input"
                  disabled={loading}
                />
              </div>

              <div className="divider" />

              <button
                type="submit"
                className="profile-button"
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Profile'}
              </button>
            </form>
          </section>

          {/* Security */}
          <section className="profile-card">
            <div className="section-header">
              <h2 className="section-title">Security</h2>

              <p className="section-subtitle">
                Update your password to keep your account secure.
              </p>
            </div>

            <form
              className="profile-form"
              onSubmit={handlePasswordUpdate}
            >
              {/* Current Password */}
              <div className="form-group">
                <label
                  htmlFor="currentPassword"
                  className="form-label"
                >
                  Current Password
                </label>

                <input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                  className="profile-input"
                  placeholder="Enter current password"
                  disabled={loading}
                />
              </div>

              {/* New Password */}
              <div className="form-group">
                <label
                  htmlFor="newPassword"
                  className="form-label"
                >
                  New Password
                </label>

                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  className="profile-input"
                  placeholder="Enter new password"
                  disabled={loading}
                />
              </div>

              {/* Confirm Password */}
              <div className="form-group">
                <label
                  htmlFor="confirmPassword"
                  className="form-label"
                >
                  Confirm New Password
                </label>

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  className="profile-input"
                  placeholder="Confirm new password"
                  disabled={loading}
                />
              </div>

              <div className="divider" />

              <button
                type="submit"
                className="profile-button"
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Password'}
              </button>
            </form>
          </section>

          {/* Danger Zone */}
          <section className="profile-card danger-card">
            <div className="section-header">
              <h2 className="section-title danger-title">
                Danger Zone
              </h2>

              <p className="section-subtitle">
                Permanently delete your account and all associated data.
              </p>
            </div>

            <button
              type="button"
              className="danger-button"
              onClick={handleDeleteAccount}
              disabled={loading}
            >
              Delete My Account
            </button>
          </section>
        </div>

        {/* RIGHT COLUMN */}
        <div className="profile-column">
          {/* Account Status */}
          <section className="profile-card">
            <div className="section-header">
              <h2 className="section-title">Account Status</h2>

              <p className="section-subtitle">
                Current status of your account.
              </p>
            </div>

            <div className="profile-info-grid">
              {/* Verification */}
              <div className="profile-info-item">
                <span className="profile-info-label">
                  Verification
                </span>

                <span
                  className={
                    currentUser.isVerified
                      ? 'status-badge status-verified'
                      : 'status-badge status-pending'
                  }
                >
                  {getVerificationStatus()}
                </span>
              </div>

              {/* Account */}
              <div className="profile-info-item">
                <span className="profile-info-label">
                  Account
                </span>

                <span className={getStatusClass()}>
                  {getAccountStatus()}
                </span>
              </div>

              {/* Phone */}
              {currentUser.phone && (
                <div className="profile-info-item">
                  <span className="profile-info-label">
                    Phone
                  </span>

                  <span className="profile-info-value">
                    {currentUser.phone}
                  </span>
                </div>
              )}

              {/* Address */}
              {currentUser.address && (
                <div className="profile-info-item">
                  <span className="profile-info-label">
                    Address
                  </span>

                  <span className="profile-info-value">
                    {currentUser.address}
                  </span>
                </div>
              )}
            </div>
          </section>

          {/* Account Summary */}
          <section className="profile-card">
            <div className="section-header">
              <h2 className="section-title">Account Summary</h2>

              <p className="section-subtitle">
                Overview of your account information.
              </p>
            </div>

            <div className="profile-info-grid">
              {/* Name */}
              <div className="profile-info-item">
                <span className="profile-info-label">
                  Name
                </span>

                <span className="profile-info-value">
                  {currentUser.name || '—'}
                </span>
              </div>

              {/* Email */}
              <div className="profile-info-item">
                <span className="profile-info-label">
                  Email
                </span>

                <span className="profile-info-value">
                  {currentUser.email || '—'}
                </span>
              </div>

              {/* Role */}
              <div className="profile-info-item">
                <span className="profile-info-label">
                  Role
                </span>

                <span className="profile-info-value">
                  {currentUser.role || 'User'}
                </span>
              </div>

              {/* ID */}
              {currentUser._id && (
                <div className="profile-info-item">
                  <span className="profile-info-label">
                    Account ID
                  </span>

                  <span className="profile-info-value">
                    {currentUser._id}
                  </span>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
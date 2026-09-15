import useAuth from "../../../hooks/auth/useAuth"
import { useEffect, useState } from "react";
const profileStyles = {
  card: { background: '#fff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '1.25rem' },
  profileHeader: { display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' },
  avatar: { width: '76px', height: '76px', flexShrink: 0, display: 'grid', placeItems: 'center', borderRadius: '50%', background: '#dbeafe', color: '#1d4ed8', fontSize: '1.5rem', fontWeight: 800, objectFit: 'cover' },
  label: { display: 'block', marginBottom: '0.35rem', fontWeight: 600 },
  input: { width: '100%', padding: '0.8rem 0.9rem', borderRadius: '12px', border: '1px solid #cbd5e1', background: '#fff' }
};

export default function ProfilePage() {
  const {getMe,updatePassword,updateProfile,deleteMyAccount,user:currentUser} = useAuth()
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [profileForm, setProfileForm] = useState({ name: '', profileImage: null });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  // const [currentUser,setCurrentUser] = useState();
  useEffect(()=>{
      (async()=>{
        await getMe()
      })();
  },[])
  if (!currentUser) {
    return <div style={profileStyles.card}>Please log in to view your profile.</div>;
  }

  const initials = currentUser.name
    ?.split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || '?';

  const handlePasswordUpdate = async (event) => {
    event.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError('New passwords do not match.');
      return;
    }
    try {
      setLoading(true);
      setError('');
      await updatePassword(passwordForm.currentPassword, passwordForm.newPassword, passwordForm.confirmPassword);
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setMessage('Password updated successfully.');
    } catch (requestError) {
      setError(requestError?.response?.data?.message || 'Unable to update password.');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      setError('');
      const formData = new FormData();
      formData.append('name', profileForm.name.trim());
      if (profileForm.profileImage) formData.append('profileImage', profileForm.profileImage);
      await updateProfile(formData);
      setMessage('Profile updated successfully.');
      setProfileForm({ name: '', profileImage: null });
      event.target.reset();
    } catch (requestError) {
      setError(requestError?.response?.data?.message || 'Unable to update profile.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Delete your account permanently?')) return;
    try {
      setLoading(true);
      await deleteMyAccount();
    } catch (requestError) {
      setError(requestError?.response?.data?.message || 'Unable to delete account.');
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }} className="responsive-two-column">
      <div style={profileStyles.card}>
        <div style={profileStyles.profileHeader}>
          {currentUser.image?.url ? (
            <img
              src={currentUser.image.url}
              alt={`${currentUser.name}'s profile`}
              style={profileStyles.avatar}
            />
          ) : (
            <div style={profileStyles.avatar} aria-label={`${currentUser.name}'s initials`}>
              {initials}
            </div>
          )}
          <div>
            <h2 style={{ margin: 0 }}>Profile</h2>
            <p style={{ margin: '0.25rem 0 0', color: '#64748b' }}>{currentUser.name}</p>
          </div>
        </div>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <label>
            <span style={profileStyles.label}>Full name</span>
            <input value={currentUser.name} style={profileStyles.input} readOnly />
          </label>
          <label>
            <span style={profileStyles.label}>Email</span>
            <input value={currentUser.email} style={profileStyles.input} readOnly />
          </label>
          <label>
            <span style={profileStyles.label}>Role</span>
            <input value={currentUser.role} style={profileStyles.input} readOnly />
          </label>
        </div>
        <form onSubmit={handleProfileUpdate} style={{ display: 'grid', gap: '0.7rem', marginTop: '1rem' }}>
          <label>
            <span style={profileStyles.label}>Change name</span>
            <input required value={profileForm.name} placeholder={currentUser.name} onChange={(event) => setProfileForm({ ...profileForm, name: event.target.value })} style={profileStyles.input} />
          </label>
          <label>
            <span style={profileStyles.label}>Change profile photo</span>
            <input type="file" accept="image/*" onChange={(event) => setProfileForm({ ...profileForm, profileImage: event.target.files?.[0] || null })} />
          </label>
          <button type="submit" disabled={loading}>Save profile</button>
        </form>
      </div>

      <div style={profileStyles.card}>
        <h2 style={{ marginTop: 0 }}>Security</h2>
        {message && <p style={{ color: '#15803d' }}>{message}</p>}
        {error && <p style={{ color: '#dc2626' }}>{error}</p>}
        <form onSubmit={handlePasswordUpdate} style={{ display: 'grid', gap: '0.7rem' }}>
          {['currentPassword', 'newPassword', 'confirmPassword'].map((field) => <input key={field} required type="password" placeholder={field} value={passwordForm[field]} onChange={(event) => setPasswordForm({ ...passwordForm, [field]: event.target.value })} style={profileStyles.input} />)}
          <button type="submit" disabled={loading}>Update password</button>
        </form>
        <button type="button" disabled={loading} onClick={handleDeleteAccount} style={{ marginTop: '1rem', color: '#dc2626' }}>Delete account</button>
      </div>

      <div style={profileStyles.card}>
        <h2 style={{ marginTop: 0 }}>Account status</h2>
        <div style={{ display: 'grid', gap: '0.8rem' }}>
          <div><strong>Verification:</strong> {currentUser.isVerified ? 'Verified' : 'Pending'}</div>
          <div><strong>Active:</strong> {currentUser.isBlocked ? "Blocked" : 'Active'}</div>
          {currentUser.phone&&<div><strong>Phone:</strong> {currentUser.phone || 'Not set'}</div>}
          {currentUser.address && <div><strong>Address:</strong> {currentUser.address || 'Not set'}</div>}
        </div>
      </div>
    </div>
  );
}

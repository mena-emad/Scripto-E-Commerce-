import { useState } from 'react';
import useAuth from '../../../hooks/auth/useAuth';

export default function VendorProfilePage({ vendor, onUpdate, accessError }) {
  const { updatePassword } = useAuth();
  const [form, setForm] = useState({ storeName: vendor?.storeName || '', storeAdress: vendor?.storeAdress || '', storePhone: vendor?.storePhone || '', storeDescription: vendor?.storeDescription || '', storeLogo: null });
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  if (accessError) return <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '1.25rem' }}><h2>Vendor account pending</h2><p>{accessError}</p></div>;
  if (!vendor) return <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '1.25rem' }}>Vendor profile is unavailable.</div>;

  const submit = async (event) => {
    event.preventDefault();
    const payload = new FormData();
    Object.entries(form).forEach(([key, value]) => { if (value) payload.append(key, value); });
    try {
      setLoading(true);
      setError('');
      await onUpdate(payload);
    } catch (requestError) {
      setError(requestError?.response?.data?.message || 'Unable to update vendor profile.');
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
      await updatePassword(passwordForm.currentPassword, passwordForm.newPassword, passwordForm.confirmPassword);
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setMessage('Password updated successfully.');
    } catch (requestError) {
      setError(requestError?.response?.data?.message || 'Unable to update password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '1.25rem' }}>
      <h2 style={{ marginTop: 0 }}>Vendor profile</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="responsive-two-column">
        <div>
          <img src={vendor.storeLogo?.url || vendor.storeLogo} alt={vendor.storeName} style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '14px' }} />
        </div>
        <div>
          <h3>{vendor.storeName}</h3>
          <p style={{ color: '#64748b' }}>{vendor.storeDescription}</p>
          <div><strong>Location:</strong> {vendor.storeAdress}</div>
          <div style={{ marginTop: '0.4rem' }}><strong>Phone:</strong> {vendor.storePhone}</div>
          <div style={{ marginTop: '0.4rem' }}><strong>Rating:</strong> {vendor.rating} / 5</div>
        </div>
      </div>
      <form onSubmit={submit} style={{ marginTop: '1rem', display: 'grid', gap: '0.7rem' }}>
        {['storeName', 'storeAdress', 'storePhone', 'storeDescription'].map((field) => <input key={field} required value={form[field]} placeholder={field} onChange={(event) => setForm({ ...form, [field]: event.target.value })} />)}
        <input type="file" accept="image/*" onChange={(event) => setForm({ ...form, storeLogo: event.target.files?.[0] || null })} />
        {error && <p style={{ color: '#dc2626' }}>{error}</p>}
        <button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save profile'}</button>
      </form>
      <form onSubmit={updateVendorPassword} style={{ marginTop: '1.25rem', display: 'grid', gap: '0.7rem' }}>
        <h3>Change password</h3>
        {message && <p style={{ color: '#15803d' }}>{message}</p>}
        {error && <p style={{ color: '#dc2626' }}>{error}</p>}
        {['currentPassword', 'newPassword', 'confirmPassword'].map((field) => <input key={field} required type="password" placeholder={field} value={passwordForm[field]} onChange={(event) => setPasswordForm({ ...passwordForm, [field]: event.target.value })} />)}
        <button type="submit" disabled={loading}>{loading ? 'Updating...' : 'Update password'}</button>
      </form>
    </div>
  );
}

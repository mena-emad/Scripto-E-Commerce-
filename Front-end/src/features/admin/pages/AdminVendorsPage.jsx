import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AdminVendorsPage({ vendors, onApprove, onToggleBlock }) {
  const [busyId, setBusyId] = useState('');
  const [error, setError] = useState('');

  const approve = async (id) => {
    try {
      setBusyId(id);
      setError('');
      await onApprove(id);
    } catch (requestError) {
      setError(requestError?.response?.data?.message || 'Unable to approve vendor.');
    } finally {
      setBusyId('');
    }
  };

  const toggleBlock = async (id) => {
    try {
      setBusyId(id);
      setError('');
      await onToggleBlock(id);
    } catch (requestError) {
      setError(requestError?.response?.data?.message || 'Unable to update vendor account.');
    } finally {
      setBusyId('');
    }
  };

  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '1rem' }}>
      <h2 style={{ marginTop: 0 }}>Vendors</h2>
      {error && <p style={{ color: '#dc2626' }}>{error}</p>}
      <div style={{ display: 'grid', gap: '0.8rem' }}>
        {vendors.map((vendor) => (
          <div key={vendor._id || vendor.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.6rem' }}>
            <div>
              <strong>{vendor.storeName}</strong>
              <div style={{ color: '#64748b' }}>{vendor.storeAdress}</div>
            </div>
            <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
              <Link to={`/admin/vendors/${vendor._id || vendor.id}`} style={{ color: '#1d4ed8', fontWeight: 700 }}>Details</Link>
              {vendor.isApproved ? <span>Approved</span> : <button type="button" disabled={busyId === vendor._id} onClick={() => approve(vendor._id)}>Approve</button>}
              {vendor.owner?._id && <button type="button" disabled={busyId === vendor.owner._id} onClick={() => toggleBlock(vendor.owner._id)}>{vendor.owner.isBlocked ? 'Unblock' : 'Block'}</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Badge from '../../../components/ui/Badge';

export default function AdminVendorDetailPage({ getVendorDetails, onApprove, onToggleBlock }) {
  const { id } = useParams();
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getVendorDetails(id)
      .then((response) => setVendor(response.vendorDetails))
      .catch((requestError) => setError(requestError?.response?.data?.message || 'Unable to load vendor details.'))
      .finally(() => setLoading(false));
  }, [id, getVendorDetails]);

  const approve = async () => {
    try {
      setBusy(true);
      setError('');
      await onApprove(id);
      setVendor((current) => ({ ...current, isApproved: true }));
    } catch (requestError) {
      setError(requestError?.response?.data?.message || 'Unable to approve vendor.');
    } finally {
      setBusy(false);
    }
  };

  const toggleBlock = async () => {
    try {
      setBusy(true);
      setError('');
      await onToggleBlock(vendor.owner._id);
      setVendor((current) => ({ ...current, owner: { ...current.owner, isBlocked: !current.owner.isBlocked } }));
    } catch (requestError) {
      setError(requestError?.response?.data?.message || 'Unable to update vendor account.');
    } finally {
      setBusy(false);
    }
  };

  if (loading) return <div style={cardStyle}>Loading vendor details...</div>;
  if (!vendor) return <div style={cardStyle}>{error || 'Vendor not found.'}</div>;

  const logo = vendor.storeLogo?.url || vendor.storeLogo;
  return <div style={cardStyle}>
    <Link to="/admin/vendors">Back to vendors</Link>
    <h1>{vendor.storeName}</h1>
    {error && <p style={{ color: '#dc2626' }}>{error}</p>}
    {logo && <img src={logo} alt={vendor.storeName} style={{ width: '100%', maxHeight: '360px', objectFit: 'cover', borderRadius: '14px' }} />}
    <p>{vendor.storeDescription}</p>
    <p><strong>Owner:</strong> {vendor.owner?.name || 'Unknown'} ({vendor.owner?.email || 'No email'})</p>
    <p><strong>Address:</strong> {vendor.storeAdress}</p>
    <p><strong>Phone:</strong> {vendor.storePhone}</p>
    <p><strong>Account:</strong> {vendor.owner?.isBlocked ? 'Blocked' : 'Active'}</p>
    <Badge tone={vendor.isApproved ? 'success' : 'warning'}>{vendor.isApproved ? 'Approved' : 'Pending'}</Badge>
    {!vendor.isApproved && <div style={{ marginTop: '1rem' }}><Button onClick={approve} disabled={busy}>{busy ? 'Approving...' : 'Approve vendor'}</Button></div>}
    {vendor.owner?._id && <div style={{ marginTop: '1rem' }}><Button onClick={toggleBlock} disabled={busy}>{busy ? 'Updating...' : vendor.owner.isBlocked ? 'Unblock vendor' : 'Block vendor'}</Button></div>}
  </div>;
}

const cardStyle = { background: '#fff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '1.25rem' };
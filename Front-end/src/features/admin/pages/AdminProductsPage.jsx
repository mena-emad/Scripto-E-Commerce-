import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AdminProductsPage({ products, vendors, onApprove }) {
  const [busyId, setBusyId] = useState('');
  const [error, setError] = useState('');

  const approve = async (id) => {
    try {
      setBusyId(id);
      setError('');
      await onApprove(id);
    } catch (requestError) {
      setError(requestError?.response?.data?.message || 'Unable to approve product.');
    } finally {
      setBusyId('');
    }
  };

  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '1rem' }}>
      <h2 style={{ marginTop: 0 }}>Products</h2>
      {error && <p style={{ color: '#dc2626' }}>{error}</p>}
      <div style={{ display: 'grid', gap: '0.8rem' }}>
        {products.map((product) => (
          <div key={product._id || product.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.6rem' }}>
            <div>
              <strong>{product.name}</strong>
              <div style={{ color: '#64748b' }}>{product.category} • {product.vendor?.storeName || vendors.find((vendor) => vendor._id === product.vendor || vendor.storeName === product.vendor)?.storeName || product.vendor || 'Unknown vendor'}</div>
            </div>
            <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
              <Link to={`/admin/products/${product._id || product.id}`} style={{ color: '#1d4ed8', fontWeight: 700 }}>Details</Link>
              {product.status === 'approved' ? <span>Approved</span> : product.status === 'rejected' || product.status === 'out of stock' ? <span>{product.status}</span> : <button type="button" disabled={busyId === product._id} onClick={() => approve(product._id)}>Approve</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

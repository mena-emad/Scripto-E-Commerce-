import { useState } from 'react';

export default function VendorOrdersPage({ orders, onUpdateOrderStatus, accessError }) {
  const [busyId, setBusyId] = useState('');
  const [error, setError] = useState('');

  const updateStatus = async (id, status) => {
    try {
      setBusyId(id);
      setError('');
      await onUpdateOrderStatus(id, status);
    } catch (requestError) {
      setError(requestError?.response?.data?.message || 'Unable to update order status.');
    } finally {
      setBusyId('');
    }
  };

  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '1rem' }}>
      <h2 style={{ marginTop: 0 }}>Vendor orders</h2>
      {accessError && <p style={{ color: '#b45309' }}>{accessError}</p>}
      {error && <p style={{ color: '#dc2626' }}>{error}</p>}
      <div style={{ display: 'grid', gap: '0.8rem' }}>
        {orders.map((order) => (
          <div key={order._id || order.id} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '0.9rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong>{order.parentOrderId}</strong>
              <select value={order.status} disabled={busyId === (order._id || order.id)} onChange={(event) => updateStatus(order._id || order.id, event.target.value)}>
                {['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((status) => <option key={status} value={status}>{status}</option>)}
              </select>
            </div>
            <div style={{ color: '#64748b', marginTop: '0.4rem' }}>
              {(order.products || []).map((item) => `${item.product?.name || item.productName || 'Product'} (${item.quantity})`).join(', ')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

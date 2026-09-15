import Badge from '../../../components/ui/Badge';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function AdminDashboardPage({ stats, recentUsers, recentProducts, onToggleBlock, onDeleteUser, onDeleteProduct }) {
  const [busyId, setBusyId] = useState('');
  const [error, setError] = useState('');

  const runAction = async (action, id, message) => {
    try {
      setBusyId(id);
      setError('');
      await action(id);
    } catch (requestError) {
      setError(requestError?.response?.data?.message || message);
    } finally {
      setBusyId('');
    }
  };

  const confirmAction = (message, action, id, errorMessage) => {
    if (window.confirm(message)) runAction(action, id, errorMessage);
  };

  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      {error && <div style={{ color: '#b91c1c', background: '#fef2f2', padding: '0.8rem', borderRadius: '10px' }}>{error}</div>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
        {stats.map((stat) => (
          <div key={stat.label} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '1rem' }}>
            <div style={{ color: '#64748b', marginBottom: '0.4rem' }}>{stat.label}</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>{stat.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="responsive-two-column">
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '1rem' }}>
          <h3 style={{ marginTop: 0 }}>Users</h3>
          <div style={{ display: 'grid', gap: '0.7rem' }}>
            {recentUsers.map((user) => (
              <div key={user._id || user.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>
                <div>
                  <strong>{user.name}</strong>
                  <div style={{ color: '#64748b', fontSize: '0.9rem' }}>{user.role}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                  <Badge tone={user.isBlocked ? 'danger' : 'success'}>{user.isBlocked ? 'Blocked' : 'Active'}</Badge>
                  <button type="button" disabled={busyId === user._id} onClick={() => runAction(onToggleBlock, user._id, 'Unable to update user status.')}>{user.isBlocked ? 'Unblock' : 'Block'}</button>
                  <button type="button" disabled={busyId === user._id} onClick={() => confirmAction('Delete this user account permanently?', onDeleteUser, user._id, 'Unable to delete user.')}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '1rem' }}>
          <h3 style={{ marginTop: 0 }}>Products</h3>
          <div style={{ display: 'grid', gap: '0.7rem' }}>
            {recentProducts.map((product) => (
              <div key={product._id || product.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>
                <div>
                  <strong>{product.name}</strong>
                  <div style={{ color: '#64748b', fontSize: '0.9rem' }}>{product.vendor?.storeName || product.vendor || 'Unknown vendor'}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                  <Badge tone={product.status === 'approved' ? 'success' : 'warning'}>{product.status || 'pending'}</Badge>
                  <Link to={`/admin/products/${product._id || product.id}`} style={{ color: '#1d4ed8', fontWeight: 700 }}>Details</Link>
                  <button type="button" disabled={busyId === (product._id || product.id)} onClick={() => confirmAction('Delete this product permanently?', onDeleteProduct, product._id || product.id, 'Unable to delete product.')}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

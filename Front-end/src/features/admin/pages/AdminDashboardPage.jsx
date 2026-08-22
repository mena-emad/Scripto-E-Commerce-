import Badge from '../../../components/ui/Badge';

export default function AdminDashboardPage({ stats, recentUsers, recentProducts }) {
  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
        {stats.map((stat) => (
          <div key={stat.label} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '1rem' }}>
            <div style={{ color: '#64748b', marginBottom: '0.4rem' }}>{stat.label}</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>{stat.value}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '1rem' }}>
          <h3 style={{ marginTop: 0 }}>Users</h3>
          <div style={{ display: 'grid', gap: '0.7rem' }}>
            {recentUsers.map((user) => (
              <div key={user.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>
                <div>
                  <strong>{user.name}</strong>
                  <div style={{ color: '#64748b', fontSize: '0.9rem' }}>{user.role}</div>
                </div>
                <Badge tone={user.isActive ? 'success' : 'danger'}>{user.isActive ? 'Active' : 'Blocked'}</Badge>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '1rem' }}>
          <h3 style={{ marginTop: 0 }}>Products</h3>
          <div style={{ display: 'grid', gap: '0.7rem' }}>
            {recentProducts.map((product) => (
              <div key={product.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>
                <div>
                  <strong>{product.name}</strong>
                  <div style={{ color: '#64748b', fontSize: '0.9rem' }}>{product.vendor}</div>
                </div>
                <Badge tone={product.isApproved ? 'success' : 'warning'}>{product.isApproved ? 'Approved' : 'Pending'}</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

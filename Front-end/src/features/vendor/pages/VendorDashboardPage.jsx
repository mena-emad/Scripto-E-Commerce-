import Badge from '../../../components/ui/Badge';

export default function VendorDashboardPage({ products, vendorOrders, metrics }) {
  const vendorProducts = products.filter((product) => product.vendor === 'v1');

  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
        {metrics.map((metric) => (
          <div key={metric.label} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '1rem' }}>
            <div style={{ color: '#64748b', marginBottom: '0.4rem' }}>{metric.label}</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>{metric.value}</div>
          </div>
        ))}
      </div>

      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '1rem' }}>
        <h3 style={{ marginTop: 0 }}>Recent orders</h3>
        <div style={{ display: 'grid', gap: '0.8rem' }}>
          {vendorOrders.map((order) => (
            <div key={order.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.7rem' }}>
              <div>
                <strong>Order {order.parentOrderId}</strong>
                <div style={{ color: '#64748b', fontSize: '0.9rem' }}>{order.products?.length || order.totalAmount} items</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <strong>${order.totalPrice}</strong>
                <Badge tone={order.status === 'Shipped' ? 'success' : 'warning'}>{order.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '1rem' }}>
        <h3 style={{ marginTop: 0 }}>Products</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          {vendorProducts.map((product) => (
            <div key={product.id} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '0.8rem' }}>
              <strong>{product.name}</strong>
              <div style={{ color: '#64748b', margin: '0.3rem 0' }}>{product.category}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>${product.price}</span>
                <Badge tone={product.isApproved ? 'success' : 'warning'}>{product.isApproved ? 'Approved' : 'Pending'}</Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

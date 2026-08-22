import Badge from '../../../components/ui/Badge';

export default function OrdersPage({ orders }) {
  if (!orders.length) {
    return <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '2rem', textAlign: 'center' }}>No orders yet.</div>;
  }

  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '1rem' }}>
      <h2 style={{ marginTop: 0 }}>My orders</h2>
      <div style={{ display: 'grid', gap: '0.8rem' }}>
        {orders.map((order) => (
          <div key={order.id} style={{ border: '1px solid #e2e8f0', borderRadius: '14px', padding: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <div>
                <strong>Order #{order.id}</strong>
                <div style={{ color: '#64748b', fontSize: '0.9rem' }}>{new Date(order.createdAt).toLocaleDateString()}</div>
              </div>
              <Badge tone={order.status === 'Delivered' ? 'success' : order.status === 'Cancelled' ? 'danger' : 'warning'}>{order.status}</Badge>
            </div>
            <div style={{ marginTop: '0.9rem', display: 'grid', gap: '0.35rem' }}>
              {order.items.map((item) => (
                <div key={`${order.id}-${item.productId}`} style={{ display: 'flex', justifyContent: 'space-between', color: '#475569' }}>
                  <span>{item.productName} x {item.quantity}</span>
                  <span>${item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '0.8rem', display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
              <span>Total</span>
              <span>${order.total}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

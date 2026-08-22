export default function VendorOrdersPage({ orders }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '1rem' }}>
      <h2 style={{ marginTop: 0 }}>Vendor orders</h2>
      <div style={{ display: 'grid', gap: '0.8rem' }}>
        {orders.map((order) => (
          <div key={order.id} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '0.9rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <strong>{order.parentOrderId}</strong>
              <span>{order.status}</span>
            </div>
            <div style={{ color: '#64748b', marginTop: '0.4rem' }}>
              {order.products.map((item) => `${item.productName} (${item.quantity})`).join(', ')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

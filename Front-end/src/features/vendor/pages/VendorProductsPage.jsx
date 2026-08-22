export default function VendorProductsPage({ products }) {
  const vendorProducts = products.filter((product) => product.vendor === 'Northstar Studio');

  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '1rem' }}>
      <h2 style={{ marginTop: 0 }}>My products</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        {vendorProducts.map((product) => (
          <div key={product.id} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '0.9rem' }}>
            <strong>{product.name}</strong>
            <div style={{ color: '#64748b', margin: '0.4rem 0' }}>{product.category}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>${product.price}</span>
              <span>{product.isApproved ? 'Approved' : 'Pending'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

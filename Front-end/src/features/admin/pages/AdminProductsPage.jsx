export default function AdminProductsPage({ products, vendors }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '1rem' }}>
      <h2 style={{ marginTop: 0 }}>Products</h2>
      <div style={{ display: 'grid', gap: '0.8rem' }}>
        {products.map((product) => (
          <div key={product.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.6rem' }}>
            <div>
              <strong>{product.name}</strong>
              <div style={{ color: '#64748b' }}>{product.category} • {vendors.find((vendor) => vendor.storeName === product.vendor)?.storeName || product.vendor}</div>
            </div>
            <span>{product.isApproved ? 'Approved' : 'Pending'}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

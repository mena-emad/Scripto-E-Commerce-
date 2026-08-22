export default function AdminVendorsPage({ vendors }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '1rem' }}>
      <h2 style={{ marginTop: 0 }}>Vendors</h2>
      <div style={{ display: 'grid', gap: '0.8rem' }}>
        {vendors.map((vendor) => (
          <div key={vendor.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.6rem' }}>
            <div>
              <strong>{vendor.storeName}</strong>
              <div style={{ color: '#64748b' }}>{vendor.storeAdress}</div>
            </div>
            <span>{vendor.isApproved ? 'Approved' : 'Pending'}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

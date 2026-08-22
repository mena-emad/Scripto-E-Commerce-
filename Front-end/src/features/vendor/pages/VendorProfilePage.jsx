export default function VendorProfilePage({ vendor }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '1.25rem' }}>
      <h2 style={{ marginTop: 0 }}>Vendor profile</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <img src={vendor.storeLogo} alt={vendor.storeName} style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: '14px' }} />
        </div>
        <div>
          <h3>{vendor.storeName}</h3>
          <p style={{ color: '#64748b' }}>{vendor.storeDescription}</p>
          <div><strong>Location:</strong> {vendor.storeAdress}</div>
          <div style={{ marginTop: '0.4rem' }}><strong>Phone:</strong> {vendor.storePhone}</div>
          <div style={{ marginTop: '0.4rem' }}><strong>Rating:</strong> {vendor.rating} / 5</div>
        </div>
      </div>
    </div>
  );
}

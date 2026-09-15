import { useState } from 'react';

export default function VendorProductsPage({ products, onCreate, onUpdate, onDelete, accessError }) {
  const vendorProducts = products;
  const [form, setForm] = useState({ name: '', quantity: '', price: '', description: '', category: '', productImage: [] });
  const [editingId, setEditingId] = useState('');
  const [editForm, setEditForm] = useState({ name: '', quantity: '', price: '', description: '', category: '', productImage: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    const payload = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === 'productImage') Array.from(value).forEach((file) => payload.append('productImage', file));
      else payload.append(key, value);
    });
    try {
      setLoading(true);
      setError('');
      await onCreate(payload);
      setForm({ name: '', quantity: '', price: '', description: '', category: '', productImage: [] });
      event.target.reset();
    } catch (requestError) {
      setError(requestError?.response?.data?.message || 'Unable to create product.');
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    try {
      setLoading(true);
      setError('');
      await onDelete(id);
    } catch (requestError) {
      setError(requestError?.response?.data?.message || 'Unable to delete product.');
    } finally {
      setLoading(false);
    }
  };

  const startEditing = (product) => {
    setEditingId(product._id || product.id);
    setEditForm({
      name: product.name || '',
      quantity: product.quantity ?? '',
      price: product.price ?? '',
      description: product.description || '',
      category: product.category || '',
      productImage: [],
    });
    setError('');
  };

  const saveEdit = async (event, id) => {
    event.preventDefault();
    const payload = new FormData();
    Object.entries(editForm).forEach(([key, value]) => {
      if (key === 'productImage') Array.from(value || []).forEach((file) => payload.append('productImage', file));
      else payload.append(key, value);
    });
    try {
      setLoading(true);
      setError('');
      await onUpdate(id, payload);
      setEditingId('');
    } catch (requestError) {
      setError(requestError?.response?.data?.message || 'Unable to update product.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '1rem' }}>
      <h2 style={{ marginTop: 0 }}>My products</h2>
      {accessError && <p style={{ color: '#b45309' }}>{accessError}</p>}
      {accessError && <p>Product management will be available after admin approval.</p>}
      {!accessError && <>
      {error && <p style={{ color: '#dc2626' }}>{error}</p>}
      <form onSubmit={submit} style={{ display: 'grid', gap: '0.7rem', marginBottom: '1.2rem', padding: '1rem', background: '#f8fafc', borderRadius: '12px' }}>
        {['name', 'quantity', 'price', 'category', 'description'].map((field) => <input key={field} required placeholder={field} type={field === 'quantity' || field === 'price' ? 'number' : 'text'} value={form[field]} onChange={(event) => setForm({ ...form, [field]: event.target.value })} />)}
        <input required type="file" accept="image/*" multiple onChange={(event) => setForm({ ...form, productImage: event.target.files })} />
        <button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Create product'}</button>
      </form>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        {vendorProducts.map((product) => (
          <div key={product._id || product.id} style={{ border: '1px solid #e2e8f0', borderRadius: '12px', padding: '0.9rem' }}>
            {editingId === (product._id || product.id) ? (
              <form onSubmit={(event) => saveEdit(event, product._id || product.id)} style={{ display: 'grid', gap: '0.6rem' }}>
                {['name', 'quantity', 'price', 'category', 'description'].map((field) => (
                  <input key={field} required placeholder={field} type={field === 'quantity' || field === 'price' ? 'number' : 'text'} value={editForm[field]} onChange={(event) => setEditForm({ ...editForm, [field]: event.target.value })} />
                ))}
                <label>
                  Replace photos (optional)
                  <input type="file" accept="image/*" multiple onChange={(event) => setEditForm({ ...editForm, productImage: event.target.files })} />
                </label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save changes'}</button>
                  <button type="button" disabled={loading} onClick={() => setEditingId('')}>Cancel</button>
                </div>
              </form>
            ) : <>
            <strong>{product.name}</strong>
            <div style={{ color: '#64748b', margin: '0.4rem 0' }}>{product.category}</div>
            <div style={{ color: '#475569', fontSize: '0.85rem', marginBottom: '0.5rem' }}><strong>Vendor:</strong> {product.vendor?.storeName || product.vendor?.name || product.vendor || 'My store'}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>${product.price}</span>
              <span>{product.status || 'pending'}</span>
                <a href={`/products/${product._id || product.id}`} style={{ color: '#1d4ed8', fontWeight: 700 }}>Details</a>
                <button type="button" disabled={loading} onClick={() => startEditing(product)}>Edit</button>
                <button type="button" disabled={loading} onClick={() => remove(product._id || product.id)}>Delete</button>
            </div>
              </>}
          </div>
        ))}
      </div>
      </>}
    </div>
  );
}

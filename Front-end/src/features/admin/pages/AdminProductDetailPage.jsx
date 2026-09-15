import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Badge from '../../../components/ui/Badge';

export default function AdminProductDetailPage({ getProductDetails, onApprove, onToggleActive }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getProductDetails(id)
      .then((response) => setProduct(response.productDetails))
      .catch((requestError) => setError(requestError?.response?.data?.message || 'Unable to load product details.'))
      .finally(() => setLoading(false));
  }, [id, getProductDetails]);

  const approve = async () => {
    try {
      setBusy(true);
      setError('');
      await onApprove(id);
      setProduct((current) => ({ ...current, status: 'approved', isActive: true }));
    } catch (requestError) {
      setError(requestError?.response?.data?.message || 'Unable to approve product.');
    } finally {
      setBusy(false);
    }
  };

  const toggleActive = async () => {
    try {
      setBusy(true);
      setError('');
      const response = await onToggleActive(id, !product.isActive);
      setProduct(response.product);
    } catch (requestError) {
      setError(requestError?.response?.data?.message || 'Unable to update product availability.');
    } finally {
      setBusy(false);
    }
  };

  if (loading) return <div style={cardStyle}>Loading product details...</div>;
  if (!product) return <div style={cardStyle}>{error || 'Product not found.'}</div>;

  const image = product.images?.[0]?.url;
  const images = product.images || [];
  const vendorName = product.vendor?.storeName || product.vendor || 'Unknown vendor';

  return <div style={cardStyle}>
    <Link to="/admin/products">Back to products</Link>
    <h1>{product.name}</h1>
    {error && <p style={{ color: '#dc2626' }}>{error}</p>}
    {image && <img src={image} alt={product.name} style={{ width: '100%', maxHeight: '360px', objectFit: 'cover', borderRadius: '14px' }} />}
    <hr />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginTop: '0.8rem'}}>
        {
          images.map((image, index) => <img key={index} src={image.url} alt={`${product.name} ${index + 1}`} style={{ borderRadius: '12px', height: '180px', objectFit: 'cover' }} />)
        }
    </div>    
    <p>{product.description}</p>
    <p><strong>Vendor:</strong> {vendorName}</p>
    <p><strong>Category:</strong> {product.category}</p>
    <p><strong>Price:</strong> ${product.price}</p>
    <p><strong>Stock:</strong> {product.quantity}</p>
    <Badge tone={product.status === 'approved' ? 'success' : 'warning'}>{product.status || 'pending'}</Badge>
    {product.status === 'pending' && <div style={{ marginTop: '1rem' }}><Button onClick={approve} disabled={busy}>{busy ? 'Approving...' : 'Approve product'}</Button></div>}
    {product.status === 'approved' && <div style={{ marginTop: '1rem' }}><Button onClick={toggleActive} disabled={busy}>{busy ? 'Updating...' : product.isActive ? 'Make inactive' : 'Make active'}</Button></div>}
  </div>;
}

const cardStyle = { background: '#fff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '1.25rem' };
import { useParams, Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Badge from '../../../components/ui/Badge';

export default function ProductDetailPage({ products, currentUser, onAddToCart }) {
  const { id } = useParams();
  const product = products.find((item) => (item.id || item._id) === id);
  console.log(product)

  if (!product) {
    return <div style={{ background: '#fff', borderRadius: '18px', padding: '2rem', border: '1px solid #e2e8f0' }}>Product not found.</div>;
  }

  const vendorName = product.vendor?.storeName || product.vendor?.name || product.vendor || 'Unknown vendor';
  const images = product.images || [];
  console.log(images)
  const isAvailable = product.status === 'approved' && product.isActive === true && product.quantity > 0;
  const availabilityMessage = product.status === 'pending'
    ? 'This product is waiting for admin approval.'
    : product.status === 'rejected'
      ? 'This product was rejected by an administrator.'
      : product.status === 'out of stock' || !product.isActive || product.quantity <= 0
        ? 'This product is currently out of stock.'
        : '';

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '1.5rem' }} className="responsive-two-column">
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '22px', padding: '1rem' }}>
        <img src={images[0].url} alt={product.name} style={{ width: '100%', height: '480px', objectFit: 'cover', borderRadius: '16px' }} />
        <hr />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginTop: '0.8rem' }}>
          {images.map((image, index) => (
            <img key={index} src={image.url} alt={`${product.name} ${index + 1}`} style={{ borderRadius: '12px', height: '180px', objectFit: 'cover' }} />
          ))}
        </div>
      </div>

      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '22px', padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', marginBottom: '0.8rem' }}>
          <Badge tone={product.status === 'approved' ? 'success' : 'warning'}>{product.status || 'pending'}</Badge>
          {product.discount?.isActive && <Badge tone="success">{product.discount.percentage}% Off</Badge>}
        </div>

        <h1 style={{ fontSize: '2.1rem', margin: '0 0 0.7rem' }}>{product.name}</h1>
        <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: 1.7 }}>{product.description}</p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1rem 0' }}>
          <strong style={{ fontSize: '2rem' }}>${product.price}</strong>
          <span style={{ color: '#475569' }}>{product.quantity} units left</span>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.2rem', flexWrap: 'wrap' }}>
          <Button onClick={() => onAddToCart(product, 1)} disabled={!isAvailable}>
            {isAvailable ? 'Add to cart' : 'Unavailable'}
          </Button>
          <Link to="/products"><Button variant="secondary">Continue shopping</Button></Link>
        </div>

        <div style={{ marginTop: '1.4rem', background: '#f8fafc', borderRadius: '14px', padding: '1rem',color:"black" }}>
          <div><strong>Category:</strong> {product.category}</div>
          <div style={{ marginTop: '0.4rem' }}><strong>Vendor:</strong> {vendorName}</div>
          <div style={{ marginTop: '0.4rem' }}><strong>Availability:</strong> {product.isActive ? 'Available' : 'Unavailable'}</div>
          <div style={{ marginTop: '0.4rem' }}><strong>Availability:</strong> {product.status}</div>
          {!isAvailable && <div style={{ marginTop: '0.6rem', color: '#b45309' }}>{availabilityMessage}</div>}
        </div>
      </div>
    </div>
  );
}

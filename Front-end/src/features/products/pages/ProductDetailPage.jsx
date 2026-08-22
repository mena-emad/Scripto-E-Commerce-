import { useParams, Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Badge from '../../../components/ui/Badge';

export default function ProductDetailPage({ products, currentUser, onAddToCart }) {
  const { id } = useParams();
  const product = products.find((item) => item.id === id);

  if (!product) {
    return <div style={{ background: '#fff', borderRadius: '18px', padding: '2rem', border: '1px solid #e2e8f0' }}>Product not found.</div>;
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '1.5rem' }}>
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '22px', padding: '1rem' }}>
        <img src={product.images[0]} alt={product.name} style={{ width: '100%', height: '480px', objectFit: 'cover', borderRadius: '16px' }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '0.75rem', marginTop: '0.8rem' }}>
          {product.images.map((image, index) => (
            <img key={index} src={image} alt={`${product.name} ${index + 1}`} style={{ borderRadius: '12px', height: '180px', objectFit: 'cover' }} />
          ))}
        </div>
      </div>

      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '22px', padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', marginBottom: '0.8rem' }}>
          <Badge tone={product.isApproved ? 'success' : 'warning'}>{product.isApproved ? 'Approved' : 'Pending'}</Badge>
          {product.discount?.isActive && <Badge tone="success">{product.discount.percentage}% Off</Badge>}
        </div>

        <h1 style={{ fontSize: '2.1rem', margin: '0 0 0.7rem' }}>{product.name}</h1>
        <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: 1.7 }}>{product.description}</p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '1rem 0' }}>
          <strong style={{ fontSize: '2rem' }}>${product.price}</strong>
          <span style={{ color: '#475569' }}>{product.quantity} units left</span>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.2rem', flexWrap: 'wrap' }}>
          <Button onClick={() => onAddToCart(product, 1)}>Add to cart</Button>
          <Link to="/products"><Button variant="secondary">Continue shopping</Button></Link>
        </div>

        <div style={{ marginTop: '1.4rem', background: '#f8fafc', borderRadius: '14px', padding: '1rem' }}>
          <div><strong>Category:</strong> {product.category}</div>
          <div style={{ marginTop: '0.4rem' }}><strong>Vendor:</strong> {product.vendor}</div>
          <div style={{ marginTop: '0.4rem' }}><strong>Status:</strong> {product.isActive}</div>
        </div>
      </div>
    </div>
  );
}

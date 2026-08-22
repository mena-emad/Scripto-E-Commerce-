import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Badge from '../../../components/ui/Badge';

const cardStyle = {
  background: '#fff',
  border: '1px solid #e2e8f0',
  borderRadius: '18px',
  padding: '1.2rem',
  boxShadow: '0 12px 22px rgba(15, 23, 42, 0.05)'
};

export default function HomePage({ products, categories, currentUser, onAddToCart }) {
  const approvedProducts = products.filter((product) => product.isApproved);
  const featured = approvedProducts.slice(0, 4);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <div style={{ ...cardStyle, display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '1.2rem', alignItems: 'center', padding: '1.8rem' }}>
        <div>
          <Badge tone="primary">Marketplace</Badge>
          <h1 style={{ fontSize: '2.6rem', lineHeight: 1.1, margin: '1rem 0 0.5rem' }}>Curated essentials for work, life, and growth.</h1>
          <p style={{ color: '#475569', fontSize: '1.05rem', marginBottom: '1.5rem' }}>
            Discover approved products from trusted vendors across premium electronics, accessories, and lifestyle essentials.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/products"><Button>Browse products</Button></Link>
            {currentUser ? <Link to="/cart"><Button variant="secondary">View cart</Button></Link> : <Link to="/login"><Button variant="secondary">Login</Button></Link>}
          </div>
        </div>

        <div style={{ display: 'grid', gap: '0.85rem' }}>
          <img style={{ borderRadius: '18px', height: '300px', objectFit: 'cover' }} src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80" alt="Marketplace" />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
        {categories.map((category) => (
          <div key={category} style={{ ...cardStyle, textAlign: 'center', padding: '1rem' }}>
            <strong>{category}</strong>
          </div>
        ))}
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ margin: 0 }}>Featured products</h2>
          <Link to="/products" style={{ color: '#1d4ed8', fontWeight: 700 }}>See all</Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1rem' }}>
          {featured.map((product) => (
            <div key={product.id} style={{ ...cardStyle, overflow: 'hidden' }}>
              <img src={product.images[0]} alt={product.name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '12px', marginBottom: '0.9rem' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <strong>{product.name}</strong>
                <Badge tone={product.discount?.isActive ? 'success' : 'neutral'}>{product.discount?.isActive ? `${product.discount.percentage}% off` : 'New'}</Badge>
              </div>
              <p style={{ color: '#64748b', minHeight: '60px', marginBottom: '0.8rem' }}>{product.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: '1.2rem' }}>${product.price}</strong>
                <Button onClick={() => onAddToCart(product, 1)}>Add to cart</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

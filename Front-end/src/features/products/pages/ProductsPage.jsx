import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Badge from '../../../components/ui/Badge';

const styles = {
  layout: { display: 'grid', gridTemplateColumns: '280px 1fr', gap: '1.25rem' },
  sidebar: { background: '#fff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '1rem', height: 'fit-content' },
  productGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' },
  card: { background: '#fff', border: '1px solid #e2e8f0', borderRadius: '18px', padding: '1rem', boxShadow: '0 12px 20px rgba(15,23,42,0.04)' }
};

export default function ProductsPage({ products, categories, currentUser, onAddToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filteredProducts = useMemo(() => {
    const approved = products.filter((product) => product.isApproved);
    return approved.filter((product) => {
      const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
      const searchMatch = product.name.toLowerCase().includes(search.toLowerCase()) || product.description.toLowerCase().includes(search.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [search, selectedCategory, products]);

  return (
    <div style={styles.layout}>
      <aside style={styles.sidebar}>
        <h3 style={{ marginTop: 0 }}>Categories</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button onClick={() => setSelectedCategory('All')} style={{ padding: '0.7rem 0.8rem', borderRadius: '10px', border: selectedCategory === 'All' ? '1px solid #1d4ed8' : '1px solid #e2e8f0', background: selectedCategory === 'All' ? '#eff6ff' : '#fff', textAlign: 'left', cursor: 'pointer', fontWeight: 700 }}>All</button>
          {categories.map((category) => (
            <button key={category} onClick={() => setSelectedCategory(category)} style={{ padding: '0.7rem 0.8rem', borderRadius: '10px', border: selectedCategory === category ? '1px solid #1d4ed8' : '1px solid #e2e8f0', background: selectedCategory === category ? '#eff6ff' : '#fff', textAlign: 'left', cursor: 'pointer', fontWeight: 700 }}>{category}</button>
          ))}
        </div>
      </aside>

      <div>
        <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products"
            style={{ flex: 1, minWidth: '220px', padding: '0.8rem 0.9rem', borderRadius: '12px', border: '1px solid #cbd5e1', background: '#fff' }}
          />
          <strong>{filteredProducts.length} products</strong>
        </div>

        {filteredProducts.length === 0 ? (
          <div style={{ ...styles.card, textAlign: 'center', padding: '2rem' }}>No products match your filters.</div>
        ) : (
          <div style={styles.productGrid}>
            {filteredProducts.map((product) => (
              <div key={product.id} style={styles.card}>
                <img src={product.images[0]} alt={product.name} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '12px', marginBottom: '0.9rem' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.6rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <strong>{product.name}</strong>
                  <Badge tone={product.discount?.isActive ? 'success' : 'neutral'}>{product.discount?.isActive ? `${product.discount.percentage}%` : 'Stocked'}</Badge>
                </div>
                <p style={{ color: '#64748b', minHeight: '64px' }}>{product.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                  <strong style={{ fontSize: '1.2rem' }}>${product.price}</strong>
                  <span style={{ color: '#475569', fontSize: '0.8rem' }}>{product.quantity} in stock</span>
                </div>
                <div style={{ display: 'flex', gap: '0.6rem' }}>
                  <Link to={`/products/${product.id}`} style={{ flex: 1 }}><Button variant="secondary" fullWidth>Details</Button></Link>
                  <Button onClick={() => onAddToCart(product, 1)} fullWidth={false}>Add</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

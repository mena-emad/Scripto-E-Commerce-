import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Badge from '../../../components/ui/Badge';

const styles = {
  layout: {
    display: 'grid',
    gridTemplateColumns: '260px 1fr',
    gap: '1.5rem',
    alignItems: 'start'
  },

  sidebar: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '20px',
    padding: '1.1rem',
    boxShadow: '0 10px 30px rgba(15, 23, 42, 0.05)',
    position: 'sticky',
    top: '1rem'
  },

  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1rem'
  },

  card: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '20px',
    padding: '0.8rem',
    boxShadow: '0 10px 25px rgba(15, 23, 42, 0.05)'
  }
};

export default function ProductsPage({
  products,
  categories,
  currentUser,
  onAddToCart
}) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filteredProducts = useMemo(() => {
    const approved = products.filter(
      (product) =>
        product.status === 'approved' &&
        product.isActive === true
    );

    return approved.filter((product) => {
      const categoryMatch =
        selectedCategory === 'All' ||
        product.category === selectedCategory;

      const searchMatch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [search, selectedCategory, products]);

  return (
    <div
      style={styles.layout}
      className="responsive-sidebar-layout"
    >
      {/* Sidebar */}
      <aside style={styles.sidebar}>
        <div style={{ marginBottom: '1rem' }}>
          <h3
            style={{
              margin: 0,
              color: '#0f172a',
              fontSize: '1.05rem'
            }}
          >
            Categories
          </h3>

          <p
            style={{
              margin: '0.35rem 0 0',
              color: '#64748b',
              fontSize: '0.82rem'
            }}
          >
            Browse products by category
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.45rem'
          }}
        >
          <button
            type="button"
            onClick={() => setSelectedCategory('All')}
            style={{
              padding: '0.75rem 0.85rem',
              borderRadius: '12px',
              border:
                selectedCategory === 'All'
                  ? '1px solid #2563eb'
                  : '1px solid #e2e8f0',
              background:
                selectedCategory === 'All'
                  ? '#eff6ff'
                  : '#ffffff',
              color:
                selectedCategory === 'All'
                  ? '#1d4ed8'
                  : '#475569',
              textAlign: 'left',
              cursor: 'pointer',
              fontWeight: 700,
              transition: 'all 0.2s ease'
            }}
          >
            All products
          </button>

          {categories.map((category) => {
            const active = selectedCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                style={{
                  padding: '0.75rem 0.85rem',
                  border: active
                    ? '1px solid #2563eb'
                    : '1px solid #e2e8f0',
                  borderRadius: '12px',
                  background: active
                    ? '#eff6ff'
                    : '#ffffff',
                  color: active
                    ? '#1d4ed8'
                    : '#475569',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontWeight: 700,
                  transition: 'all 0.2s ease'
                }}
              >
                {category}
              </button>
            );
          })}
        </div>
      </aside>

      {/* Products */}
      <main>
        {/* Search Header */}
        <div
          style={{
            ...styles.card,
            padding: '1rem',
            marginBottom: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            flexWrap: 'wrap'
          }}
        >
          <div
            style={{
              flex: 1,
              minWidth: '220px',
              position: 'relative'
            }}
          >
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              style={{
                width: '100%',
                boxSizing: 'border-box',
                padding: '0.8rem 1rem',
                borderRadius: '12px',
                border: '1px solid #cbd5e1',
                background: '#f8fafc',
                color: '#0f172a',
                outline: 'none',
                fontSize: '0.95rem'
              }}
            />
          </div>

          <div
            style={{
              background: '#f1f5f9',
              color: '#475569',
              padding: '0.6rem 0.8rem',
              borderRadius: '10px',
              fontSize: '0.85rem',
              fontWeight: 700,
              whiteSpace: 'nowrap'
            }}
          >
            {filteredProducts.length}{' '}
            {filteredProducts.length === 1 ? 'product' : 'products'}
          </div>
        </div>

        {/* Active Filter */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            marginBottom: '1rem',
            flexWrap: 'wrap'
          }}
        >
          <span
            style={{
              color: '#64748b',
              fontSize: '0.85rem'
            }}
          >
            Showing:
          </span>

          <Badge tone="primary">
            {selectedCategory}
          </Badge>

          {search && (
            <span
              style={{
                color: '#64748b',
                fontSize: '0.85rem'
              }}
            >
              for "{search}"
            </span>
          )}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 ? (
          <div
            style={{
              ...styles.card,
              padding: '3rem 1.5rem',
              textAlign: 'center'
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                margin: '0 auto 1rem',
                borderRadius: '16px',
                display: 'grid',
                placeItems: 'center',
                background: '#f1f5f9',
                color: '#64748b',
                fontSize: '1.3rem',
                fontWeight: 800
              }}
            >
              ?
            </div>

            <h3
              style={{
                margin: '0 0 0.5rem',
                color: '#0f172a'
              }}
            >
              No products found
            </h3>

            <p
              style={{
                margin: 0,
                color: '#64748b'
              }}
            >
              No products match your current filters.
            </p>
          </div>
        ) : (
          <div style={styles.productGrid}>
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                style={{
                  ...styles.card,
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden'
                }}
              >
                {/* Product Image */}
                <div
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '14px',
                    marginBottom: '1rem'
                  }}
                >
                  <img
                    src={product.images[0]?.url}
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />

                  <div
                    style={{
                      position: 'absolute',
                      top: '0.7rem',
                      left: '0.7rem'
                    }}
                  >
                    <Badge
                      tone={
                        product.status === 'approved'
                          ? 'success'
                          : 'warning'
                      }
                    >
                      {product.status || 'pending'}
                    </Badge>
                  </div>
                </div>

                {/* Product Info */}
                <div
                  style={{
                    padding: '0 0.3rem 0.3rem',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1
                  }}
                >
                  <h3
                    style={{
                      margin: '0 0 0.5rem',
                      color: '#0f172a',
                      fontSize: '1rem',
                      lineHeight: 1.4
                    }}
                  >
                    {product.name}
                  </h3>

                  <p
                    style={{
                      color: '#64748b',
                      fontSize: '0.88rem',
                      lineHeight: 1.55,
                      minHeight: '65px',
                      margin: '0 0 0.8rem'
                    }}
                  >
                    {product.description}
                  </p>

                  {/* Vendor */}
                  <div
                    style={{
                      color: '#64748b',
                      fontSize: '0.82rem',
                      marginBottom: '0.8rem'
                    }}
                  >
                    <strong style={{ color: '#475569' }}>
                      Vendor:
                    </strong>{' '}
                    {product.vendor?.storeName ||
                      product.vendor?.name ||
                      product.vendor ||
                      'Unknown vendor'}
                  </div>

                  {/* Price / Stock */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '1rem'
                    }}
                  >
                    <strong
                      style={{
                        color: '#0f172a',
                        fontSize: '1.25rem'
                      }}
                    >
                      ${product.price}
                    </strong>

                    <span
                      style={{
                        color:
                          product.quantity > 0
                            ? '#475569'
                            : '#dc2626',
                        background:
                          product.quantity > 0
                            ? '#f1f5f9'
                            : '#fef2f2',
                        padding: '0.35rem 0.55rem',
                        borderRadius: '8px',
                        fontSize: '0.75rem',
                        fontWeight: 700
                      }}
                    >
                      {product.quantity > 0
                        ? `${product.quantity} in stock`
                        : 'Out of stock'}
                    </span>
                  </div>

                  {/* Actions */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '0.6rem',
                      marginTop: 'auto'
                    }}
                  >
                    <Link
                      to={`/products/${product.id}`}
                      style={{
                        textDecoration: 'none'
                      }}
                    >
                      <Button
                        variant="secondary"
                        fullWidth
                      >
                        Details
                      </Button>
                    </Link>

                    <Button
                      onClick={() => onAddToCart(product, 1)}
                      fullWidth
                    >
                      Add to cart
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
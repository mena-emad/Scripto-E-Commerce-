import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Badge from '../../../components/ui/Badge';

const cardStyle = {
  background: '#fff',
  border: '1px solid #e2e8f0',
  borderRadius: '18px',
  padding: '1.2rem',
  boxShadow: '0 12px 22px rgba(15, 23, 42, 0.05)',
  boxSizing: 'border-box',
  minWidth: 0,
};

export default function HomePage({
  products,
  categories,
  currentUser,
  onAddToCart,
}) {
  const approvedProducts = products.filter(
    (product) =>
      product.status === 'approved' && product.isActive === true
  );

  const featured = approvedProducts.slice(0, 4);

  return (
    <>
      <style>
        {`
          .home-page {
            width: 100%;
            min-width: 0;
            box-sizing: border-box;
          }

          .home-hero {
            width: 100%;
            min-width: 0;
            box-sizing: border-box;
          }

          .hero-content {
            min-width: 0;
          }

          .hero-title {
            overflow-wrap: anywhere;
          }

          .hero-image-wrapper {
            width: 100%;
            min-width: 0;
          }

          .hero-image {
            width: 100%;
            max-width: 100%;
            display: block;
          }

          .category-grid,
          .products-grid {
            width: 100%;
            min-width: 0;
            box-sizing: border-box;
          }

          .product-card {
            min-width: 0;
            overflow: hidden;
          }

          .product-image {
            width: 100%;
            max-width: 100%;
            display: block;
          }

          .product-header {
            min-width: 0;
            gap: 0.5rem;
          }

          .product-name {
            min-width: 0;
            overflow-wrap: anywhere;
          }

          .product-description {
            overflow-wrap: anywhere;
          }

          .product-vendor {
            overflow-wrap: anywhere;
          }

          .product-footer {
            min-width: 0;
            gap: 0.75rem;
          }

          .product-actions {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
            justify-content: flex-end;
          }

          @media (max-width: 900px) {
            .home-hero {
              grid-template-columns: 1fr !important;
            }

            .hero-image {
              height: 280px !important;
            }
          }

          @media (max-width: 700px) {
            .home-page {
              gap: 1.25rem !important;
            }

            .home-hero {
              padding: 1.25rem !important;
            }

            .hero-title {
              font-size: 2rem !important;
            }

            .hero-description {
              font-size: 1rem !important;
            }

            .product-footer {
              flex-direction: column;
              align-items: stretch !important;
            }

            .product-actions {
              width: 100%;
              justify-content: stretch;
            }

            .product-actions > * {
              flex: 1;
              min-width: 0;
            }

            .product-actions button,
            .product-actions a {
              width: 100%;
            }
          }

          @media (max-width: 500px) {
            .home-page {
              gap: 1rem !important;
            }

            .home-hero {
              padding: 1rem !important;
              border-radius: 14px !important;
            }

            .hero-title {
              font-size: 1.65rem !important;
              line-height: 1.2 !important;
            }

            .hero-description {
              font-size: 0.95rem !important;
              line-height: 1.6;
            }

            .hero-buttons {
              flex-direction: column !important;
              gap: 0.65rem !important;
            }

            .hero-buttons > * {
              width: 100%;
            }

            .hero-buttons button {
              width: 100%;
            }

            .hero-image {
              height: 220px !important;
              border-radius: 14px !important;
            }

            .category-card {
              padding: 0.85rem !important;
            }

            .section-header {
              align-items: flex-start !important;
              gap: 0.5rem;
            }

            .section-header h2 {
              font-size: 1.35rem;
            }

            .product-card {
              padding: 1rem !important;
              border-radius: 14px !important;
            }

            .product-image {
              height: 180px !important;
            }

            .product-header {
              align-items: flex-start !important;
              flex-direction: column;
            }

            .product-description {
              min-height: auto !important;
            }

            .product-actions {
              flex-direction: column;
            }

            .product-actions > * {
              width: 100%;
              flex: none;
            }
          }
        `}
      </style>

      <div
        className="home-page"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.75rem',
        }}
      >
        {/* ================= HERO ================= */}
        <div
          className="home-hero"
          style={{
            ...cardStyle,
            display: 'grid',
            gridTemplateColumns: '1.4fr 1fr',
            gap: '1.2rem',
            alignItems: 'center',
            padding: '1.8rem',
          }}
        >
          <div className="hero-content">
            <Badge tone="primary">Marketplace</Badge>

            <h1
              className="hero-title"
              style={{
                fontSize: '2.6rem',
                lineHeight: 1.1,
                margin: '1rem 0 0.5rem',
              }}
            >
              Curated essentials for work, life, and growth.
            </h1>

            <p
              className="hero-description"
              style={{
                color: '#475569',
                fontSize: '1.05rem',
                marginBottom: '1.5rem',
              }}
            >
              Discover approved products from trusted vendors across premium
              electronics, accessories, and lifestyle essentials.
            </p>

            <div
              className="hero-buttons"
              style={{
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap',
              }}
            >
              <Link to="/products">
                <Button>Browse products</Button>
              </Link>

              {currentUser ? (
                <Link to="/cart">
                  <Button variant="secondary">View cart</Button>
                </Link>
              ) : (
                <Link to="/login">
                  <Button variant="secondary">Login</Button>
                </Link>
              )}
            </div>
          </div>

          <div
            className="hero-image-wrapper"
            style={{
              display: 'grid',
              gap: '0.85rem',
            }}
          >
            <img
              className="hero-image"
              src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80"
              alt="Marketplace"
              style={{
                borderRadius: '18px',
                height: '300px',
                objectFit: 'cover',
              }}
            />
          </div>
        </div>

        {/* ================= CATEGORIES ================= */}
        <div
          className="category-grid"
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
          }}
        >
          {categories.map((category) => (
            <div
              key={category}
              className="category-card"
              style={{
                ...cardStyle,
                textAlign: 'center',
                padding: '1rem',
              }}
            >
              <strong>{category}</strong>
            </div>
          ))}
        </div>

        {/* ================= FEATURED PRODUCTS ================= */}
        <div>
          <div
            className="section-header"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem',
            }}
          >
            <h2 style={{ margin: 0 }}>Featured products</h2>

            <Link
              to="/products"
              style={{
                color: '#1d4ed8',
                fontWeight: 700,
              }}
            >
              See all
            </Link>
          </div>

          <div
            className="products-grid"
            style={{
              display: 'grid',
              gridTemplateColumns:
                'repeat(auto-fit, minmax(230px, 1fr))',
              gap: '1rem',
            }}
          >
            {featured.map((product) => (
              <div
                key={product.id}
                className="product-card"
                style={{
                  ...cardStyle,
                  overflow: 'hidden',
                }}
              >
                <img
                  className="product-image"
                  src={product.images[0]?.url}
                  alt={product.name}
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '12px',
                    marginBottom: '0.9rem',
                  }}
                />

                <div
                  className="product-header"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.5rem',
                  }}
                >
                  <strong className="product-name">
                    {product.name}
                  </strong>

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

                <p
                  className="product-description"
                  style={{
                    color: '#64748b',
                    minHeight: '60px',
                    marginBottom: '0.8rem',
                  }}
                >
                  {product.description}
                </p>

                <div
                  className="product-vendor"
                  style={{
                    color: '#475569',
                    fontSize: '0.85rem',
                    marginBottom: '0.8rem',
                  }}
                >
                  <strong>Vendor:</strong>{' '}
                  {product.vendor?.storeName ||
                    product.vendor?.name ||
                    product.vendor ||
                    'Unknown vendor'}
                </div>

                <div
                  className="product-footer"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <strong
                    style={{
                      fontSize: '1.2rem',
                    }}
                  >
                    ${product.price}
                  </strong>

                  <div className="product-actions">
                    <Link to={`/products/${product.id}`}>
                      <Button variant="secondary">
                        Details
                      </Button>
                    </Link>

                    <Button
                      onClick={() =>
                        onAddToCart(product, 1)
                      }
                    >
                      Add to cart
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
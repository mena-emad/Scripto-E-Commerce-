import { useParams, Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Badge from '../../../components/ui/Badge';

const styles = {
  page: {
    display: 'grid',
    gridTemplateColumns: '1.1fr 0.9fr',
    gap: '1.5rem',
  },

  galleryCard: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '22px',
    padding: '1rem',
    boxShadow: '0 12px 24px rgba(15, 23, 42, 0.05)',
  },

  mainImage: {
    width: '100%',
    height: '480px',
    objectFit: 'cover',
    borderRadius: '16px',
    display: 'block',
  },

  divider: {
    border: 0,
    borderTop: '1px solid #e2e8f0',
    margin: '1rem 0',
  },

  imageGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
    gap: '0.75rem',
  },

  thumbnail: {
    width: '100%',
    height: '160px',
    objectFit: 'cover',
    borderRadius: '12px',
    display: 'block',
  },

  detailsCard: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '22px',
    padding: '1.5rem',
    boxShadow: '0 12px 24px rgba(15, 23, 42, 0.05)',
  },

  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '0.75rem',
    flexWrap: 'wrap',
    marginBottom: '1rem',
  },

  title: {
    fontSize: '2.2rem',
    lineHeight: 1.2,
    margin: 0,
    color: '#0f172a',
  },

  description: {
    color: '#64748b',
    fontSize: '1rem',
    lineHeight: 1.8,
    margin: '0.9rem 0 0',
  },

  priceRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '1rem',
    flexWrap: 'wrap',
    margin: '1.5rem 0',
    padding: '1rem 0',
    borderTop: '1px solid #e2e8f0',
    borderBottom: '1px solid #e2e8f0',
  },

  price: {
    fontSize: '2rem',
    fontWeight: 800,
    color: '#0f172a',
  },

  stock: {
    color: '#475569',
    fontSize: '0.95rem',
  },

  actions: {
    display: 'flex',
    gap: '0.75rem',
    marginTop: '1.2rem',
    flexWrap: 'wrap',
  },

  infoBox: {
    marginTop: '1.5rem',
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '16px',
    padding: '1rem',
    color: '#0f172a',
  },

  infoRow: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '1rem',
    padding: '0.55rem 0',
    borderBottom: '1px solid #e2e8f0',
    flexWrap: 'wrap',
  },

  infoRowLast: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '1rem',
    padding: '0.55rem 0',
    flexWrap: 'wrap',
  },

  infoLabel: {
    color: '#64748b',
    fontSize: '0.9rem',
  },

  infoValue: {
    color: '#0f172a',
    fontWeight: 600,
    textAlign: 'right',
  },

  warning: {
    marginTop: '0.75rem',
    padding: '0.8rem 0.9rem',
    borderRadius: '10px',
    background: '#fffbeb',
    border: '1px solid #fde68a',
    color: '#92400e',
    fontSize: '0.9rem',
    lineHeight: 1.5,
  },

  notFound: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '18px',
    padding: '2rem',
    color: '#475569',
    textAlign: 'center',
  },
};

export default function ProductDetailPage({
  products,
  currentUser,
  onAddToCart,
}) {
  const { id } = useParams();

  const product = products.find(
    (item) => (item.id || item._id) === id
  );

  if (!product) {
    return (
      <div style={styles.notFound}>
        <h2 style={{ margin: '0 0 0.5rem', color: '#0f172a' }}>
          Product not found
        </h2>

        <p style={{ margin: 0 }}>
          The product you are looking for does not exist or is no longer available.
        </p>
      </div>
    );
  }

  const vendorName =
    product.vendor?.storeName ||
    product.vendor?.name ||
    product.vendor ||
    'Unknown vendor';

  const images = product.images || [];

  const isAvailable =
    product.status === 'approved' &&
    product.isActive === true &&
    product.quantity > 0;

  const availabilityMessage =
    product.status === 'pending'
      ? 'This product is waiting for admin approval.'
      : product.status === 'rejected'
        ? 'This product was rejected by an administrator.'
        : product.status === 'out of stock' ||
            !product.isActive ||
            product.quantity <= 0
          ? 'This product is currently out of stock.'
          : '';

  return (
    <div style={styles.page} className="responsive-two-column">
      {/* Product Gallery */}
      <div style={styles.galleryCard}>
        {images.length > 0 && (
          <>
            <img
              src={images[0].url}
              alt={product.name}
              style={styles.mainImage}
            />

            <hr style={styles.divider} />

            <div style={styles.imageGrid}>
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={`${product.name} ${index + 1}`}
                  style={styles.thumbnail}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Product Information */}
      <div style={styles.detailsCard}>
        <div style={styles.topRow}>
          <Badge
            tone={product.status === 'approved' ? 'success' : 'warning'}
          >
            {product.status || 'pending'}
          </Badge>

          {product.discount?.isActive && (
            <Badge tone="success">
              {product.discount.percentage}% Off
            </Badge>
          )}
        </div>

        <h1 style={styles.title}>{product.name}</h1>

        <p style={styles.description}>
          {product.description}
        </p>

        <div style={styles.priceRow}>
          <strong style={styles.price}>
            ${product.price}
          </strong>

          <span style={styles.stock}>
            {product.quantity} units left
          </span>
        </div>

        <div style={styles.actions}>
          <Button
            onClick={() => onAddToCart(product, 1)}
            disabled={!isAvailable}
          >
            {isAvailable ? 'Add to cart' : 'Unavailable'}
          </Button>

          <Link to="/products">
            <Button variant="secondary">
              Continue shopping
            </Button>
          </Link>
        </div>

        {/* Product Info */}
        <div style={styles.infoBox}>
          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Category</span>
            <span style={styles.infoValue}>
              {product.category}
            </span>
          </div>

          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Vendor</span>
            <span style={styles.infoValue}>
              {vendorName}
            </span>
          </div>

          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Availability</span>
            <span style={styles.infoValue}>
              {product.isActive ? 'Available' : 'Unavailable'}
            </span>
          </div>

          <div style={styles.infoRowLast}>
            <span style={styles.infoLabel}>Status</span>
            <span style={styles.infoValue}>
              {product.status}
            </span>
          </div>

          {!isAvailable && (
            <div style={styles.warning}>
              {availabilityMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
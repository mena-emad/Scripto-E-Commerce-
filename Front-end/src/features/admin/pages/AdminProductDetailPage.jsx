import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Badge from '../../../components/ui/Badge';

export default function AdminProductDetailPage({
  getProductDetails,
  onApprove,
  onToggleActive,
}) {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getProductDetails(id)
      .then((response) => setProduct(response.productDetails))
      .catch((requestError) =>
        setError(
          requestError?.response?.data?.message ||
            'Unable to load product details.'
        )
      )
      .finally(() => setLoading(false));
  }, [id, getProductDetails]);
  console.log(product)
  const approve = async () => {
    try {
      setBusy(true);
      setError('');

      await onApprove(id);

      setProduct((current) => ({
        ...current,
        status: 'approved',
        isActive: true,
      }));
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          'Unable to approve product.'
      );
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
      setError(
        requestError?.response?.data?.message ||
          'Unable to update product availability.'
      );
    } finally {
      setBusy(false);
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingCard}>
        <div style={styles.loadingIcon}>⏳</div>
        <h3 style={styles.loadingTitle}>Loading product details...</h3>
        <p style={styles.loadingText}>
          Please wait while we fetch the product information.
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={styles.emptyCard}>
        <div style={styles.emptyIcon}>📦</div>
        <h2 style={styles.emptyTitle}>Product not found</h2>
        <p style={styles.emptyText}>
          {error || 'The requested product could not be found.'}
        </p>

        <Link to="/admin/products" style={styles.backButton}>
          Back to products
        </Link>
      </div>
    );
  }

  const image = product.images?.[0]?.url;
  const images = product.images || [];
  const vendorName =
    product.vendor?.storeName ||
    product.vendor ||
    'Unknown vendor';

  const statusTone =
    product.status === 'approved' ? 'success' : 'warning';

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <Link to="/admin/products" style={styles.backLink}>
            ← Back to products
          </Link>

          <h1 style={styles.title}>{product.name}</h1>

          <div style={styles.headerMeta}>
            <Badge tone={statusTone}>
              {product.status || 'pending'}
            </Badge>

            {product.status === 'approved' && (
              <span
                style={{
                  ...styles.activeBadge,
                  ...(product.isActive
                    ? styles.activeBadgeGreen
                    : styles.activeBadgeRed),
                }}
              >
                {product.isActive ? 'Active' : 'Inactive'}
              </span>
            )}
          </div>
        </div>

        <div style={styles.headerActions}>
          {product.status === 'pending' && (
            <Button onClick={approve} disabled={busy}>
              {busy ? 'Approving...' : '✓ Approve product'}
            </Button>
          )}

          {product.status === 'approved' && (
            <button
              type="button"
              onClick={toggleActive}
              disabled={busy}
              style={{
                ...styles.actionButton,
                ...(product.isActive
                  ? styles.inactiveButton
                  : styles.activeButton),
                opacity: busy ? 0.6 : 1,
              }}
            >
              {busy
                ? 'Updating...'
                : product.isActive
                ? 'Make inactive'
                : 'Make active'}
            </button>
          )}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div style={styles.errorBox}>
          <span style={styles.errorIcon}>!</span>
          <span>{error}</span>
        </div>
      )}

      {/* Main Content */}
      <div style={styles.contentGrid}>
        {/* Left Side */}
        <div style={styles.leftColumn}>
          {/* Main Image */}
          <div style={styles.card}>
            <div style={styles.sectionHeader}>
              <h2 style={styles.sectionTitle}>Product Images</h2>
              <span style={styles.imageCount}>
                {images.length} {images.length === 1 ? 'image' : 'images'}
              </span>
            </div>

            {image ? (
              <img
                src={image}
                alt={product.name}
                style={styles.mainImage}
              />
            ) : (
              <div style={styles.noImage}>
                <span style={styles.noImageIcon}>🖼️</span>
                <span>No product image available</span>
              </div>
            )}

            {images.length > 1 && (
              <div style={styles.gallery}>
                {images.map((item, index) => (
                  <img
                    key={index}
                    src={item.url}
                    alt={`${product.name} ${index + 1}`}
                    style={styles.galleryImage}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div style={styles.card}>
            <h2 style={styles.sectionTitle}>Description</h2>

            <p style={styles.description}>
              {product.description || 'No description provided.'}
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div style={styles.rightColumn}>
          {/* Product Information */}
          <div style={styles.card}>
            <h2 style={styles.sectionTitle}>Product Information</h2>

            <div style={styles.infoList}>
              <InfoItem
                label="Category"
                value={product.category || 'N/A'}
              />

              <InfoItem
                label="Price"
                value={`$${product.price ?? 0}`}
                highlight
              />

              <InfoItem
                label="Stock"
                value={`${product.quantity ?? 0} units`}
              />

              <InfoItem
                label="Status"
                value={product.status || 'pending'}
              />

              {product.status === 'approved' && (
                <InfoItem
                  label="Availability"
                  value={product.isActive ? 'Active' : 'Inactive'}
                />
              )}
            </div>
          </div>

          {/* Vendor */}
          <div style={styles.card}>
            <h2 style={styles.sectionTitle}>Vendor</h2>

            <div style={styles.vendorCard}>
              <img src={product?.vendor?.storeLogo?.url||""}style={styles.vendorIcon}>
                
              </img>

              <div>
                <div style={styles.vendorName}>Name: {vendorName}</div>

                <div style={styles.vendorLabel}>
                    Description: {product.vendor.storeDescription || "No description provided."}
                </div>
              </div>
            </div>
          </div>

          {/* Status / Actions */}
          <div style={styles.card}>
            <h2 style={styles.sectionTitle}>Product Status</h2>

            <div style={styles.statusBox}>
              <div>
                <div style={styles.statusLabel}>Current status</div>

                <div style={styles.statusValue}>
                  {product.status || 'Pending'}
                </div>
              </div>

              <Badge tone={statusTone}>
                {product.status || 'pending'}
              </Badge>
            </div>

            {product.status === 'pending' && (
              <button
                type="button"
                onClick={approve}
                disabled={busy}
                style={{
                  ...styles.fullButton,
                  ...styles.approveButton,
                  opacity: busy ? 0.6 : 1,
                }}
              >
                {busy ? 'Approving...' : '✓ Approve product'}
              </button>
            )}

            {product.status === 'approved' && (
              <button
                type="button"
                onClick={toggleActive}
                disabled={busy}
                style={{
                  ...styles.fullButton,
                  ...(product.isActive
                    ? styles.inactiveButton
                    : styles.activeButton),
                  opacity: busy ? 0.6 : 1,
                }}
              >
                {busy
                  ? 'Updating...'
                  : product.isActive
                  ? 'Make product inactive'
                  : 'Make product active'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value, highlight = false }) {
  return (
    <div style={styles.infoItem}>
      <span style={styles.infoLabel}>{label}</span>

      <span
        style={{
          ...styles.infoValue,
          ...(highlight ? styles.priceValue : {}),
        }}
      >
        {value}
      </span>
    </div>
  );
}

const styles = {
  page: {
    display: 'grid',
    gap: '1.5rem',
    color: '#0f172a',
  },

  header: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '20px',
    padding: '1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
    flexWrap: 'wrap',
    boxShadow: '0 4px 20px rgba(15, 23, 42, 0.06)',
  },

  backLink: {
    display: 'inline-block',
    color: '#2563eb',
    textDecoration: 'none',
    fontWeight: 700,
    fontSize: '0.9rem',
    marginBottom: '0.7rem',
  },

  title: {
    margin: 0,
    fontSize: 'clamp(1.5rem, 3vw, 2rem)',
    fontWeight: 800,
    color: '#0f172a',
  },

  headerMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.6rem',
    marginTop: '0.8rem',
    flexWrap: 'wrap',
  },

  activeBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0.35rem 0.7rem',
    borderRadius: '999px',
    fontSize: '0.8rem',
    fontWeight: 700,
  },

  activeBadgeGreen: {
    background: '#f0fdf4',
    color: '#16a34a',
    border: '1px solid #bbf7d0',
  },

  activeBadgeRed: {
    background: '#fef2f2',
    color: '#dc2626',
    border: '1px solid #fecaca',
  },

  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.7rem',
  },

  contentGrid: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1.5fr) minmax(280px, 0.8fr)',
    gap: '1.5rem',
    alignItems: 'start',
  },

  leftColumn: {
    display: 'grid',
    gap: '1.5rem',
  },

  rightColumn: {
    display: 'grid',
    gap: '1.5rem',
  },

  card: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '20px',
    padding: '1.25rem',
    boxShadow: '0 4px 20px rgba(15, 23, 42, 0.06)',
  },

  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1rem',
  },

  sectionTitle: {
    margin: 0,
    fontSize: '1.05rem',
    fontWeight: 800,
    color: '#0f172a',
  },

  imageCount: {
    fontSize: '0.8rem',
    color: '#64748b',
    background: '#f1f5f9',
    padding: '0.35rem 0.65rem',
    borderRadius: '999px',
    fontWeight: 600,
  },

  mainImage: {
    width: '100%',
    height: '380px',
    objectFit: 'cover',
    borderRadius: '16px',
    display: 'block',
    background: '#f1f5f9',
  },

  gallery: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
    gap: '0.75rem',
    marginTop: '0.75rem',
  },

  galleryImage: {
    width: '100%',
    height: '110px',
    objectFit: 'cover',
    borderRadius: '12px',
    display: 'block',
    border: '1px solid #e2e8f0',
  },

  noImage: {
    height: '300px',
    borderRadius: '16px',
    background: '#f1f5f9',
    border: '1px dashed #cbd5e1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    color: '#64748b',
    fontWeight: 600,
  },

  noImageIcon: {
    fontSize: '2rem',
  },

  description: {
    margin: '1rem 0 0',
    color: '#475569',
    lineHeight: 1.8,
    whiteSpace: 'pre-wrap',
  },

  infoList: {
    display: 'grid',
    marginTop: '1rem',
  },

  infoItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
    padding: '0.9rem 0',
    borderBottom: '1px solid #e2e8f0',
  },

  infoLabel: {
    color: '#64748b',
    fontSize: '0.9rem',
  },

  infoValue: {
    color: '#0f172a',
    fontWeight: 700,
    textAlign: 'right',
  },

  priceValue: {
    color: '#2563eb',
    fontSize: '1.1rem',
  },

  vendorCard: {
    marginTop: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.8rem',
    padding: '0.9rem',
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '14px',
  },

  vendorIcon: {
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    background: '#eff6ff',
    color: '#2563eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 800,
    fontSize: '1.1rem',
    flexShrink: 0,
  },

  vendorName: {
    fontWeight: 800,
    color: '#0f172a',
  },

  vendorLabel: {
    marginTop: '0.2rem',
    color: '#64748b',
    fontSize: '0.8rem',
  },

  statusBox: {
    marginTop: '1rem',
    padding: '0.9rem',
    borderRadius: '14px',
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
  },

  statusLabel: {
    color: '#64748b',
    fontSize: '0.8rem',
  },

  statusValue: {
    marginTop: '0.2rem',
    color: '#0f172a',
    fontWeight: 800,
    textTransform: 'capitalize',
  },

  fullButton: {
    width: '100%',
    border: 'none',
    borderRadius: '12px',
    padding: '0.8rem 1rem',
    marginTop: '0.9rem',
    fontSize: '0.9rem',
    fontWeight: 800,
    cursor: 'pointer',
    transition: '0.2s ease',
  },

  actionButton: {
    border: 'none',
    borderRadius: '12px',
    padding: '0.75rem 1rem',
    fontSize: '0.9rem',
    fontWeight: 800,
    cursor: 'pointer',
    transition: '0.2s ease',
  },

  approveButton: {
    background: '#2563eb',
    color: '#ffffff',
  },

  activeButton: {
    background: '#16a34a',
    color: '#ffffff',
  },

  inactiveButton: {
    background: '#fef2f2',
    color: '#dc2626',
    border: '1px solid #fecaca',
  },

  errorBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.7rem',
    padding: '0.9rem 1rem',
    borderRadius: '14px',
    background: '#fef2f2',
    border: '1px solid #fecaca',
    color: '#dc2626',
    fontSize: '0.9rem',
    fontWeight: 600,
  },

  errorIcon: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    background: '#dc2626',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 800,
    flexShrink: 0,
  },

  loadingCard: {
    minHeight: '300px',
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '20px',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    boxShadow: '0 4px 20px rgba(15, 23, 42, 0.06)',
  },

  loadingIcon: {
    fontSize: '2rem',
    marginBottom: '0.7rem',
  },

  loadingTitle: {
    margin: 0,
    color: '#0f172a',
  },

  loadingText: {
    color: '#64748b',
    marginBottom: 0,
  },

  emptyCard: {
    minHeight: '300px',
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '20px',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    boxShadow: '0 4px 20px rgba(15, 23, 42, 0.06)',
  },

  emptyIcon: {
    fontSize: '2.5rem',
    marginBottom: '0.8rem',
  },

  emptyTitle: {
    margin: 0,
    color: '#0f172a',
  },

  emptyText: {
    color: '#64748b',
    margin: '0.5rem 0 1.2rem',
  },

  backButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.7rem 1rem',
    borderRadius: '10px',
    background: '#2563eb',
    color: '#ffffff',
    textDecoration: 'none',
    fontWeight: 700,
  },
};
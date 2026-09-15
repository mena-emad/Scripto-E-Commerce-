import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Badge from '../../../components/ui/Badge';

export default function AdminVendorDetailPage({
  getVendorDetails,
  onApprove,
  onToggleBlock,
}) {
  const { id } = useParams();

  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getVendorDetails(id)
      .then((response) => setVendor(response.vendorDetails))
      .catch((requestError) =>
        setError(
          requestError?.response?.data?.message ||
            'Unable to load vendor details.'
        )
      )
      .finally(() => setLoading(false));
  }, [id, getVendorDetails]);

  const approve = async () => {
    try {
      setBusy(true);
      setError('');

      await onApprove(id);

      setVendor((current) => ({
        ...current,
        isApproved: true,
      }));
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          'Unable to approve vendor.'
      );
    } finally {
      setBusy(false);
    }
  };

  const toggleBlock = async () => {
    try {
      setBusy(true);
      setError('');

      await onToggleBlock(vendor.owner._id);

      setVendor((current) => ({
        ...current,
        owner: {
          ...current.owner,
          isBlocked: !current.owner.isBlocked,
        },
      }));
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          'Unable to update vendor account.'
      );
    } finally {
      setBusy(false);
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingCard}>
        <div style={styles.loadingIcon}>⏳</div>

        <h2 style={styles.loadingTitle}>Loading vendor details...</h2>

        <p style={styles.loadingText}>
          Please wait while we fetch the vendor information.
        </p>
      </div>
    );
  }

  if (!vendor) {
    return (
      <div style={styles.emptyCard}>
        <div style={styles.emptyIcon}>!</div>

        <h2 style={styles.emptyTitle}>Vendor not found</h2>

        <p style={styles.emptyText}>
          {error || 'The requested vendor could not be found.'}
        </p>

        <Link to="/admin/vendors" style={styles.backButton}>
          Back to vendors
        </Link>
      </div>
    );
  }

  const logo = vendor.storeLogo?.url || vendor.storeLogo;

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <Link to="/admin/vendors" style={styles.backLink}>
            ← Back to vendors
          </Link>

          <h1 style={styles.title}>{vendor.storeName}</h1>

          <p style={styles.subtitle}>
            Manage vendor information, approval status, and account access.
          </p>
        </div>

        <div style={styles.headerBadges}>
          <Badge tone={vendor.isApproved ? 'success' : 'warning'}>
            {vendor.isApproved ? 'Approved' : 'Pending'}
          </Badge>

          <span
            style={{
              ...styles.statusBadge,
              backgroundColor: vendor.owner?.isBlocked
                ? '#fef2f2'
                : '#f0fdf4',
              color: vendor.owner?.isBlocked
                ? '#dc2626'
                : '#16a34a',
              borderColor: vendor.owner?.isBlocked
                ? '#fecaca'
                : '#bbf7d0',
            }}
          >
            {vendor.owner?.isBlocked ? 'Blocked' : 'Active'}
          </span>
        </div>
      </div>

      {error && (
        <div style={styles.errorBox}>
          <span style={styles.errorIcon}>!</span>

          <div>
            <strong style={styles.errorTitle}>Something went wrong</strong>
            <p style={styles.errorText}>{error}</p>
          </div>
        </div>
      )}

      {/* Main content */}
      <div style={styles.contentGrid}>
        {/* Left */}
        <div style={styles.leftColumn}>
          {/* Store image */}
          <section style={styles.card}>
            <div style={styles.sectionHeader}>
              <div>
                <h2 style={styles.sectionTitle}>Store</h2>
                <p style={styles.sectionSubtitle}>
                  Vendor storefront information
                </p>
              </div>
            </div>

            {logo ? (
              <img
                src={logo}
                alt={vendor.storeName}
                style={styles.logo}
              />
            ) : (
              <div style={styles.noLogo}>
                <span style={styles.noLogoIcon}>🏪</span>
                <span>No store logo available</span>
              </div>
            )}

            <div style={styles.storeInfo}>
              <h2 style={styles.storeName}>{vendor.storeName}</h2>

              <p style={styles.description}>
                {vendor.storeDescription || 'No store description provided.'}
              </p>
            </div>
          </section>

          {/* Store details */}
          <section style={styles.card}>
            <div style={styles.sectionHeader}>
              <div>
                <h2 style={styles.sectionTitle}>Store Details</h2>
                <p style={styles.sectionSubtitle}>
                  Contact and location information
                </p>
              </div>
            </div>

            <div style={styles.infoGrid}>
              <InfoItem
                icon="📍"
                label="Address"
                value={vendor.storeAdress || 'Not provided'}
              />

              <InfoItem
                icon="📞"
                label="Phone"
                value={vendor.storePhone || 'Not provided'}
              />
            </div>
          </section>
        </div>

        {/* Right */}
        <div style={styles.rightColumn}>
          {/* Owner */}
          <section style={styles.card}>
            <div style={styles.sectionHeader}>
              <div>
                <h2 style={styles.sectionTitle}>Owner</h2>
                <p style={styles.sectionSubtitle}>
                  Vendor account information
                </p>
              </div>
            </div>

            <div style={styles.ownerCard}>
              <img src={vendor.storeLogo.url} style={styles.avatar}>

              </img>

              <div style={styles.ownerInfo}>
                <h3 style={styles.ownerName}>
                  {vendor.owner?.name || 'Unknown'}
                </h3>

                <p style={styles.ownerEmail}>
                  {vendor.owner?.email || 'No email'}
                </p>
              </div>
            </div>

            <div style={styles.accountStatus}>
              <span style={styles.accountLabel}>Account status</span>

              <span
                style={{
                  ...styles.accountStatusBadge,
                  backgroundColor: vendor.owner?.isBlocked
                    ? '#fef2f2'
                    : '#f0fdf4',
                  color: vendor.owner?.isBlocked
                    ? '#dc2626'
                    : '#16a34a',
                  borderColor: vendor.owner?.isBlocked
                    ? '#fecaca'
                    : '#bbf7d0',
                }}
              >
                {vendor.owner?.isBlocked ? 'Blocked' : 'Active'}
              </span>
            </div>
          </section>

          {/* Approval */}
          <section style={styles.card}>
            <div style={styles.sectionHeader}>
              <div>
                <h2 style={styles.sectionTitle}>Vendor Status</h2>
                <p style={styles.sectionSubtitle}>
                  Approval and account management
                </p>
              </div>
            </div>

            <div style={styles.statusRow}>
              <div>
                <span style={styles.statusLabel}>Approval status</span>

                <div style={styles.statusValue}>
                  <Badge tone={vendor.isApproved ? 'success' : 'warning'}>
                    {vendor.isApproved ? 'Approved' : 'Pending'}
                  </Badge>
                </div>
              </div>
            </div>

            <div style={styles.divider} />

            <div style={styles.actions}>
              {!vendor.isApproved && (
                <Button onClick={approve} disabled={busy}>
                  {busy ? 'Approving...' : 'Approve Vendor'}
                </Button>
              )}

              {vendor.owner?._id && (
                <button
                  type="button"
                  onClick={toggleBlock}
                  disabled={busy}
                  style={{
                    ...styles.blockButton,
                    opacity: busy ? 0.6 : 1,
                    cursor: busy ? 'not-allowed' : 'pointer',
                  }}
                >
                  {busy
                    ? 'Updating...'
                    : vendor.owner.isBlocked
                    ? 'Unblock Vendor'
                    : 'Block Vendor'}
                </button>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div style={styles.infoItem}>
      <div style={styles.infoIcon}>{icon}</div>

      <div>
        <span style={styles.infoLabel}>{label}</span>
        <p style={styles.infoValue}>{value}</p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    width: '100%',
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '1.5rem',
    color: '#f8fafc',
  },

  loadingCard: {
    minHeight: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '20px',
    padding: '2rem',
    textAlign: 'center',
    color: '#f8fafc',
  },

  loadingIcon: {
    width: '56px',
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '16px',
    backgroundColor: '#172554',
    fontSize: '24px',
    marginBottom: '1rem',
  },

  loadingTitle: {
    margin: 0,
    fontSize: '1.25rem',
  },

  loadingText: {
    margin: '0.5rem 0 0',
    color: '#94a3b8',
  },

  emptyCard: {
    minHeight: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '20px',
    padding: '2rem',
    textAlign: 'center',
    color: '#f8fafc',
  },

  emptyIcon: {
    width: '56px',
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    backgroundColor: '#450a0a',
    border: '1px solid #7f1d1d',
    color: '#ef4444',
    fontSize: '1.5rem',
    fontWeight: 800,
    marginBottom: '1rem',
  },

  emptyTitle: {
    margin: 0,
  },

  emptyText: {
    color: '#94a3b8',
    margin: '0.5rem 0 1.25rem',
  },

  backButton: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.7rem 1rem',
    borderRadius: '10px',
    backgroundColor: '#2563eb',
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 700,
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '1rem',
    marginBottom: '1.5rem',
  },

  backLink: {
    display: 'inline-block',
    color: '#60a5fa',
    textDecoration: 'none',
    fontWeight: 700,
    marginBottom: '0.75rem',
  },

  title: {
    margin: 0,
    fontSize: '2rem',
    fontWeight: 800,
    color: '#f8fafc',
  },

  subtitle: {
    margin: '0.4rem 0 0',
    color: '#94a3b8',
    lineHeight: 1.6,
  },

  headerBadges: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    flexWrap: 'wrap',
  },

  statusBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.45rem 0.75rem',
    border: '1px solid',
    borderRadius: '999px',
    fontSize: '0.8rem',
    fontWeight: 700,
  },

  errorBox: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.75rem',
    padding: '1rem',
    marginBottom: '1.5rem',
    backgroundColor: '#450a0a',
    border: '1px solid #7f1d1d',
    borderRadius: '14px',
  },

  errorIcon: {
    width: '28px',
    height: '28px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    borderRadius: '50%',
    backgroundColor: '#7f1d1d',
    color: '#fff',
    fontWeight: 800,
  },

  errorTitle: {
    color: '#fecaca',
  },

  errorText: {
    margin: '0.25rem 0 0',
    color: '#fca5a5',
  },

  contentGrid: {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1.5fr) minmax(320px, 0.9fr)',
    gap: '1.25rem',
    alignItems: 'start',
  },

  leftColumn: {
    display: 'grid',
    gap: '1.25rem',
  },

  rightColumn: {
    display: 'grid',
    gap: '1.25rem',
  },

  card: {
    backgroundColor: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '20px',
    padding: '1.25rem',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.12)',
  },

  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '1rem',
    marginBottom: '1rem',
  },

  sectionTitle: {
    margin: 0,
    color: '#f8fafc',
    fontSize: '1.15rem',
    fontWeight: 800,
  },

  sectionSubtitle: {
    margin: '0.3rem 0 0',
    color: '#94a3b8',
    fontSize: '0.9rem',
  },

  logo: {
    width: '100%',
    height: '320px',
    objectFit: 'cover',
    borderRadius: '16px',
    border: '1px solid #334155',
    display: 'block',
    backgroundColor: '#111827',
  },

  noLogo: {
    height: '240px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    borderRadius: '16px',
    border: '1px dashed #475569',
    backgroundColor: '#111827',
    color: '#94a3b8',
  },

  noLogoIcon: {
    fontSize: '2rem',
  },

  storeInfo: {
    marginTop: '1rem',
  },

  storeName: {
    margin: 0,
    color: '#f8fafc',
    fontSize: '1.4rem',
  },

  description: {
    margin: '0.5rem 0 0',
    color: '#cbd5e1',
    lineHeight: 1.7,
  },

  infoGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '0.75rem',
  },

  infoItem: {
    display: 'flex',
    gap: '0.75rem',
    alignItems: 'flex-start',
    padding: '0.9rem',
    borderRadius: '14px',
    backgroundColor: '#111827',
    border: '1px solid #334155',
  },

  infoIcon: {
    width: '38px',
    height: '38px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    borderRadius: '10px',
    backgroundColor: '#172554',
    fontSize: '1rem',
  },

  infoLabel: {
    display: 'block',
    color: '#94a3b8',
    fontSize: '0.8rem',
    marginBottom: '0.2rem',
  },

  infoValue: {
    margin: 0,
    color: '#f8fafc',
    fontWeight: 600,
    lineHeight: 1.5,
  },

  ownerCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.85rem',
    padding: '1rem',
    backgroundColor: '#111827',
    border: '1px solid #334155',
    borderRadius: '14px',
  },

  avatar: {
    width: '48px',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    borderRadius: '50%',
    backgroundColor: '#2563eb',
    color: '#fff',
    fontSize: '1.1rem',
    fontWeight: 800,
  },

  ownerInfo: {
    minWidth: 0,
  },

  ownerName: {
    margin: 0,
    color: '#f8fafc',
    fontSize: '1rem',
  },

  ownerEmail: {
    margin: '0.2rem 0 0',
    color: '#94a3b8',
    fontSize: '0.9rem',
    wordBreak: 'break-word',
  },

  accountStatus: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
    marginTop: '0.75rem',
    padding: '0.85rem 1rem',
    borderRadius: '12px',
    backgroundColor: '#111827',
    border: '1px solid #334155',
  },

  accountLabel: {
    color: '#cbd5e1',
    fontWeight: 600,
  },

  accountStatusBadge: {
    padding: '0.35rem 0.65rem',
    border: '1px solid',
    borderRadius: '999px',
    fontSize: '0.75rem',
    fontWeight: 700,
  },

  statusRow: {
    padding: '0.25rem 0',
  },

  statusLabel: {
    display: 'block',
    color: '#94a3b8',
    fontSize: '0.85rem',
    marginBottom: '0.5rem',
  },

  statusValue: {
    display: 'flex',
    alignItems: 'center',
  },

  divider: {
    height: '1px',
    backgroundColor: '#334155',
    margin: '1rem 0',
  },

  actions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.7rem',
  },

  blockButton: {
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: '10px',
    border: '1px solid #475569',
    backgroundColor: '#111827',
    color: '#f8fafc',
    fontSize: '0.9rem',
    fontWeight: 700,
  },
};
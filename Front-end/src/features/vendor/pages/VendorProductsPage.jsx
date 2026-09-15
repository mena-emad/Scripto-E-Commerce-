import { useState } from 'react';

const initialForm = {
  name: '',
  quantity: '',
  price: '',
  description: '',
  category: '',
  productImage: [],
};

const styles = {
  container: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '20px',
    padding: '1.5rem',
    boxShadow: '0 10px 30px rgba(15, 23, 42, 0.05)',
  },

  header: {
    marginBottom: '1.5rem',
  },

  title: {
    margin: 0,
    color: '#0f172a',
    fontSize: '1.5rem',
    fontWeight: 800,
  },

  subtitle: {
    margin: '0.4rem 0 0',
    color: '#64748b',
    fontSize: '0.9rem',
  },

  alert: {
    padding: '0.85rem 1rem',
    borderRadius: '10px',
    marginBottom: '1rem',
    fontSize: '0.9rem',
    lineHeight: 1.5,
  },

  accessAlert: {
    background: '#fffbeb',
    border: '1px solid #fde68a',
    color: '#92400e',
  },

  errorAlert: {
    background: '#fef2f2',
    border: '1px solid #fecaca',
    color: '#b91c1c',
  },

  formCard: {
    padding: '1.25rem',
    marginBottom: '1.5rem',
    background: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '16px',
  },

  formTitle: {
    margin: '0 0 1rem',
    color: '#0f172a',
    fontSize: '1rem',
    fontWeight: 800,
  },

  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '0.85rem',
  },

  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.4rem',
  },

  fullWidth: {
    gridColumn: '1 / -1',
  },

  label: {
    color: '#334155',
    fontSize: '0.82rem',
    fontWeight: 700,
  },

  input: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '0.75rem 0.85rem',
    border: '1px solid #cbd5e1',
    borderRadius: '10px',
    background: '#ffffff',
    color: '#0f172a',
    fontSize: '0.9rem',
    outline: 'none',
  },

  textarea: {
    width: '100%',
    minHeight: '100px',
    boxSizing: 'border-box',
    padding: '0.75rem 0.85rem',
    border: '1px solid #cbd5e1',
    borderRadius: '10px',
    background: '#ffffff',
    color: '#0f172a',
    fontSize: '0.9rem',
    resize: 'vertical',
    outline: 'none',
    fontFamily: 'inherit',
  },

  fileInput: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '0.65rem',
    border: '1px dashed #94a3b8',
    borderRadius: '10px',
    background: '#ffffff',
    color: '#475569',
    fontSize: '0.85rem',
    cursor: 'pointer',
  },

  primaryButton: {
    border: 0,
    borderRadius: '10px',
    padding: '0.75rem 1.1rem',
    background: '#1d4ed8',
    color: '#ffffff',
    fontWeight: 700,
    cursor: 'pointer',
  },

  secondaryButton: {
    border: '1px solid #cbd5e1',
    borderRadius: '10px',
    padding: '0.7rem 1rem',
    background: '#ffffff',
    color: '#334155',
    fontWeight: 700,
    cursor: 'pointer',
  },

  dangerButton: {
    border: '1px solid #fecaca',
    borderRadius: '10px',
    padding: '0.7rem 1rem',
    background: '#fef2f2',
    color: '#dc2626',
    fontWeight: 700,
    cursor: 'pointer',
  },

  detailsLink: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.7rem 1rem',
    borderRadius: '10px',
    background: '#eff6ff',
    color: '#1d4ed8',
    fontWeight: 700,
    fontSize: '0.85rem',
    textDecoration: 'none',
  },

  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '1rem',
  },

  productCard: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '16px',
    padding: '1rem',
    boxShadow: '0 5px 18px rgba(15, 23, 42, 0.04)',
  },

  productName: {
    margin: 0,
    color: '#0f172a',
    fontSize: '1.05rem',
    fontWeight: 800,
  },

  category: {
    display: 'inline-flex',
    marginTop: '0.55rem',
    padding: '0.3rem 0.6rem',
    borderRadius: '999px',
    background: '#f1f5f9',
    color: '#475569',
    fontSize: '0.75rem',
    fontWeight: 700,
  },

  vendor: {
    marginTop: '0.8rem',
    color: '#64748b',
    fontSize: '0.82rem',
  },

  productMeta: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '0.75rem',
    marginTop: '1rem',
    paddingTop: '1rem',
    borderTop: '1px solid #f1f5f9',
  },

  price: {
    color: '#0f172a',
    fontSize: '1.05rem',
    fontWeight: 800,
  },

  status: {
    padding: '0.3rem 0.6rem',
    borderRadius: '999px',
    background: '#fef3c7',
    color: '#92400e',
    fontSize: '0.72rem',
    fontWeight: 800,
    textTransform: 'capitalize',
  },

  actions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginTop: '0.85rem',
  },

  editForm: {
    display: 'grid',
    gap: '0.75rem',
  },

  editActions: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
  },

  emptyState: {
    gridColumn: '1 / -1',
    padding: '2.5rem 1rem',
    textAlign: 'center',
    border: '1px dashed #cbd5e1',
    borderRadius: '14px',
    color: '#64748b',
    background: '#f8fafc',
  },
};

export default function VendorProductsPage({
  products,
  onCreate,
  onUpdate,
  onDelete,
  accessError,
}) {
  const vendorProducts = products || [];

  const [form, setForm] = useState(initialForm);

  const [editingId, setEditingId] = useState('');

  const [editForm, setEditForm] = useState(initialForm);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');

  const submit = async (event) => {
    event.preventDefault();

    const payload = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      if (key === 'productImage') {
        Array.from(value || []).forEach((file) => {
          payload.append('productImage', file);
        });
      } else {
        payload.append(key, value);
      }
    });

    try {
      setLoading(true);
      setError('');

      await onCreate(payload);

      setForm(initialForm);

      event.target.reset();
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          'Unable to create product.'
      );
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    try {
      setLoading(true);
      setError('');

      await onDelete(id);
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          'Unable to delete product.'
      );
    } finally {
      setLoading(false);
    }
  };

  const startEditing = (product) => {
    setEditingId(product._id || product.id);

    setEditForm({
      name: product.name || '',
      quantity: product.quantity ?? '',
      price: product.price ?? '',
      description: product.description || '',
      category: product.category || '',
      productImage: [],
    });

    setError('');
  };

  const saveEdit = async (event, id) => {
    event.preventDefault();

    const payload = new FormData();

    Object.entries(editForm).forEach(([key, value]) => {
      if (key === 'productImage') {
        Array.from(value || []).forEach((file) => {
          payload.append('productImage', file);
        });
      } else {
        payload.append(key, value);
      }
    });

    try {
      setLoading(true);
      setError('');

      await onUpdate(id, payload);

      setEditingId('');
    } catch (requestError) {
      setError(
        requestError?.response?.data?.message ||
          'Unable to update product.'
      );
    } finally {
      setLoading(false);
    }
  };

  const renderInput = (
    field,
    values,
    setValues
  ) => {
    const isNumber =
      field === 'quantity' || field === 'price';

    const labels = {
      name: 'Product name',
      quantity: 'Quantity',
      price: 'Price',
      category: 'Category',
      description: 'Description',
    };

    const isDescription =
      field === 'description';

    return (
      <div
        key={field}
        style={
          isDescription
            ? {
                ...styles.fieldGroup,
                ...styles.fullWidth,
              }
            : styles.fieldGroup
        }
      >
        <label style={styles.label}>
          {labels[field]}
        </label>

        {isDescription ? (
          <textarea
            required
            placeholder="Enter product description"
            value={values[field]}
            onChange={(event) =>
              setValues({
                ...values,
                [field]: event.target.value,
              })
            }
            style={styles.textarea}
          />
        ) : (
          <input
            required
            placeholder={`Enter ${labels[
              field
            ].toLowerCase()}`}
            type={isNumber ? 'number' : 'text'}
            min={isNumber ? 0 : undefined}
            value={values[field]}
            onChange={(event) =>
              setValues({
                ...values,
                [field]: event.target.value,
              })
            }
            style={styles.input}
          />
        )}
      </div>
    );
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.title}>
          My Products
        </h2>

        <p style={styles.subtitle}>
          Create, manage and update your products.
        </p>
      </div>

      {/* Access Error */}
      {accessError && (
        <div
          style={{
            ...styles.alert,
            ...styles.accessAlert,
          }}
        >
          <strong>
            Product management unavailable
          </strong>

          <div style={{ marginTop: '0.25rem' }}>
            {accessError}
          </div>

          <div style={{ marginTop: '0.25rem' }}>
            Product management will be available
            after admin approval.
          </div>
        </div>
      )}

      {!accessError && (
        <>
          {/* General Error */}
          {error && (
            <div
              style={{
                ...styles.alert,
                ...styles.errorAlert,
              }}
              role="alert"
            >
              {error}
            </div>
          )}

          {/* Create Product */}
          <form
            onSubmit={submit}
            style={styles.formCard}
          >
            <h3 style={styles.formTitle}>
              Add new product
            </h3>

            <div style={styles.formGrid}>
              {[
                'name',
                'quantity',
                'price',
                'category',
                'description',
              ].map((field) =>
                renderInput(
                  field,
                  form,
                  setForm
                )
              )}

              <div
                style={{
                  ...styles.fieldGroup,
                  ...styles.fullWidth,
                }}
              >
                <label style={styles.label}>
                  Product photos
                </label>

                <input
                  required
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(event) =>
                    setForm({
                      ...form,
                      productImage:
                        event.target.files,
                    })
                  }
                  style={styles.fileInput}
                />
              </div>

              <div style={styles.fullWidth}>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    ...styles.primaryButton,
                    opacity: loading ? 0.6 : 1,
                  }}
                >
                  {loading
                    ? 'Saving...'
                    : 'Create product'}
                </button>
              </div>
            </div>
          </form>

          {/* Products */}
          <div style={styles.productsGrid}>
            {vendorProducts.length === 0 ? (
              <div style={styles.emptyState}>
                <div
                  style={{
                    fontSize: '2rem',
                    marginBottom: '0.5rem',
                  }}
                >
                  📦
                </div>

                <strong
                  style={{ color: '#334155' }}
                >
                  No products yet
                </strong>

                <div
                  style={{
                    marginTop: '0.3rem',
                    fontSize: '0.85rem',
                  }}
                >
                  Create your first product using
                  the form above.
                </div>
              </div>
            ) : (
              vendorProducts.map((product) => {
                const productId =
                  product._id || product.id;

                return (
                  <div
                    key={productId}
                    style={styles.productCard}
                  >
                    {editingId === productId ? (
                      /* Edit Mode */
                      <form
                        onSubmit={(event) =>
                          saveEdit(
                            event,
                            productId
                          )
                        }
                        style={styles.editForm}
                      >
                        <h3
                          style={{
                            ...styles.productName,
                            marginBottom: '0.25rem',
                          }}
                        >
                          Edit product
                        </h3>

                        {[
                          'name',
                          'quantity',
                          'price',
                          'category',
                          'description',
                        ].map((field) =>
                          renderInput(
                            field,
                            editForm,
                            setEditForm
                          )
                        )}

                        <div
                          style={
                            styles.fieldGroup
                          }
                        >
                          <label
                            style={styles.label}
                          >
                            Replace photos
                            <span
                              style={{
                                marginLeft:
                                  '0.3rem',
                                color:
                                  '#94a3b8',
                                fontWeight:
                                  400,
                              }}
                            >
                              (optional)
                            </span>
                          </label>

                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(
                              event
                            ) =>
                              setEditForm({
                                ...editForm,
                                productImage:
                                  event.target
                                    .files,
                              })
                            }
                            style={
                              styles.fileInput
                            }
                          />
                        </div>

                        <div
                          style={
                            styles.editActions
                          }
                        >
                          <button
                            type="submit"
                            disabled={loading}
                            style={{
                              ...styles.primaryButton,
                              opacity:
                                loading
                                  ? 0.6
                                  : 1,
                            }}
                          >
                            {loading
                              ? 'Saving...'
                              : 'Save changes'}
                          </button>

                          <button
                            type="button"
                            disabled={loading}
                            onClick={() =>
                              setEditingId('')
                            }
                            style={
                              styles.secondaryButton
                            }
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      /* View Mode */
                      <>
                        <h3
                          style={
                            styles.productName
                          }
                        >
                          {product.name}
                        </h3>

                        <span
                          style={styles.category}
                        >
                          {product.category ||
                            'Uncategorized'}
                        </span>

                        <div
                          style={styles.vendor}
                        >
                          <strong
                            style={{
                              color:
                                '#475569',
                            }}
                          >
                            Vendor:
                          </strong>{' '}
                          {product.vendor
                            ?.storeName ||
                            product.vendor
                              ?.name ||
                            product.vendor ||
                            'My store'}
                        </div>

                        <div
                          style={
                            styles.productMeta
                          }
                        >
                          <span
                            style={
                              styles.price
                            }
                          >
                            ${product.price}
                          </span>

                          <span
                            style={
                              styles.status
                            }
                          >
                            {product.status ||
                              'pending'}
                          </span>
                        </div>

                        <div
                          style={styles.actions}
                        >
                          <a
                            href={`/products/${productId}`}
                            style={
                              styles.detailsLink
                            }
                          >
                            Details
                          </a>

                          <button
                            type="button"
                            disabled={loading}
                            onClick={() =>
                              startEditing(
                                product
                              )
                            }
                            style={
                              styles.secondaryButton
                            }
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            disabled={loading}
                            onClick={() =>
                              remove(productId)
                            }
                            style={
                              styles.dangerButton
                            }
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </>
      )}
    </div>
  );
}

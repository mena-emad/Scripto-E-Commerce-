import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import useAuth from '../../../hooks/auth/useAuth';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const styles = {
  wrapper: {
    minHeight: '78vh',
    width: '100%',
    display: 'grid',
    placeItems: 'center',
    boxSizing: 'border-box',
    padding: '1rem 0',
    minWidth: 0,
  },

  card: {
    width: '100%',
    maxWidth: '620px',
    background: '#fff',
    border: '1px solid #e2e8f0',
    borderRadius: '22px',
    boxShadow: '0 15px 35px rgba(15, 23, 42, 0.08)',
    padding: '2rem',
    boxSizing: 'border-box',
    minWidth: 0,
  },

  header: {
    fontSize: '2rem',
    margin: '0 0 0.5rem',
    textAlign: 'center',
    color: '#0f172a',
  },

  subtitle: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#64748b',
    lineHeight: 1.5,
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '1rem',
    minWidth: 0,
  },

  full: {
    gridColumn: '1 / -1',
    minWidth: 0,
  },

  strength: {
    fontWeight: 700,
    color: '#1d4ed8',
    overflowWrap: 'anywhere',
  },

  smallLink: {
    color: '#1d4ed8',
    fontWeight: 700,
  },

  imageUpload: {
    border: '1px dashed #cbd5e1',
    borderRadius: '12px',
    padding: '1rem',
    background: '#f8fafc',
    boxSizing: 'border-box',
    minWidth: 0,
  },

  imagePreview: {
    width: '90px',
    height: '90px',
    objectFit: 'cover',
    borderRadius: '12px',
    border: '1px solid #e2e8f0',
    flexShrink: 0,
  },

  select: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '0.8rem 0.9rem',
    borderRadius: '10px',
    border: '1px solid #cbd5e1',
    background: '#fff',
    color: '#0f172a',
    minWidth: 0,
  },

  checkboxRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    minWidth: 0,
  },

  error: {
    color: '#dc2626',
    marginTop: '0.35rem',
    fontWeight: 600,
    fontSize: '0.85rem',
    overflowWrap: 'anywhere',
  },
};

function passwordStrength(password) {
  if (!password) return 'None';

  if (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /\d/.test(password) &&
    /[^A-Za-z0-9]/.test(password)
  ) {
    return 'Strong';
  }

  if (password.length >= 6) return 'Medium';

  return 'Weak';
}

export default function RegisterPage({ onRegister }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
    profileImage: null,
    storeAdress: '',
    storePhone: '',
    storeDescription: '',
    acceptTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const { signup } = useAuth();

  const validate = () => {
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = 'Name is required';
    }

    if (!form.email.trim()) {
      nextErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      nextErrors.email = 'Enter a valid email';
    }

    if (!form.password) {
      nextErrors.password = 'Password is required';
    } else if (passwordStrength(form.password) === 'Weak') {
      nextErrors.password =
        'Use at least 8 chars with uppercase, lowercase, number, and symbol';
    }

    if (!form.confirmPassword) {
      nextErrors.confirmPassword = 'Confirm password is required';
    } else if (form.confirmPassword !== form.password) {
      nextErrors.confirmPassword = 'Passwords do not match';
    }

    // Profile image is required
    if (!form.profileImage) {
      nextErrors.profileImage = 'Profile picture is required';
    }

    if (form.role === 'vendor') {
      if (!form.storeAdress.trim()) {
        nextErrors.storeAdress = 'Store address is required';
      }

      if (!form.storePhone.trim()) {
        nextErrors.storePhone = 'Store phone is required';
      }

      if (!form.storeDescription.trim()) {
        nextErrors.storeDescription =
          'Store description is required';
      }
    }

    if (!form.acceptTerms) {
      nextErrors.acceptTerms =
        'Please accept the terms and conditions';
    }

    return nextErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nextErrors = validate();

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);

    try {
      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        if (value !== null && value !== '') {
          formData.append(key, value);
        }
      });

      const newUser = await signup(formData);

      onRegister(newUser);

      navigate('/verify', {
        state: {
          email: form.email,
        },
      });
    } catch (error) {
      setErrors({
        form:
          error?.response?.data?.message ||
          'Unable to create your account.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      setForm((prev) => ({
        ...prev,
        profileImage: null,
      }));

      setImagePreview(null);

      setErrors((prev) => ({
        ...prev,
        profileImage: 'Profile picture is required',
      }));

      return;
    }

    if (!file.type.startsWith('image/')) {
      setForm((prev) => ({
        ...prev,
        profileImage: null,
      }));

      setImagePreview(null);

      setErrors((prev) => ({
        ...prev,
        profileImage: 'Please select a valid image.',
      }));

      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setForm((prev) => ({
        ...prev,
        profileImage: null,
      }));

      setImagePreview(null);

      setErrors((prev) => ({
        ...prev,
        profileImage: 'Image size must not exceed 5MB.',
      }));

      return;
    }

    setForm((prev) => ({
      ...prev,
      profileImage: file,
    }));

    setImagePreview(URL.createObjectURL(file));

    setErrors((prev) => ({
      ...prev,
      profileImage: '',
    }));
  };

  return (
    <>
      <div style={styles.wrapper}>
        <div
          style={styles.card}
          className="register-card"
        >
          <h1 style={styles.header}>
            Create account
          </h1>

          <p style={styles.subtitle}>
            Register as a customer or a vendor
          </p>

          {errors.form && (
            <div
              style={{
                ...styles.error,
                marginBottom: '1rem',
              }}
            >
              {errors.form}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={styles.grid}>

              {/* Full Name */}
              <div style={styles.full}>
                <Input
                  label="Full name"
                  name="name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  error={errors.name}
                  required
                />
              </div>

              {/* Profile Image */}
              <div style={styles.full}>
                <label
                  htmlFor="profileImage"
                  style={{
                    display: 'block',
                    fontWeight: 600,
                    marginBottom: '0.5rem',
                  }}
                >
                  Profile picture
                  <span style={{ color: '#dc2626' }}>
                    {' '}*
                  </span>
                </label>

                <div
                  style={{
                    ...styles.imageUpload,
                    borderColor: errors.profileImage
                      ? '#dc2626'
                      : '#cbd5e1',
                  }}
                >
                  <input
                    id="profileImage"
                    name="profileImage"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                    style={{
                      width: '100%',
                      maxWidth: '100%',
                      fontSize: '0.9rem',
                      boxSizing: 'border-box',
                    }}
                  />

                  {imagePreview && (
                    <div
                      className="image-preview-row"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        marginTop: '1rem',
                        minWidth: 0,
                      }}
                    >
                      <img
                        src={imagePreview}
                        alt="Selected profile"
                        style={styles.imagePreview}
                      />

                      <span
                        style={{
                          fontSize: '0.85rem',
                          color: '#64748b',
                          overflowWrap: 'anywhere',
                          minWidth: 0,
                        }}
                      >
                        {form.profileImage?.name}
                      </span>
                    </div>
                  )}

                  <p
                    style={{
                      fontSize: '0.8rem',
                      color: '#64748b',
                      margin: '0.5rem 0 0',
                      lineHeight: 1.5,
                    }}
                  >
                    JPG, PNG or other image formats.
                    Maximum size: 5MB.
                  </p>
                </div>

                {errors.profileImage && (
                  <div style={styles.error}>
                    {errors.profileImage}
                  </div>
                )}
              </div>

              {/* Email */}
              <div style={styles.full}>
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      email: e.target.value,
                    })
                  }
                  error={errors.email}
                  required
                />
              </div>

              {/* Password */}
              <div className="register-password-field">
                <Input
                  label="Password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      password: e.target.value,
                    })
                  }
                  error={errors.password}
                  required
                />
              </div>

              {/* Confirm Password */}
              <div className="register-password-field">
                <Input
                  label="Confirm password"
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={form.confirmPassword}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      confirmPassword: e.target.value,
                    })
                  }
                  error={errors.confirmPassword}
                  required
                />
              </div>

              {/* Role */}
              <div style={styles.full}>
                <label
                  style={{
                    display: 'block',
                    fontWeight: 600,
                    marginBottom: '0.4rem',
                  }}
                >
                  Role
                </label>

                <select
                  value={form.role}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      role: e.target.value,
                    })
                  }
                  style={styles.select}
                >
                  <option value="user">
                    Customer
                  </option>

                  <option value="vendor">
                    Vendor
                  </option>
                </select>
              </div>

              {/* Vendor Fields */}
              {form.role === 'vendor' && (
                <>
                  <div style={styles.full}>
                    <Input
                      label="Store address"
                      name="storeAdress"
                      value={form.storeAdress}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          storeAdress: e.target.value,
                        })
                      }
                      error={errors.storeAdress}
                      required
                    />
                  </div>

                  <div className="vendor-field">
                    <Input
                      label="Store phone"
                      name="storePhone"
                      value={form.storePhone}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          storePhone: e.target.value,
                        })
                      }
                      error={errors.storePhone}
                      required
                    />
                  </div>

                  <div className="vendor-field">
                    <Input
                      label="Store description"
                      name="storeDescription"
                      value={form.storeDescription}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          storeDescription: e.target.value,
                        })
                      }
                      error={errors.storeDescription}
                      required
                    />
                  </div>
                </>
              )}

              {/* Password Strength */}
              <div
                style={{
                  ...styles.full,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '1rem',
                  minWidth: 0,
                }}
                className="password-options"
              >
                <div style={styles.strength}>
                  Password strength:{' '}
                  {passwordStrength(form.password)}
                </div>

                <label
                  style={styles.checkboxRow}
                  className="show-password"
                >
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={() =>
                      setShowPassword((prev) => !prev)
                    }
                  />

                  <span>Show</span>
                </label>
              </div>

              {/* Terms */}
              <div style={styles.full}>
                <label
                  style={styles.checkboxRow}
                  className="terms-label"
                >
                  <input
                    type="checkbox"
                    checked={form.acceptTerms}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        acceptTerms: e.target.checked,
                      })
                    }
                  />

                  <span>
                    I agree to the terms and conditions
                  </span>
                </label>

                {errors.acceptTerms && (
                  <div style={styles.error}>
                    {errors.acceptTerms}
                  </div>
                )}
              </div>
            </div>

            <div style={{ marginTop: '1.25rem' }}>
              <Button
                type="submit"
                fullWidth
                disabled={loading}
              >
                {loading
                  ? 'Creating account...'
                  : 'Create account'}
              </Button>
            </div>
          </form>

          <div
            style={{
              marginTop: '1.25rem',
              textAlign: 'center',
              color: '#475569',
            }}
          >
            Already have an account?{' '}
            <Link
              to="/login"
              style={styles.smallLink}
            >
              Login
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .register-card {
          min-width: 0;
        }

        .register-password-field,
        .vendor-field {
          min-width: 0;
        }

        .terms-label span {
          overflow-wrap: anywhere;
        }

        @media (max-width: 650px) {
          .register-card {
            padding: 1.25rem !important;
            border-radius: 18px !important;
          }

          .register-card h1 {
            font-size: 1.7rem !important;
          }

          .register-card > p {
            font-size: 0.9rem !important;
          }

          .register-card form > div:first-child {
            grid-template-columns: 1fr !important;
          }

          .register-password-field,
          .vendor-field {
            grid-column: 1 / -1 !important;
          }

          .password-options {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 0.65rem !important;
          }
        }

        @media (max-width: 450px) {
          .register-card {
            padding: 0.9rem !important;
            border-radius: 16px !important;
          }

          .register-card h1 {
            font-size: 1.5rem !important;
          }

          .register-card > p {
            margin-bottom: 1.2rem !important;
          }

          .image-preview-row {
            align-items: flex-start !important;
          }

          .image-preview-row img {
            width: 75px !important;
            height: 75px !important;
          }

          .image-preview-row span {
            font-size: 0.8rem !important;
          }

          .terms-label {
            align-items: flex-start !important;
          }
        }

        @media (max-width: 350px) {
          .register-card {
            padding: 0.75rem !important;
          }

          .image-preview-row {
            flex-direction: column !important;
          }
        }
      `}</style>
    </>
  );
}
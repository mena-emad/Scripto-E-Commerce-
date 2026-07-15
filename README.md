# E-Commerce Backend

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-ISC-lightgrey)

A modular backend for an e-commerce platform built with Node.js, Express, MongoDB, Mongoose, JWT, Cloudinary, and Nodemailer.

The current implementation includes authentication, email verification, password recovery, product management, cart operations, protected routes, role-based access control, and image uploads.

---

## Features

- ✅ User signup, login, logout, and profile retrieval
- ✅ Email verification with OTP
- ✅ Password reset and password update flows
- ✅ Role-based access control for users, vendors, and admins
- ✅ Vendor-specific product creation and updates
- ✅ Product listing, update, and deletion
- ✅ Cart add, update, remove, clear, and fetch operations
- ✅ Order placement through authenticated checkout
- ✅ Secure cookie-based authentication and token refresh
- ✅ Cloudinary-based image upload support
- ✅ Request validation with Joi
- ✅ Security middleware including Helmet, CORS, and NoSQL sanitization

---

## Project Structure

```text
E-Commerce/
├── README.md
├── Back-end/
│   ├── app.js
│   ├── index.js
│   ├── package.json
│   ├── config/
│   │   └── connectDB.js
│   ├── data/
│   │   └── models/
│   │       ├── Cart.js
│   │       ├── Orders.js
│   │       ├── Product.js
│   │       ├── User.js
│   │       └── Vendor.js
│   ├── middlewares/
│   │   ├── auth.js
│   │   └── validation.js
│   ├── modules/
│   │   ├── auth/
│   │   ├── cart/
│   │   ├── orders/
│   │   └── products/
│   └── utils/
│       ├── AppError.js
│       ├── catchAsync.js
│       ├── cloudinary.js
│       ├── createTokens.js
│       ├── gerror.js
│       ├── sendEmail.js
│       └── templates/
├── Front-end/
│   └── (client app folder)
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- MongoDB instance
- Gmail SMTP account for email sending
- Cloudinary account for image uploads

### Install dependencies

```bash
cd Back-end
npm install
```

### Environment variables

Create a `.env` file inside the `Back-end` folder:

```env
PORT=3000
MONGO_URL=mongodb://localhost:27017/ecommerce
FRONTEND_URL=http://localhost:3000

JWT_SECRETAT=your_access_token_secret
JWT_SECRETRT=your_refresh_token_secret

EMAIL=your.email@gmail.com
PASSWORD=your_email_password

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Run the server

```bash
cd Back-end
node index.js
```

Development mode:

```bash
cd Back-end
npx nodemon index.js
```

---

## API Reference

The backend currently mounts routes under these base paths:

- `/auth` for authentication and account management
- `/products` for product operations
- `/cart` for cart operations
- `/orders` for order placement

### Authentication routes

| Method | Endpoint | Description | Access |
| ------ | -------- | ----------- | ------ |
| POST | `/auth/signup` | Register a new user or vendor | Public |
| POST | `/auth/verify-otp` | Verify email using OTP | Public |
| POST | `/auth/generate-otp` | Generate verification OTP | Public |
| POST | `/auth/generate-new-access-token` | Refresh access token | Public |
| POST | `/auth/login` | Login and set authentication cookies | Public |
| POST | `/auth/forgot-password` | Request password reset | Public |
| POST | `/auth/reset-password` | Reset password using OTP | Public |
| POST | `/auth/logout` | Logout and clear cookies | Authenticated |
| PATCH | `/auth/update-password` | Update current password | Authenticated |
| GET | `/auth/me` | Get authenticated user profile | Authenticated |
| DELETE | `/auth/delete-my-account` | Delete the current user account | Authenticated |
| DELETE | `/auth/delete-account/:id` | Delete any account | Admin |
| PATCH | `/auth/block-account/:id` | Block or unblock an account | Admin |

### Product routes

| Method | Endpoint | Description | Access |
| ------ | -------- | ----------- | ------ |
| GET | `/products/get-products` | Get all products | Public |
| POST | `/products/add-product` | Create a new product | Vendor |
| PUT | `/products/update-product/:id` | Update a product | Vendor |
| DELETE | `/products/delete-product/:id` | Delete a product | Vendor / Admin |

### Cart routes

| Method | Endpoint | Description | Access |
| ------ | -------- | ----------- | ------ |
| POST | `/cart/add-to-cart` | Add an item to the cart | Authenticated |
| PATCH | `/cart/update-cart` | Update cart item quantity | Authenticated |
| DELETE | `/cart/remove-from-cart` | Remove an item from the cart | Authenticated |
| DELETE | `/cart/clear-cart` | Clear the user cart | Authenticated |
| GET | `/cart/get-my-cart` | Get the current cart | Authenticated |

---

### Order routes

| Method | Endpoint | Description | Access |
| ------ | -------- | ----------- | ------ |
| POST | `/orders/make-order` | Place a new order | Authenticated |

---

## Example Request

### Login example

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "Secret123!"
  }'
```

---

## Security and Validation

The backend uses:

- JWT authentication with access and refresh tokens
- HTTP-only secure cookies
- Password hashing with bcrypt
- Helmet security headers
- CORS configuration
- Mongo sanitization for NoSQL injection protection
- Joi validation middleware
- Centralized error handling

---

## Tech Stack

| Category | Technology |
| -------- | ---------- |
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB |
| ODM | Mongoose |
| Authentication | JWT |
| Validation | Joi |
| File Uploads | Multer |
| Image Storage | Cloudinary |
| Security | Helmet, CORS |
| Email Service | Nodemailer |

---

## Notes

- The frontend application is not included in this repository yet.
- The current API is fully mounted through the backend entry point and is ready for integration with a client app.

---

## License

This project is licensed under the ISC License.

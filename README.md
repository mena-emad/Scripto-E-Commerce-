# E-Commerce Backend

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-ISC-lightgrey)

A modular backend for a multi-vendor e-commerce marketplace. This repository provides authentication, authorization, vendor onboarding, email verification, and product scaffolding using Express, MongoDB, and JWT.

## Table of Contents

- [What the project does](#what-the-project-does)
- [Why this project is useful](#why-this-project-is-useful)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [API highlights](#api-highlights)
- [Product module status](#product-module-status)
- [Cart module status](#cart-module-status)
- [Environment variables](#environment-variables)
- [Where to get help](#where-to-get-help)
- [Contributing](#contributing)

## What the project does

This backend implements marketplace authentication and account management features:

- user registration, login, logout, and account deletion
- email verification using OTP
- password reset using OTP
- role-based access for `user`, `vendor`, and `admin`
- vendor onboarding and approval checks
- access and refresh token handling with secure cookies
- profile image uploads using Cloudinary
- product module scaffolding with validation and vendor ownership
- global security middleware for headers, CORS, and NoSQL sanitization

## Why this project is useful

This codebase is a solid starting point for marketplace applications because it includes:

- full auth lifecycle with email verification
- role-based access control
- admin account management
- modular route, controller, and service organization
- backend-ready product module scaffolding
- frontend-ready JSON API design with secure cookies

## Project structure

- `Back-end/`
  - `index.js` — environment loading, DB connection, and server startup
  - `app.js` — Express app setup, middleware, and route mounting
  - `config/connectDB.js` — MongoDB connection helper
  - `data/models/User.js` — user schema
  - `data/models/Vendor.js` — vendor schema
  - `data/models/Product.js` — product schema
  - `middlewares/auth.js` — route protection and role middleware
  - `middlewares/validation.js` — Joi request validation middleware
  - `modules/auth/` — auth routes, controllers, services, and validation schemas
  - `modules/products/` — product routes, controller, service, and validation schemas
  - `modules/cart/` — cart routes, controller, service, and validation schemas (currently not mounted in `app.js`)
  - `utils/` — utilities for errors, tokens, email, Cloudinary, and async handling
- `Front-end/` — placeholder folder for client application

## Getting started

### Prerequisites

- Node.js 18+
- npm
- MongoDB deployment or URI
- Gmail account for SMTP email delivery
- Cloudinary account for image uploads

### Install dependencies

```bash
cd "Back-end"
npm install
```

### Setup environment variables

Create a `.env` file in `Back-end/` with values like:

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

### Start the server

```bash
node index.js
```

For development, use nodemon:

```bash
npx nodemon index.js
```

## API highlights

Active authentication and account management endpoints:

- `POST /signup` — register a user or vendor with optional profile image
- `POST /verify-otp` — verify email using OTP
- `POST /generate-otp` — request a verification OTP
- `POST /generate-new-access-token` — refresh access token with refresh token cookie
- `POST /login` — authenticate and set auth cookies
- `POST /forgot-password` — request a password reset OTP
- `POST /reset-password` — reset password using OTP and clear auth cookies
- `PATCH /update-password` — update current session password and reissue auth tokens
- `POST /logout` — logout and clear auth cookies
- `GET /me` — get authenticated user profile
- `DELETE /delete-my-account` — delete the logged-in account
- `DELETE /delete-account/:id` — admin-only delete account
- `PATCH /block-account/:id` — admin-only block/unblock account

> Note: `POST /generate-otp-reset` exists as a controller and validation schema, but its route is currently commented out in `Back-end/modules/auth/auth.routes.js`.

## Product module status

The product module is implemented in `Back-end/modules/products/products.routes.js` and its exported router is mounted at `/products` in `Back-end/app.js`.

Defined product routes are:

- `POST /products/add-product` — create a product (`vendor` only)
- `GET /products/get-products` — list products (guest allowed)
- `PUT /products/update-product/:id` — update a product (`vendor` only)
- `DELETE /products/delete-product/:id` — delete a product (`vendor` or `admin`)

## Cart module status

The cart module exists in `Back-end/modules/cart/` but is not currently mounted in `Back-end/app.js`.

Defined cart routes are:

- `POST /add-to-cart` — add an item to the authenticated user's cart
- `PATCH /update-product` — update cart item quantity
- `DELETE /remove-from-cart` — remove an item from the cart
- `DELETE /clear-cart` — clear the authenticated user's cart
- `GET /get-my-cart` — get the authenticated user's cart

### Example request

```bash
curl -X POST http://localhost:3000/login   -H "Content-Type: application/json"   -d '{"email":"user@example.com","password":"Secret123!"}'
```

## Environment variables

Required variables:

- `MONGO_URL`
- `JWT_SECRETAT`
- `JWT_SECRETRT`
- `EMAIL`
- `PASSWORD`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`

Optional variables:

- `PORT`
- `FRONTEND_URL`

## Where to get help

- Open an issue in this repository
- Review backend auth logic in `Back-end/modules/auth/`
- Check runtime output from `node index.js`

## Contributing

Contributions are welcome. Please open issues or pull requests to improve authentication, vendor workflows, or frontend integration.

> Note: this repository does not currently include a separate `CONTRIBUTING.md` file.

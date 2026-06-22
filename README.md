# E-Commerce Backend

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-ISC-lightgrey)

A modular backend for a multi-vendor e-commerce project. This repository contains the authentication and user management server logic for a marketplace app built with Express, MongoDB, and JWT-based security.

## Table of Contents

- [What the project does](#what-the-project-does)
- [Why this project is useful](#why-this-project-is-useful)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [API highlights](#api-highlights)
- [Environment variables](#environment-variables)
- [Where to get help](#where-to-get-help)
- [Contributing](#contributing)

## What the project does

This backend implements core authentication and account management features for an e-commerce marketplace:

- User sign-up, login, and logout
- Email verification using OTP
- Password reset by OTP
- Role-based access control for `user`, `vendor`, and `admin`
- Vendor registration with approval workflow
- Session management with access and refresh tokens
- Secure file upload with Cloudinary
- Product schema scaffolding with vendor ownership, inventory, and discount support
- Global security middleware for headers, CORS, and NoSQL sanitization

## Why this project is useful

This backend is useful as a starting point for MERN-style marketplaces and business applications because it includes:

- A secure authentication flow with cookie-based tokens
- Email verification and password recovery
- Vendor onboarding and admin controls
- A clear modular architecture for easy extension
- Product model scaffolding ready for marketplace features
- Ready support for frontend integration via secure cookies and JSON APIs

## Project structure

- `Back-end/`
  - `index.js` — server startup and DB connection
  - `app.js` — Express application setup and middleware
  - `config/connectDB.js` — MongoDB connection helper
  - `data/models/User.js` — user schema with vendor virtual
  - `data/models/Vendor.js` — vendor profile schema
  - `data/models/Product.js` — product schema with discount and pricing virtuals
  - `middlewares/auth.js` — protect and role middleware
  - `middlewares/validation.js` — request validation middleware
  - `modules/auth/` — auth routes, controllers, services, request schemas
  - `modules/products/` — product validation and service scaffolding
  - `utils/` — common utilities, token generation, email and Cloudinary helpers
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
cd "Back-End"
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

For development, use a file watcher such as nodemon:

```bash
npx nodemon index.js
```

## API highlights

Authentication and account management endpoints:

- `POST /signup` — register user or vendor with optional profile image
- `POST /verify-otp` — confirm email with OTP
- `POST /generate-otp` — request verification OTP
- `POST /login` — authenticate user and set auth cookies
- `POST /forgot-password` — request password reset OTP
- `POST /reset-password` — reset password with OTP
- `POST /logout` — revoke refresh token and clear auth cookies
- `GET /me` — get current authenticated user
- `DELETE /delete-my-account` — delete own account

Admin-only operations:

- `DELETE /delete-account/:id`
- `PATCH /block-account/:id`

> Note: Product module files exist under `Back-end/modules/products/`, but product routes are not currently mounted in `Back-end/app.js`.

### Example request

```bash
curl -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"Secret123!"}'
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

Optional:

- `PORT`
- `FRONTEND_URL`

## Where to get help

- Open an issue in this repository
- Review auth logic in `Back-end/modules/auth/`
- Check runtime output from `node index.js`

## Contributing

Contributions are welcome. Please submit issues or pull requests to improve authentication, vendor workflows, or frontend integration.

> Note: This repo does not currently include a separate `CONTRIBUTING.md` file.

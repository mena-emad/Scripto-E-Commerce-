# Scripto

A multi-vendor e-commerce backend for secure user authentication, product catalog management, cart and order flows, vendor approvals, and admin oversight.

## Overview

Scripto is a multi-vendor e-commerce platform backend built with Node.js and Express. It provides the server-side foundation for a marketplace where users can register, browse approved products, manage carts, place orders, and interact with vendor and admin workflows.

The current implementation focuses on the backend API and the supporting business logic for:

- user and vendor registration
- email-based OTP verification
- product approval and catalog management
- cart and checkout flows
- vendor dashboard data
- admin moderation and approval operations
- Swagger/OpenAPI API documentation

This repository includes a separate frontend application under the `Front-end/` directory, but the backend in `Back-end/` is the main service and is the source of the API described here.

## Key Features

### Authentication and Authorization

- user signup with optional vendor registration
- OTP generation and email verification
- login/logout flows with JWT access and refresh tokens
- protected routes using authentication middleware
- role-based access control for `user`, `vendor`, and `admin`
- password update, forgot-password, and reset-password flows
- account blocking/unblocking by admin
- deletion of user or vendor-related records with cleanup logic

### User Management

- user registration and profile retrieval
- email verification before access to the app
- account blocking and admin user listing
- self-service password updates and account deletion

### Vendor Management

- vendor profile and dashboard endpoints
- vendor approval workflow managed by admin
- vendor-specific product management
- vendor order tracking and order status updates
- vendor dashboard statistics for revenue, products, and recent orders

### Product Management

- public product listing for approved items
- vendor product creation with image uploads
- vendor product updates and deletions
- admin product approval
- product quantity and discount metadata support
- product approval status checks before purchase

### Order Management

- cart-based checkout with vendor segmentation
- order creation from the authenticated user cart
- parent-order and sub-order tracking
- inventory adjustment during order placement
- vendor-specific order status updates

### Admin Dashboard and Moderation

- aggregate statistics for sales, users, vendors, products, pending approvals
- list and detail views for users, vendors, and products
- vendor approval and product approval routes
- pending vendor and product review queues

### API Documentation

- Swagger/OpenAPI YAML configuration in `Back-end/swagger.yaml`
- served via Swagger UI under the `/api/v1/docs` route

## User Roles

The implemented roles are limited to the following:

| Role | Responsibilities |
| --- | --- |
| `user` | General customer account. Can register, verify email, manage cart, place orders, and update their own password/profile. |
| `vendor` | Vendor account. Can manage their profile, product catalog, and vendor-specific orders after approval. |
| `admin` | Administrative account. Can review stats, approve vendors/products, view lists and details, and block users. |

Notably, the registration validation explicitly prevents direct admin signup. The code only allows `user` and `vendor` during registration.

## Backend Architecture

The backend follows a modular Express structure with a clear separation between route registration, controllers, services, data models, and validation.

The main pattern is:

- `app.js` mounts the API routes and global middleware
- `modules/*/routes.js` defines endpoints for each feature area
- controller files handle HTTP requests and responses
- service files contain the business logic and database operations
- model files define MongoDB schemas and relationships
- `middlewares/auth.js` handles JWT auth and role enforcement
- `middlewares/validation.js` validates request bodies using Joi
- `utils/` contains shared helpers, custom errors, token generation, Cloudinary upload logic, and email sending

There is no dependency injection container or service locator in the codebase. The architecture is conventional and layered rather than framework-driven.

## Technology Stack

| Category | Technology |
| --- | --- |
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB |
| ODM | Mongoose |
| Authentication | JWT (access + refresh tokens) |
| Password hashing | bcrypt |
| Validation | Joi |
| API documentation | Swagger UI + OpenAPI YAML |
| File handling | Multer |
| Image storage | Cloudinary |
| Email delivery | Nodemailer |
| Security | Helmet, CORS, mongo-sanitize |
| Environment management | dotenv |
| Frontend app | React + Vite + MUI |

## Project Structure

```text
E-Commerce/
├── README.md
├── package.json
├── package-lock.json
├── node_modules/
├── Back-end/
│   ├── .env
│   ├── app.js
│   ├── index.js
│   ├── package.json
│   ├── package-lock.json
│   ├── swagger.js
│   ├── swagger.yaml
│   ├── config/
│   │   ├── connectDB.js
│   │   └── hashPassword.js
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
│   │   ├── admin/
│   │   ├── auth/
│   │   ├── cart/
│   │   ├── orders/
│   │   ├── products/
│   │   └── vendor/
│   └── utils/
│       ├── AppError.js
│       ├── catchAsync.js
│       ├── cloudinary.js
│       ├── createTokens.js
│       ├── gerror.js
│       ├── sendEmail.js
│       └── templates/
│           ├── forgetTemplate.js
│           └── template.js
├── Front-end/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   ├── public/
│   └── src/
│       ├── App.css
│       ├── App.jsx
│       ├── i18n.js
│       ├── index.css
│       ├── main.jsx
│       ├── assets/
│       ├── components/
│       ├── layouts/
│       ├── locales/
│       ├── mock/
│       ├── pages/
│       ├── routes/
│       └── theme/
└── .git/
```

### Important directories

- `Back-end/` contains the Express API server, schemas, auth logic, modules, and utilities.
- `Back-end/modules/` is organized by feature: `auth`, `products`, `cart`, `orders`, `vendor`, and `admin`.
- `Back-end/data/models/` contains the MongoDB schema definitions.
- `Back-end/utils/` contains cross-cutting helpers such as token creation, Cloudinary upload, email sending, and global error handling.
- `Front-end/` contains the separate React/Vite client interface.

## API Documentation

The API is documented with OpenAPI/Swagger. The backend mounts Swagger UI at:

```text
http://localhost:3000/api/v1/docs
```

The Swagger definition is stored in `Back-end/swagger.yaml` and loaded by `Back-end/swagger.js`.

To explore the API locally:

1. Start the backend server.
2. Open the Swagger UI URL in a browser.
3. Use the interactive docs to test endpoints and review the request/response structure.

The base API path is:

```text
http://localhost:3000/api/v1
```

## API Modules and Endpoints

The backend exposes its routes under `/api/v1`.

### Authentication

- `POST /auth/signup`
- `POST /auth/verify-otp`
- `POST /auth/generate-otp`
- `POST /auth/generate-new-access-token`
- `POST /auth/login`
- `POST /auth/forgot-password`
- `POST /auth/reset-password`
- `POST /auth/logout`
- `PATCH /auth/update-password`
- `DELETE /auth/delete-my-account`
- `GET /auth/me`
- `DELETE /auth/delete-account/:id`
- `PATCH /auth/block-account/:id`

### Products

- `GET /products/get-products`
- `POST /products/add-product`
- `PUT /products/update-product/:id`
- `DELETE /products/delete-product/:id`

### Cart

- `POST /cart/add-to-cart`
- `PATCH /cart/update-cart`
- `DELETE /cart/remove-from-cart`
- `DELETE /cart/clear-cart`
- `GET /cart/get-my-cart`

### Orders

- `POST /orders/make-order`

### Vendor

- `GET /vendor/profile`
- `PATCH /vendor/profile`
- `GET /vendor/products`
- `GET /vendor/orders`
- `GET /vendor/orders/:orderId`
- `PATCH /vendor/orders/:orderId/status`
- `GET /vendor/dashboard/stats`
- `GET /vendor/dashboard/products/stats`
- `GET /vendor/dashboard/orders/recent`

### Admin

- `GET /admin/statics`
- `GET /admin/vendor/:id`
- `GET /admin/user/:id`
- `GET /admin/product/:id`
- `PATCH /admin/approve-vendor/:id`
- `GET /admin/users`
- `GET /admin/vendors`
- `GET /admin/products`
- `PATCH /admin/approve-product/:id`

## Authentication and Security

The backend implements the following security mechanisms, based on the code:

- JWT-based authentication with access and refresh tokens
- access tokens are read from the `Authorization: Bearer ...` header or from the `accessToken` cookie
- refresh tokens are stored in cookies (`refreshToken`, `accessToken`)
- cookie settings include `httpOnly`, `secure`, and `sameSite: "none"`
- password hashing is handled with `bcrypt` in the schema pre-save middleware
- role enforcement is applied using `protect` and `restrictTo(...)` middleware
- vendor approval enforcement is applied through `restrictToVendorApproved`
- `mongo-sanitize` is used to sanitize request body, query, and params
- `helmet()` adds HTTP security headers
- CORS is enabled using `cors({ origin: process.env.FRONTEND_URL || "http://localhost:3000", credentials: true })`
- Joi validation is used before mutable request bodies reach the controller/service layer
- a centralized error middleware is mounted via `app.use(gerror)`

## Environment Variables

Create a `.env` file in `Back-end/` and set the following variables. The project does not currently include a `.env.example` file.

| Variable | Required | Used for |
| --- | --- | --- |
| `PORT` | Yes | Backend server port. Default fallback is `3000`. |
| `MONGO_URL` | Yes | MongoDB connection string. |
| `FRONTEND_URL` | Yes for CORS | Allowed frontend origin for cross-origin requests. |
| `JWT_SECRETAT` | Yes | Secret used to sign access tokens. |
| `JWT_SECRETRT` | Yes | Secret used to sign refresh tokens. |
| `EMAIL` | Yes | SMTP account email used by Nodemailer. |
| `PASSWORD` | Yes | SMTP password or app password used by Nodemailer. |
| `CLOUDINARY_CLOUD_NAME` | Yes | Cloudinary cloud name. |
| `CLOUDINARY_API_KEY` | Yes | Cloudinary API key. |
| `CLOUDINARY_API_SECRET` | Yes | Cloudinary API secret. |

Example:

```env
PORT=3000
MONGO_URL=mongodb://localhost:27017/Ecommerce
FRONTEND_URL=http://localhost:3000
JWT_SECRETAT=your_access_token_secret
JWT_SECRETRT=your_refresh_token_secret
EMAIL=you@example.com
PASSWORD=your_email_password
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Installation and Setup

### Prerequisites

- Node.js and npm
- MongoDB instance or MongoDB Atlas connection
- Cloudinary account
- SMTP-capable email account for OTP and verification emails

### 1. Install dependencies

```bash
cd Back-end
npm install
```

If you plan to run the frontend app as well:

```bash
cd Front-end
npm install
```

### 2. Configure environment variables

Create a `.env` file in `Back-end/` using the variables above.

### 3. Start the backend

```bash
cd Back-end
node index.js
```

The server connects to MongoDB during startup and listens on the configured port.

### 4. Start the frontend (separate app)

```bash
cd Front-end
npm run dev
```

## Available Scripts

### Backend (`Back-end/package.json`)

| Script | Actual Behavior |
| --- | --- |
| `test` | Placeholder script. It currently exits with `Error: no test specified` and exits with status 1. |

### Frontend (`Front-end/package.json`)

| Script | Purpose |
| --- | --- |
| `dev` | Start the Vite development server. |
| `build` | Create a production build with Vite. |
| `lint` | Run the project linter (`oxlint`). |
| `preview` | Preview the production build locally. |

## API Usage Examples

### Register a user

```bash
curl -X POST http://localhost:3000/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "password": "Pass123!",
    "confirmPassword": "Pass123!",
    "role": "user"
  }'
```

### Login

```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane@example.com",
    "password": "Pass123!"
  }'
```

### Fetch current user profile

```bash
curl -X GET http://localhost:3000/api/v1/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Get approved products

```bash
curl -X GET "http://localhost:3000/api/v1/products/get-products?page=1&limit=10"
```

### Add an item to cart

```bash
curl -X POST http://localhost:3000/api/v1/cart/add-to-cart \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "productId": "64f0d7cf02d3d1d1a5f4f0a1",
    "quantity": 2
  }'
```

### Place an order

```bash
curl -X POST http://localhost:3000/api/v1/orders/make-order \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "shippingAddress": "123 Market Street, Cairo, Egypt",
    "paymentMethod": "COD"
  }'
```

## Database

The backend uses MongoDB as its primary database and Mongoose for schema modeling.

### Main entities

- `User` — stores user account data, role, verification state, profile image, and refresh tokens
- `Vendor` — stores store metadata, approval status, and owner reference
- `Product` — stores product catalog details, pricing, images, approval state, and stock quantity
- `Cart` — stores a single cart per user and a list of cart line items
- `ParentOrder` — stores customer order summary and shipping/payment details
- `SubOrder` — stores per-vendor order slices and fulfillment status

### Model relationships

- `User` has a virtual `vendorInfo` relationship to `Vendor` via `owner`
- `Vendor` contains an `owner` reference to a `User`
- `Product` belongs to a `Vendor` via the `vendor` field
- `Cart` belongs to a `User` and contains product entries with `product` and `vendor` references
- `ParentOrder` contains a list of products and a `user` reference
- `SubOrder` references both a `ParentOrder` and a `Vendor`

## Error Handling and Validation

Error handling is centralized around a custom `AppError` class and the `catchAsync` utility. The global error middleware is registered in `app.js` after the routes.

Validation is implemented using Joi in the `modules/*/validation.js` files and the shared middleware in `middlewares/validation.js`.

Examples of validations in the code include:

- required fields for signup and login
- password strength rules
- email format checks
- OTP length validation
- MongoDB ObjectId checks for certain routes
- product quantity and price constraints
- cart quantity validation

## Development Notes

- The project is organized by feature modules under `Back-end/modules/` and is easy to extend by adding additional routes, controllers, and services.
- Product uploads are handled in memory and then uploaded to Cloudinary through a custom uploader function.
- Vendor routes are protected by both authentication and approval checks; an unapproved vendor cannot access vendor-specific routes.
- Product creation and order placement both perform inventory and status checks before finalizing changes.
- The project includes a Swagger definition that is useful for API contract documentation and testing.
- The current backend does not include automated tests beyond a placeholder `test` script.

## Future Improvements

The following are reasonable future enhancements, but are not currently implemented in the codebase:

- automated test suite for auth, products, cart, and orders
- pagination and filtering improvements for product listings and vendor dashboards
- stricter API versioning and webhook/event-driven patterns
- role-aware frontend integration for all permissions and admin actions
- stronger transaction and stock validation for concurrent order scenarios
- Docker-based local development and deployment setup

## Author

No author metadata is currently defined in the repository configuration or the existing README.

## License

This project is currently licensed under the ISC License as declared in the backend package metadata.

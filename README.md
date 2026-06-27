# E-Commerce Backend

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-ISC-lightgrey)

A modular backend for a multi-vendor e-commerce marketplace built with **Node.js**, **Express.js**, **MongoDB**, and **JWT Authentication**.

It provides a complete authentication system, vendor onboarding workflow, product management, secure token handling, email verification, password recovery, and image uploads via Cloudinary.

---

## Features

* ✅ User Authentication & Authorization
* ✅ Email Verification with OTP
* ✅ Password Reset Flow
* ✅ Role-Based Access Control (User / Vendor / Admin)
* ✅ Vendor Registration & Approval
* ✅ JWT Access & Refresh Tokens
* ✅ Secure Cookie Authentication
* ✅ Cloudinary Image Uploads
* ✅ Product Management Module
* ✅ Cart Module Structure
* ✅ MongoDB + Mongoose
* ✅ RESTful API Architecture
* ✅ Security Middleware (Helmet, CORS, NoSQL Sanitization)

---

## Table of Contents

* [Features](#features)
* [Project Structure](#project-structure)
* [Getting Started](#getting-started)
* [API Reference](#api-reference)
* [Environment Variables](#environment-variables)
* [Product Module](#product-module)
* [Cart Module](#cart-module)
* [Example Request](#example-request)
* [Contributing](#contributing)

---

## Project Structure

```text
Back-end/
│
├── index.js
├── app.js
│
├── config/
│   └── connectDB.js
│
├── data/
│   └── models/
│       ├── User.js
│       ├── Vendor.js
│       └── Product.js
│
├── middlewares/
│   ├── auth.js
│   └── validation.js
│
├── modules/
│   ├── auth/
│   ├── products/
│   └── cart/
│
└── utils/
    ├── asyncHandler.js
    ├── cloudinary.js
    ├── email.js
    ├── errors.js
    └── tokens.js

Front-end/
└── (Placeholder for client application)
```

---

## Getting Started

### Prerequisites

* Node.js 18+
* npm
* MongoDB URI
* Gmail SMTP Account
* Cloudinary Account

### Install Dependencies

```bash
cd Back-end
npm install
```

### Environment Variables

Create a `.env` file inside `Back-end/`:

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

### Run the Project

```bash
node index.js
```

Development mode:

```bash
npx nodemon index.js
```

---

# API Reference

## Authentication & Account Management

| Method | Endpoint                     | Description                                     | Access        |
| ------ | ---------------------------- | ----------------------------------------------- | ------------- |
| POST   | `/signup`                    | Register a new user or vendor                   | Public        |
| POST   | `/verify-otp`                | Verify email using OTP                          | Public        |
| POST   | `/generate-otp`              | Generate email verification OTP                 | Public        |
| POST   | `/generate-new-access-token` | Refresh access token using refresh token cookie | Public        |
| POST   | `/login`                     | Login and set authentication cookies            | Public        |
| POST   | `/forgot-password`           | Request password reset OTP                      | Public        |
| POST   | `/reset-password`            | Reset password using OTP                        | Public        |
| PATCH  | `/update-password`           | Update current password                         | Authenticated |
| POST   | `/logout`                    | Logout user and clear cookies                   | Authenticated |
| GET    | `/me`                        | Retrieve authenticated user profile             | Authenticated |
| DELETE | `/delete-my-account`         | Delete current user account                     | Authenticated |
| DELETE | `/delete-account/:id`        | Delete any account                              | Admin         |
| PATCH  | `/block-account/:id`         | Block or unblock account                        | Admin         |

> **Note:** `POST /generate-otp-reset` exists in the codebase but its route is currently commented out.

---

## Product Module

Base Route:

```http
/products
```

| Method | Endpoint                       | Description            | Access         |
| ------ | ------------------------------ | ---------------------- | -------------- |
| POST   | `/products/add-product`        | Create a new product   | Vendor         |
| GET    | `/products/get-products`       | Retrieve all products  | Public         |
| PUT    | `/products/update-product/:id` | Update product details | Vendor         |
| DELETE | `/products/delete-product/:id` | Delete a product       | Vendor / Admin |

---

## Cart Module

> The cart module exists in the project but is currently **not mounted** in `app.js`.

| Method | Endpoint            | Description                | Access        |
| ------ | ------------------- | -------------------------- | ------------- |
| POST   | `/add-to-cart`      | Add item to cart           | Authenticated |
| PATCH  | `/update-product`   | Update cart item quantity  | Authenticated |
| DELETE | `/remove-from-cart` | Remove item from cart      | Authenticated |
| DELETE | `/clear-cart`       | Remove all items from cart | Authenticated |
| GET    | `/get-my-cart`      | Retrieve current cart      | Authenticated |

---

## Environment Variables

### Required

| Variable                | Description            |
| ----------------------- | ---------------------- |
| `MONGO_URL`             | MongoDB Connection URI |
| `JWT_SECRETAT`          | Access Token Secret    |
| `JWT_SECRETRT`          | Refresh Token Secret   |
| `EMAIL`                 | SMTP Email Address     |
| `PASSWORD`              | SMTP Email Password    |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary Cloud Name  |
| `CLOUDINARY_API_KEY`    | Cloudinary API Key     |
| `CLOUDINARY_API_SECRET` | Cloudinary API Secret  |

### Optional

| Variable       | Description      |
| -------------- | ---------------- |
| `PORT`         | Application Port |
| `FRONTEND_URL` | Frontend URL     |

---

## Example Request

### Login

```bash
curl -X POST http://localhost:3000/login \
-H "Content-Type: application/json" \
-d '{
  "email":"user@example.com",
  "password":"Secret123!"
}'
```

---

## Security Features

* JWT Authentication
* Refresh Token Rotation
* Secure HTTP Cookies
* Password Hashing with bcrypt
* Helmet Security Headers
* CORS Protection
* NoSQL Injection Sanitization
* Request Validation using Joi
* Centralized Error Handling

---

## Tech Stack

| Category       | Technology   |
| -------------- | ------------ |
| Runtime        | Node.js      |
| Framework      | Express.js   |
| Database       | MongoDB      |
| ODM            | Mongoose     |
| Authentication | JWT          |
| Validation     | Joi          |
| File Uploads   | Multer       |
| Image Storage  | Cloudinary   |
| Security       | Helmet, CORS |
| Email Service  | Nodemailer   |

---

## Contributing

Contributions are welcome.

Feel free to:

* Open an issue
* Submit a pull request
* Improve documentation
* Add new features
* Refactor existing modules

---

## License

This project is licensed under the ISC License.

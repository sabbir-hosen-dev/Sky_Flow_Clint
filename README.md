# SkyRent

SkyRent is a **Building Management System (BMS)** designed for managing apartments, tenants, and rent payments efficiently.

## Live Link

[SkyRent Live](https://skyflow-277.web.app)

## Admin Login Credentials

- **Email:** sabbirhosen@gmail.com
- **Password:** Sabbir@277

## Features

- **Authentication:** Secure login and signup using Firebase
- **Role-Based Dashboard:** Separate interfaces for Admin, Members, and Users
- **Apartment Management:** Add, update, and delete apartments
- **Payment System:** Integrated Stripe for rent payments
- **Coupon System:** Apply discount coupons for rent
- **Announcements:** Admin can send important notices
- **User Profile:** View and edit profile details
- **Pagination & Search:** Easily navigate through listings
- **Dark Mode:** User-friendly interface with theme support

## Tech Stack

- **Frontend:** React, Tailwind CSS, DaisyUI
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Firebase, JWT
- **Payments:** Stripe

### Packages Used

- **Frontend:**

  - `@stripe/react-stripe-js`: For Stripe integration
  - `@tanstack/react-query`: For data fetching
  - `axios`: For making HTTP requests
  - `firebase`: For authentication
  - `formik`: For handling forms
  - `framer-motion`: For animations
  - `leaflet`: For map integration
  - `react-router-dom`: For routing
  - `react-icons`: For icons
  - `react-leaflet`: For map integration with React
  - `swiper`: For carousel components
  - `yup`: For schema validation

- **Development Dependencies:**

  - `@eslint/js`: For linting
  - `@types/react`: TypeScript types for React
  - `@vitejs/plugin-react`: Vite plugin for React
  - `eslint`: For linting
  - `eslint-plugin-react`: For React-specific linting rules
  - `postcss`: For CSS post-processing
  - `tailwindcss`: For utility-first CSS framework
  - `vite`: For fast build tool

  ## Home Page

  <img style="width: 100%" src="./src/assets/skyFlow/skyFlow-Home-Page.png">

## Setup and Installation

To run this project locally, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/skyRent.git
cd skyRent
```

### 2. Install dependencies

For the frontend:

```bash
cd frontend
npm install
```

For the backend:

```bash
cd backend
npm install
```

### 3. Set up environment variables

Create `.env` files in both the **frontend** and **backend** directories. Add the following variables:

**Frontend**:

```
REACT_APP_API_URL=your_api_url
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
```

**Backend**:

```
MONGO_URI=your_mongodb_uri
STRIPE_SECRET_KEY=your_stripe_secret_key
JWT_SECRET=your_jwt_secret
```

### 4. Run the development server

For the frontend:

```bash
npm start
```

For the backend:

```bash
npm run dev
```

### 5. Visit the app

Open your browser and go to [http://localhost:3000](http://localhost:3000) to view the app.

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature-branch`)
5. Create a new Pull Request

# ICW - E-commerce React Native Application


[![React Native](https://img.shields.io/badge/React%20Native-673AB7?style=for-the-badge&logo=react&logoColor=white)]() [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)]() [![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)]() [![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)]() [![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)]()

ICW is a modern e-commerce application built with React Native, leveraging Expo for a streamlined development experience. It features a user-friendly interface for browsing products, managing a shopping cart, and interacting with a backend API for product data.

## Table of Contents 📜

- [Project Title & Badges](#project-title--badges)
- [Description](#description)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Reference](#api-reference)

## Description 📝

ICW is a React Native mobile application designed for e-commerce. It provides users with a seamless shopping experience, allowing them to discover products, view details, add items to their cart, and potentially proceed to checkout (though checkout functionality is not fully implemented in the provided code). The application communicates with a backend API to fetch product data, categories, and manage state.

## Features ✨

- **Product Browsing:** Users can browse a catalog of products with filtering by category, sale status, and featured items.
- **Search Functionality:** Integrated search allows users to find products by name or brand.
- **Product Details:** Detailed view for each product, including images, description, price, stock availability, and ratings.
- **Shopping Cart:** Users can add items to a shopping cart, update quantities, and remove items.
- **Sales & Promotions:** Highlights products on sale with discount indicators.
- **Featured Products:** Showcases selected products on the home screen.
- **Category Navigation:** Easy navigation through different product categories.
- **Customizable Styling:** Utilizes Tailwind CSS for a themable and responsive UI with custom color palettes and font families.
- **Offline Support (Cart):** Shopping cart data is persisted using `AsyncStorage`.
- **API Integration:** Connects to a backend API for dynamic product data.

## Tech Stack 🛠️

- **Frontend:** React Native, Expo, TypeScript, NativeWind (for Tailwind CSS)
- **Backend:** Node.js, Express.js, Mongoose (for MongoDB interaction)
- **Styling:** Tailwind CSS
- **State Management:** Zustand (for Cart)
- **Data Fetching:** React Query (`@tanstack/react-query`)
- **Navigation:** Expo Router
- **Utilities:** Axios, dotenv, cors

## Installation 🚀

To set up and run this project locally, follow these steps:

### Prerequisites

- Node.js and npm/yarn installed
- Expo CLI installed (`npm install -g expo-cli`)
- A MongoDB instance running (for the backend)

### Frontend (icw-app)

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ryanzam/icw.git
   cd icw/icw-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Environment Variables (if necessary):**
   Ensure your `.env` file (or equivalent for Expo) has the correct `EXPO_PUBLIC_API_URL` pointing to your backend.

4. **Start the development server:**
   ```bash
   npx expo start
   ```

   You can then open the app on an emulator, simulator, or your physical device using Expo Go.

### Backend (server)

1. **Navigate to the server directory:**
   ```bash
   cd ../server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the `server/` directory with your MongoDB connection string:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=4000
   ```

4. **Seed the database (optional but recommended):**
   This will populate your MongoDB with initial product data.
   ```bash
   npm run seed
   # or
   yarn seed
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   This will start the API server, typically on `http://localhost:4000`.

## Usage 📱

This application is a mobile e-commerce platform. Once the app is running:

1.  **Home Screen:** Displays featured products, ongoing sales, and category navigation.
2.  **Shop Screen:** Allows users to browse all products, filter by category, search by keywords, and sort results (by price, rating, etc.).
3.  **Product Detail Screen:** Tapping on a product navigates to a screen with more details, including images, description, stock, and price. Users can add products to the cart from here.
4.  **Cart Screen:** Shows items added to the shopping cart. (Note: The current implementation of the cart screen is minimal and primarily displays "Cart").
5.  **Profile Screen:** A placeholder for user profile information.

**Real-world Use Case:**

This project serves as a foundation for a mobile beauty or cosmetic e-commerce store. It demonstrates how to structure a React Native application with a separate backend API, handle product data, implement a shopping cart, and apply custom styling using Tailwind CSS.

## Project Structure 📁

The project follows a standard monorepo structure with separate directories for the React Native app and the backend server:

```
icw/
├── icw-app/
│   ├── app/
│   │   ├── (tabs)/
│   │   │   ├── _layout.tsx
│   │   │   ├── cart.tsx
│   │   │   ├── index.tsx
│   │   │   ├── profile.tsx
│   │   │   └── shop.tsx
│   │   ├── product/[id].tsx
│   │   └── _layout.tsx
│   ├── assets/
│   ├── components/
│   ├── constants/
│   ├── hooks/
│   ├── src/
│   ├── store/
│   ├── types/
│   ├── utils/
│   ├── babel.config.js
│   ├── global.css
│   ├── metro.config.js
│   ├── nativewind-env.d.ts
│   ├── package.json
│   ├── tailwind.config.js
│   └── tsconfig.json
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   └── productController.js
│   │   ├── models/
│   │   │   └── Product.js
│   │   ├── routes/
│   │   │   └── productRoute.js
│   │   └── seed/
│   │       └── seed.js
│   ├── index.js
│   ├── package.json
│   └── README.md
│
└── README.md
```

## API Reference 🔌

The backend API provides the following endpoints:

-   **`GET /api/products`**: Retrieves a list of products. Supports query parameters for:
    -   `search`: Search term (e.g., `?search=serum`)
    -   `category`: Filter by category (e.g., `?category=skincare`)
    -   `sale`: Filter by sale status (e.g., `?sale=true`)
    -   `featured`: Filter by featured status (e.g., `?featured=true`)
    -   `sort`: Sorting order (e.g., `?sort=price_asc`, `?sort=rating`)
    -   `page`, `limit`: For pagination.

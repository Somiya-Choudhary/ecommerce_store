# Ecommerce Store Client

## Overview

This is a frontend client built using **React and Vite**.

At the moment, the UI focuses on **fetching and displaying the product list** by
making API calls to the backend server.

---

## Tech Stack

- React

---

## Features

- Fetches product list from backend API
- Displays product name and price
- Simple, readable component structure
- No authentication or complex state management

---

## Current Scope

- Product list is fetched from the backend (`GET /api/products`)
- Products are rendered with basic information (name and price)
- No cart or checkout interactions are implemented yet

---

## TODO

- Add "Add to Cart" functionality
- Add cart view and quantity updates
- Add centralized state management for cart
- Add checkout flow and coupon application
- Improve basic UI styling

---

## Notes

- The backend server must be running for the UI to work correctly.
- The API base URL is currently hardcoded for simplicity.
- The UI is intentionally minimal, as backend APIs are the primary focus
  of this assignment.


## Setup & Running the Client

### Install Dependencies

From the `client/` directory:

```bash
npm install
```

### Run Client

```bash
npm run dev
```


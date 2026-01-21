# Ecommerce Store

## Overview

This project is a simple ecommerce backend built using **Node.js and Express**.  
It supports core ecommerce functionality such as product listing, cart management,
checkout, and coupon generation.

---

## Tech Stack

- Node.js
- Express
- In-memory storage (arrays)

---

## High-Level Architecture

The project follows a layered structure:

- **Routes** – define API endpoints
- **Controllers** – handle HTTP request/response
- **Middleware** – handle request validation and centralized error handling
- **Models** – define domain entities
- **Store** – acts as an in-memory persistence layer
- **Constants** – define shared constant values (e.g. coupon status)
- **Config** – store configurable business parameters (e.g. discount percent, coupon interval)
- **Utils** – contain reusable business logic (e.g. coupon generation)

---

## Domain Models

- **Product** – represents a product in the catalog
- **Cart** – represents a user’s active shopping cart
- **Order** – immutable record created after checkout
- **OrderItem** – snapshot of purchased product details
- **Coupon** – represents Coupon (ACTIVE → USED)

---

## Endpoint

### Cart – Add Items

- **POST** `/api/cart/items`

Adds a product to the user’s cart or updates the quantity if the product
already exists.

#### Request Body

```json
{
  "userId": 1,
  "productId": 3,
  "quantity": 2
}
```

### Checkout – Place Order

- **POST** `/api/checkout`

Creates an order from the user’s cart.

#### Request Body (without coupon)

```json
{
  "userId": 1,
  "couponCode": "SAVE10-AB12CD34" // Optional
}
```

### Admin – Summary

- **GET** `/api/admin/summary`

Returns total items purchased, total purchase amount, list of discount codes,
and total discount amount.

#### Response

```json
{
    "itemsPurchasedCount": 6,
    "totalPurchaseAmount": 136700,
    "discountCodes": [
        {
            "id": 1,
            "code": "SAVE10-29990CE7",
            "status": "ACTIVE",
            "generatedAtOrder": 2,
            "discountPercent": 10
        },
        {
            "id": 2,
            "code": "SAVE10-00574B19",
            "status": "USED",
            "generatedAtOrder": 4,
            "discountPercent": 10
        }
    ],
    "totalDiscountAmount": 300
}
```

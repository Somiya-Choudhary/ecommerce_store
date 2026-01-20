# Ecommerce Store API

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

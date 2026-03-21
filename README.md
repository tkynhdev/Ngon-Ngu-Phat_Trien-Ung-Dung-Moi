# Inventory Management System

A Node.js API for managing product inventories with stock, reserved, and sold count tracking.

## Features

- Create products with automatic inventory creation
- Get all inventories with product details
- Get inventory by ID with product details
- Add stock to inventory
- Remove stock from inventory
- Reserve stock (decreases stock, increases reserved)
- Mark items as sold (decreases reserved, increases sold count)

## Prerequisites

- Node.js
- MongoDB (running on localhost:27017)

## Installation

1. Clone the repository
2. Run `npm install`
3. Start MongoDB
4. Run `npm start`

## API Endpoints

### Products

- `POST /api/products` - Create a new product (automatically creates inventory)
  - Body: `{ "name": "Product Name", "price": 100, "description": "Description" }`

### Inventories

- `GET /api/inventories` - Get all inventories with product details
- `GET /api/inventories/:id` - Get inventory by ID with product details
- `POST /api/inventories/add-stock` - Add stock
  - Body: `{ "product": "product_id", "quantity": 10 }`
- `POST /api/inventories/remove-stock` - Remove stock
  - Body: `{ "product": "product_id", "quantity": 5 }`
- `POST /api/inventories/reservation` - Reserve stock
  - Body: `{ "product": "product_id", "quantity": 3 }`
- `POST /api/inventories/sold` - Mark as sold
  - Body: `{ "product": "product_id", "quantity": 2 }`

## Testing with Postman

Import the provided Postman collection and run the requests in order.

## Git Repository

This project is version controlled with Git. All changes are committed to the repository.
# Walmart Product Search Backend

This is a simple Express backend for searching products from a large CSV file (walmart-products.csv).

## Setup

1. Install dependencies:
   ```sh
   npm install
   ```
2. Place `walmart-products.csv` in the project root (or adjust the path in `index.js`).
3. Start the server:
   ```sh
   npm run dev
   # or
   npm start
   ```

## API

### `GET /search`

Search for products by title or description (case-insensitive, substring match).

**Query Parameters:**
- `q` (string): Search term (optional)
- `page` (number): Page number (default: 1)
- `limit` (number): Results per page (default: 20)

**Example:**
```
GET /search?q=iphone&page=1&limit=10
```

**Response:**
```
{
  "total": 123,
  "page": 1,
  "limit": 10,
  "results": [ ...products... ]
}
```

## Notes
- All product data is loaded into memory on server startup for fast search.
- For very large CSVs, consider using a database for scalability. 
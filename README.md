# URL Shortener Backend

A scalable URL shortening service backend similar to Bitly or TinyURL, built with Node.js, Express, and MongoDB.

## Deployed-Link

Link :- 


## PostMan Collection

Link :- https://xyz555-3569.postman.co/workspace/assignment_binmile~9c9ca034-df6d-4825-8c6b-89cfdcb20599/collection/36729152-a0eca06b-bc65-411f-9f14-db10d3ff5233?action=share&creator=36729152

## Features

- Shorten long URLs with optional custom aliases  
- Redirect short URLs to the original long URLs  
- Analytics endpoint to track visit count, creation, and last accessed timestamps  
- Input validation and error handling  
- Rate limiting to prevent abuse (basic)  
- Environment-based configuration  
- Unique short codes using Base62 encoding  
- Auto-expiration of URLs (optional to implement)

## Tech Stack

- Node.js  
- Express.js  
- MongoDB with Mongoose ORM  
- dotenv for environment variables  
- Basic input validation  
- Optional: Rate limiting middleware

## Getting Started

### Prerequisites

- Node.js (v16+)  
- MongoDB (local or cloud)  
- npm or yarn

### Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/url-shortener-backend.git
cd url-shortener-backend
```

2.Install dependencies:

```bash
npm install
```

3. Create a .env file in the root directory with the following:

```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/urlshortener
BASE_URL=http://localhost:5000
```

4. Start the server:

```bash
npm run dev
 // The server should be running on http://localhost:5000
```


## API Documentation

1. POST /shorten
Create a short URL from a long URL.

Request Body
```bash

{
  "longUrl": "https://www.google.com",
  "customAlias": "goog"
}
```

Response

```bash
{
  "shortUrl": "http://localhost:5000/goog",
  "shortCode": "goog",
  "longUrl": "https://www.google.com"
}
```
If customAlias is omitted, a unique short code is auto-generated. Returns 400 Bad Request if the URL is invalid or alias already exists.

2. GET /:shortCode
Redirect to the original long URL.

Example:

GET http://localhost:5000/goog

Behavior:

Redirects (HTTP 302) to the original URL

Increments visit count and updates last accessed timestamp

Error:
```
{
  "message": "Short URL not found"
}
```

3. GET /analytics/:shortCode
Retrieve analytics data for a short URL.

Example:

GET http://localhost:5000/analytics/goog

Response
```bash
{
  "shortCode": "goog",
  "longUrl": "https://www.google.com",
  "createdAt": "2025-06-05T09:30:00.000Z",
  "lastAccessed": "2025-06-05T09:45:12.000Z",
  "visitCount": 3
}
```
Error:
```bash
{
  "message": "Short URL not found"
}
```

Error Handling
Proper HTTP status codes returned:

400 Bad Request for invalid inputs

404 Not Found for missing short codes

500 Internal Server Error for unexpected errors

Security & Validation
URL validation to ensure valid URLs

Rate limiting to protect from abuse (basic implementation)

Sanitization to prevent XSS/SQL injection

Environment Variables
Variable	Description	Example
PORT	Port on which server runs	5000
MONGO_URI	MongoDB connection string	mongodb://localhost:27017/urlshortener
BASE_URL	Base URL for short links	http://localhost:5000

Optional Features to Add
URL expiration after 30 days or custom expiry

Authentication for custom alias creation

Click analytics by IP, user-agent, location (mocked or real)

Admin dashboard or REST endpoints to manage all URLs

Dockerize the app for easy deployment

Example Usage with curl
```bash
# Create short URL
curl -X POST http://localhost:5000/shorten \
-H "Content-Type: application/json" \
-d '{"longUrl":"https://www.google.com","customAlias":"goog"}'
```

# Redirect (in browser or curl follows redirect)
curl -L http://localhost:5000/goog

# Get analytics
curl http://localhost:5000/analytics/goog
License
MIT License

Feel free to open issues or PRs!

Built with ❤️ by [Shivank Kumar]

yaml
Copy
Edit

---





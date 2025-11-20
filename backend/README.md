# Sahara Adventures Backend

This is the backend API for the Sahara Adventures website.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update the variables as needed

3. Start MongoDB:
   - Make sure MongoDB is installed and running on your system
   - Or update the MONGODB_URI in the .env file to point to your MongoDB instance

4. Seed the database:
   ```
   node seed.js
   ```
   This will create an admin user with:
   - Email: admin@saharaadventures.com
   - Password: admin123

5. Start the server:
   ```
   npm start
   ```
   Or for development:
   ```
   npm run dev
   ```

## API Endpoints

### Authentication
- POST `/api/auth/login` - Admin login
  - Request body: `{ email, password }`
  - Response: `{ token, admin }`

- GET `/api/auth/verify` - Verify JWT token
  - Headers: `x-auth-token: <JWT token>`
  - Response: `{ admin }`

### Contacts
- GET `/api/contacts` - Get all contacts (protected)
  - Headers: `x-auth-token: <JWT token>`
  - Response: Array of contact objects

- POST `/api/contacts` - Create a new contact
  - Request body: `{ name, email, phone, message }`
  - Response: Created contact object

- DELETE `/api/contacts/:id` - Delete a contact (protected)
  - Headers: `x-auth-token: <JWT token>`
  - Response: `{ message: "Contact removed" }`

## Admin Login

You can log in to the admin dashboard using:
- Email: admin@saharaadventures.com
- Password: admin123

## Security

- Passwords are hashed using bcryptjs
- JWT tokens are used for authentication
- All admin routes are protected with authentication middleware

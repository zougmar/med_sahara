# Sahara Adventures

A full-stack web application for booking Sahara Desert adventures with an admin dashboard.

## Features

- User-friendly interface for browsing desert adventures
- Contact form for inquiries
- Admin authentication and dashboard
- View and manage contacts and inquiries
- Responsive design for all devices

## Tech Stack

### Frontend
- React
- React Router
- Tailwind CSS
- Font Awesome icons

### Backend
- Node.js
- Express
- MongoDB
- JWT for authentication

## Setup

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env` (already created)
   - Update the variables as needed

4. Start MongoDB:
   - Make sure MongoDB is installed and running on your system
   - Or update the MONGODB_URI in the .env file to point to your MongoDB instance

5. Seed the database:
   ```
   node seed.js
   ```
   This will create an admin user with:
   - Email: admin@saharaadventures.com
   - Password: admin123

6. Start the server:
   ```
   npm start
   ```
   Or for development:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

## Admin Dashboard

To access the admin dashboard:

1. Navigate to `/admin/login`
2. Log in with the admin credentials:
   - Email: admin@saharaadventures.com
   - Password: admin123

From the dashboard, you can:
- View all contact submissions
- See contact details including name, email, phone, and message
- Mark messages as read
- Delete contacts

## Project Structure

```
├── backend
│   ├── models          # Mongoose models
│   ├── routes          # API routes
│   ├── middleware      # Express middleware
│   ├── server.js       # Main server file
│   ├── seed.js         # Database seeder
│   └── .env            # Environment variables
└── frontend
    ├── public
    ├── src
    │   ├── components  # React components
    │   ├── pages       # Page components
    │   ├── contexts    # React contexts
    │   ├── services    # API services
    │   └── .env        # Environment variables
    └── package.json
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Commit your changes
5. Push to the branch
6. Create a pull request

## License

This project is licensed under the MIT License.

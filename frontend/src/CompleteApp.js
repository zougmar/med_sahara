import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NewNavbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ExperienceDetails from './pages/ExperienceDetailsPage';
import BookingPage from './pages/BookingPage';
import Confirmation from './pages/Confirmation';
import About from './pages/About';
import Contact from './pages/Contact';
import ListingsPage from './pages/ListingsPage';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/experience/:id" element={<ExperienceDetails />} />
              <Route path="/booking" element={<BookingPage />} />
              <Route path="/experiences" element={<ListingsPage />} />
              <Route path="/confirmation" element={<Confirmation />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import pages
import NewHome from './pages/NewHome';
import Adventures from './pages/Adventures';
import ExperienceDetails from './pages/ExperienceDetailsPage';
import ExperienceNotFound from './pages/NotFound';
import BookingConfirmation from './pages/BookingConfirmation';
import Confirmation from './pages/Confirmation';
import About from './pages/About';
import Contact from './pages/NewContact';
import PaymentPage from './pages/PaymentPage';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailed from './pages/PaymentFailed';
import ListingsPage from './pages/ListingsPage';

// Import components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import context
import { AuthProvider } from './context/AuthContext';

// Import styles
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />

          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<NewHome />} />
              <Route path="/adventures" element={<Adventures />} />
              <Route path="/experience/:id" element={<ExperienceDetails />} />
              <Route path="/experiences" element={<ListingsPage />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/payment-failed" element={<PaymentFailed />} />
              <Route path="/booking-confirmation" element={<BookingConfirmation />} />
              <Route path="/confirmation" element={<Confirmation />} />
              <Route path="/experience-not-found" element={<ExperienceNotFound />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

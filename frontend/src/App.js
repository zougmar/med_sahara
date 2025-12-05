import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

import ExperienceDetails from './pages/ExperienceDetailsPage';
import Confirmation from './pages/Confirmation';
import About from './pages/About';
import Contact from './pages/Contact';
import BookingPage from './pages/BookingPage';
import PaymentPage from './pages/PaymentPage';

import ListingsPage from './pages/ListingsPage';

import { AuthProvider } from './context/AuthContext';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <div className="min-h-screen flex flex-col">
       
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/experience/:id" element={<ExperienceDetails />} />
            <Route path="/experiences" element={<ListingsPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewHome from './pages/NewHome';
import NewNavbar from './components/NewNavbar';
import NewFooter from './components/NewFooter';
import ExperienceDetails from './pages/ExperienceDetailsPage';
import Confirmation from './pages/Confirmation';
import About from './pages/About';
import Contact from './pages/Contact';
import ListingsPage from './pages/ListingsPage';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-light-sand">
          <NewNavbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<NewHome />} />
              <Route path="/experience/:id" element={<ExperienceDetails />} />
              <Route path="/experiences" element={<ListingsPage />} />
              <Route path="/confirmation" element={<Confirmation />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <NewFooter />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
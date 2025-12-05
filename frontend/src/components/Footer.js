import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  ClockIcon 
} from '@heroicons/react/24/outline';

const Footer = () => {
  return (
    <footer className="bg-sand-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">Sahara Adventures</h3>
            <p className="text-sand-300 mb-4">
              Experience the magic of the Sahara Desert with our authentic adventure tours. 
              From camel treks to luxury desert camps, we create unforgettable memories.
            </p>
            <div className="flex space-x-4">
              {/* Social media icons would go here */}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sand-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/experiences" className="text-sand-300 hover:text-white transition-colors">
                  Experiences
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sand-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sand-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <MapPinIcon className="h-5 w-5 mr-2 text-sand-300 flex-shrink-0 mt-0.5" />
                <span className="text-sand-300">Merzouga, Sahara Desert, Morocco</span>
              </li>
              <li className="flex items-center">
                <PhoneIcon className="h-5 w-5 mr-2 text-sand-300 flex-shrink-0" />
                <span className="text-sand-300">+212 661-123456</span>
              </li>
              <li className="flex items-center">
                <EnvelopeIcon className="h-5 w-5 mr-2 text-sand-300 flex-shrink-0" />
                <span className="text-sand-300">info@saharaadventures.com</span>
              </li>
              <li className="flex items-center">
                <ClockIcon className="h-5 w-5 mr-2 text-sand-300 flex-shrink-0" />
                <span className="text-sand-300">Mon-Sun: 8AM-8PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-sand-800 mt-8 pt-8 text-center text-sand-400">
          <p>&copy; {new Date().getFullYear()} Sahara Adventures. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

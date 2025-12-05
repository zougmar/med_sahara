import React from 'react';
import ContactForm from '../components/ContactForm';
import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon, 
  ClockIcon
} from '@heroicons/react/24/outline';

const Contact = () => {
  return (
    <div className="min-h-screen bg-sand-50">
      <div className="bg-hero-pattern bg-sand-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl">Get in touch with our team for any questions or booking inquiries</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-bold text-sand-900 mb-6">Get in Touch</h2>
            <p className="text-sand-700 mb-8">
              Have questions about our Sahara adventures? Want to customize a tour? 
              Our team is here to help make your desert dreams come true.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <MapPinIcon className="h-6 w-6 text-primary-600 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-sand-900">Our Location</h3>
                  <p className="text-sand-700">Merzouga, Sahara Desert, Morocco</p>
                </div>
              </div>

              <div className="flex items-start">
                <PhoneIcon className="h-6 w-6 text-primary-600 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-sand-900">Phone</h3>
                  <p className="text-sand-700">+212 661-123456</p>
                </div>
              </div>

              <div className="flex items-start">
                <EnvelopeIcon className="h-6 w-6 text-primary-600 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-sand-900">Email</h3>
                  <p className="text-sand-700">info@saharaadventures.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <ClockIcon className="h-6 w-6 text-primary-600 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-sand-900">Office Hours</h3>
                  <p className="text-sand-700">Monday - Sunday: 8:00 AM - 8:00 PM</p>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-sand-200 rounded-lg h-64 flex items-center justify-center">
              <p className="text-sand-600">Interactive Map</p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <ContactForm />
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-sand-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-sand-900 mb-2">What should I pack for a desert trip?</h3>
              <p className="text-sand-700">
                We recommend packing lightweight, breathable clothing, a hat, sunglasses, sunscreen, 
                a warm jacket for cool evenings, and comfortable walking shoes.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-sand-900 mb-2">Is it safe to travel in the Sahara?</h3>
              <p className="text-sand-700">
                Yes, our tours are led by experienced local guides who know the desert well. 
                We prioritize safety and have an excellent safety record.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-sand-900 mb-2">Can I customize my trip?</h3>
              <p className="text-sand-700">
                Absolutely! We offer customizable tours to fit your interests, schedule, and budget. 
                Contact us to discuss your preferences.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-sand-900 mb-2">What's included in the tour price?</h3>
              <p className="text-sand-700">
                Each tour includes different amenities, but most include transportation, guide, 
                meals, accommodation, and activities as specified in the tour description.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

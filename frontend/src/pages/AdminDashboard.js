import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { bookingsAPI, contactsAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import {
  ChartBarIcon,
  CalendarIcon,
  EnvelopeIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  ArrowTrendingUpIcon,
  HomeIcon,
  UserIcon,
  Cog6ToothIcon,
  BellIcon
} from '@heroicons/react/24/outline';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PieController,
  DoughnutController
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PieController,
  DoughnutController
);

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [bookings, setBookings] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch bookings
        const bookingsResponse = await bookingsAPI.getAll();
        setBookings(bookingsResponse.data.bookings || []);
        setStats(bookingsResponse.data.stats || {});

        // Fetch contacts
        const contactsResponse = await contactsAPI.getAll();
        setContacts(contactsResponse.data.data || []);
      } catch (err) {
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const updateBookingStatus = async (id, status) => {
    try {
      await bookingsAPI.updateStatus(id, status);
      // Refresh bookings
      const response = await bookingsAPI.getAll();
      setBookings(response.data.bookings);
      setStats(response.data.stats);
    } catch (err) {
      setError('Failed to update booking status');
    }
  };

  const deleteContact = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact message?')) {
      try {
        await contactsAPI.delete(id);
        // Refresh contacts
        const response = await contactsAPI.getAll();
        setContacts(response.data);
      } catch (err) {
        setError('Failed to delete contact message');
      }
    }
  };

  // Export bookings data
  const exportBookings = () => {
    // Create CSV content
    const csvContent = [
      ['Name', 'Email', 'Experience', 'Date', 'Guests', 'Total', 'Status'],
      ...bookings.map(booking => [
        booking.name,
        booking.email,
        booking.experienceTitle || booking.tourPackage,
        formatDate(booking.date || booking.startDate),
        booking.numberOfPeople || booking.guests,
        booking.totalAmount || booking.totalPrice,
        booking.status
      ])
    ].map(row => row.join(',')).join('\n');

    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `bookings_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Export contacts data
  const exportContacts = () => {
    // Create CSV content
    const csvContent = [
      ['Name', 'Email', 'Phone', 'Date', 'Message'],
      ...contacts.map(contact => [
        contact.name,
        contact.email,
        contact.phone || '',
        formatDate(contact.date),
        contact.message.replace(/"/g, '""') // Escape quotes in message
      ])
    ].map(row => `"${row.join('","')}"`).join('\n');

    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `contacts_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // View contact details
  const viewContact = (contact) => {
    alert(`Contact Details:\n\nName: ${contact.name}\nEmail: ${contact.email}\nPhone: ${contact.phone || 'Not provided'}\n\nMessage:\n${contact.message}`);
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      completed: 'bg-blue-100 text-blue-800'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status] || ''}`}>
        {status}
      </span>
    );
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Chart data for bookings by status
  const bookingStatusData = {
    labels: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
    datasets: [
      {
        data: [
          stats.pendingBookings || 0,
          stats.confirmedBookings || 0,
          stats.completedBookings || 0,
          stats.cancelledBookings || 0
        ],
        backgroundColor: [
          'rgba(251, 191, 36, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(239, 68, 68, 0.8)'
        ],
        borderColor: [
          'rgba(251, 191, 36, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(239, 68, 68, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-center h-16 bg-gray-800">
          <h1 className="text-xl font-bold text-white">Sahara Admin</h1>
        </div>

        <nav className="mt-8">
          <div className="px-4 space-y-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                activeTab === 'overview' 
                  ? 'bg-gray-800 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <HomeIcon className="mr-3 h-5 w-5" />
              Dashboard
            </button>

            <button
              onClick={() => setActiveTab('bookings')}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                activeTab === 'bookings' 
                  ? 'bg-gray-800 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <CalendarIcon className="mr-3 h-5 w-5" />
              Bookings
            </button>

            <button
              onClick={() => setActiveTab('contacts')}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                activeTab === 'contacts' 
                  ? 'bg-gray-800 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <EnvelopeIcon className="mr-3 h-5 w-5" />
              Contact Messages
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-md ${
                activeTab === 'analytics' 
                  ? 'bg-gray-800 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <ChartBarIcon className="mr-3 h-5 w-5" />
              Analytics
            </button>
          </div>

          <div className="absolute bottom-0 w-full p-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-3 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              <Cog6ToothIcon className="mr-3 h-5 w-5" />
              Logout
            </button>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 lg:ml-0">
        {/* Top header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <div className="flex items-center space-x-4">
                <button className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                  <BellIcon className="h-6 w-6" />
                </button>

                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center">
                    <UserIcon className="h-5 w-5 text-white" />
                  </div>
                  <span className="hidden md:block text-sm font-medium text-gray-700">Admin User</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {error && (
                <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard Overview</h1>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                      <div className="p-5">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                            <CurrencyDollarIcon className="h-6 w-6 text-white" aria-hidden="true" />
                          </div>
                          <div className="ml-5 w-0 flex-1">
                            <dl>
                              <dt className="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
                              <dd className="text-lg font-medium text-gray-900">
                                ${stats.totalRevenue ? stats.totalRevenue.toFixed(2) : '0.00'}
                              </dd>
                            </dl>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-5 py-3">
                        <div className="text-sm">
                          <span className="text-green-600 font-medium">12%</span>
                          <span className="text-gray-500"> from last month</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                      <div className="p-5">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                            <CalendarIcon className="h-6 w-6 text-white" aria-hidden="true" />
                          </div>
                          <div className="ml-5 w-0 flex-1">
                            <dl>
                              <dt className="text-sm font-medium text-gray-500 truncate">Total Bookings</dt>
                              <dd className="text-lg font-medium text-gray-900">{stats.totalBookings || 0}</dd>
                            </dl>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-5 py-3">
                        <div className="text-sm">
                          <span className="text-green-600 font-medium">8%</span>
                          <span className="text-gray-500"> from last month</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                      <div className="p-5">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                            <CheckCircleIcon className="h-6 w-6 text-white" aria-hidden="true" />
                          </div>
                          <div className="ml-5 w-0 flex-1">
                            <dl>
                              <dt className="text-sm font-medium text-gray-500 truncate">Confirmed</dt>
                              <dd className="text-lg font-medium text-gray-900">{stats.confirmedBookings || 0}</dd>
                            </dl>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-5 py-3">
                        <div className="text-sm">
                          <span className="text-green-600 font-medium">10%</span>
                          <span className="text-gray-500"> from last month</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                      <div className="p-5">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                            <ClockIcon className="h-6 w-6 text-white" aria-hidden="true" />
                          </div>
                          <div className="ml-5 w-0 flex-1">
                            <dl>
                              <dt className="text-sm font-medium text-gray-500 truncate">Pending</dt>
                              <dd className="text-lg font-medium text-gray-900">{stats.pendingBookings || 0}</dd>
                            </dl>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-5 py-3">
                        <div className="text-sm">
                          <span className="text-red-600 font-medium">5%</span>
                          <span className="text-gray-500"> from last month</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Booking Status</h3>
                      <div className="h-64">
                        <Doughnut data={bookingStatusData} options={chartOptions} />
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Activity</h3>
                      <div className="flow-root">
                        <ul className="-mb-8">
                          {bookings.slice(0, 5).map((booking, index) => (
                            <li key={booking._id}>
                              <div className="relative pb-8">
                                {index < bookings.slice(0, 5).length - 1 ? (
                                  <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                                ) : null}
                                <div className="relative flex space-x-3">
                                  <div>
                                    <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                                      booking.status === 'confirmed' ? 'bg-green-500' :
                                      booking.status === 'pending' ? 'bg-yellow-500' :
                                      booking.status === 'completed' ? 'bg-blue-500' : 'bg-red-500'
                                    }`}>
                                      {booking.status === 'confirmed' ? <CheckCircleIcon className="h-5 w-5 text-white" /> :
                                       booking.status === 'pending' ? <ClockIcon className="h-5 w-5 text-white" /> :
                                       booking.status === 'completed' ? <CheckCircleIcon className="h-5 w-5 text-white" /> :
                                       <XCircleIcon className="h-5 w-5 text-white" />}
                                    </span>
                                  </div>
                                  <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                                    <div>
                                      <p className="text-sm text-gray-500">
                                        New booking from <span className="font-medium text-gray-900">{booking.name}</span> for <span className="font-medium">{booking.experienceTitle || booking.tourPackage}</span>
                                      </p>
                                    </div>
                                    <div className="text-right text-sm whitespace-nowrap text-gray-500">
                                      {formatDate(booking.createdAt)}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Bookings Tab */}
              {activeTab === 'bookings' && (
                <div>
                  <div className="mb-6 flex justify-between items-center">
                    <h1 className="text-2xl font-semibold text-gray-900">Bookings Management</h1>
                    <div className="flex space-x-3">
                      <button onClick={exportBookings} className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Export
                      </button>
                      <button onClick={() => navigate('/admin/bookings/new')} className="px-4 py-2 bg-indigo-600 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700">
                        Add Booking
                      </button>
                    </div>
                  </div>

                  <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                      {bookings.length === 0 ? (
                        <li className="px-6 py-4 text-center text-gray-500">
                          No bookings found
                        </li>
                      ) : (
                        bookings.map(booking => (
                          <li key={booking._id}>
                            <div className="px-4 py-4 sm:px-6">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0">
                                    <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                                      <UserIcon className="h-6 w-6 text-indigo-600" />
                                    </div>
                                  </div>
                                  <div className="ml-4">
                                    <div className="flex items-center">
                                      <p className="text-sm font-medium text-gray-900">{booking.name}</p>
                                      <span className="ml-2">{getStatusBadge(booking.status)}</span>
                                    </div>
                                    <p className="text-sm text-gray-500">{booking.email}</p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                  <div className="text-right">
                                    <p className="text-sm font-medium text-gray-900">{booking.experienceTitle || booking.tourPackage}</p>
                                    <p className="text-sm text-gray-500">{formatDate(booking.date || booking.startDate)}</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-sm font-medium text-gray-900">${booking.totalAmount || booking.totalPrice}</p>
                                    <p className="text-sm text-gray-500">{booking.numberOfPeople || booking.guests} guests</p>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    {booking.status === 'pending' && (
                                      <>
                                        <button
                                          onClick={() => updateBookingStatus(booking._id, 'confirmed')}
                                          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200"
                                        >
                                          Confirm
                                        </button>
                                        <button
                                          onClick={() => updateBookingStatus(booking._id, 'cancelled')}
                                          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200"
                                        >
                                          Cancel
                                        </button>
                                      </>
                                    )}
                                    {booking.status === 'confirmed' && (
                                      <button
                                        onClick={() => updateBookingStatus(booking._id, 'completed')}
                                        className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200"
                                      >
                                        Complete
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                </div>
              )}

              {/* Contacts Tab */}
              {activeTab === 'contacts' && (
                <div>
                  <div className="mb-6 flex justify-between items-center">
                    <h1 className="text-2xl font-semibold text-gray-900">Contact Messages</h1>
                    <div className="flex space-x-3">
                      <button onClick={exportContacts} className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Export
                      </button>
                    </div>
                  </div>

                  <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                      {contacts.length === 0 ? (
                        <li className="px-6 py-4 text-center text-gray-500">
                          No contact messages found
                        </li>
                      ) : (
                        contacts.map(contact => (
                          <li key={contact._id}>
                            <div className="px-4 py-4 sm:px-6">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0">
                                    <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
                                      <UserIcon className="h-6 w-6 text-indigo-600" />
                                    </div>
                                  </div>
                                  <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-900">{contact.name}</p>
                                    <p className="text-sm text-gray-500">{contact.email}</p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                  <div className="text-right">
                                    <p className="text-sm text-gray-900">{contact.phone || '-'}</p>
                                    <p className="text-sm text-gray-500">{formatDate(contact.date)}</p>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <button onClick={() => viewContact(contact)} className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50">
                                      View
                                    </button>
                                    <button
                                      onClick={() => deleteContact(contact._id)}
                                      className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="mt-2 sm:mt-0">
                                <p className="text-sm text-gray-500 line-clamp-2">{contact.message}</p>
                              </div>
                            </div>
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                </div>
              )}

              {/* Analytics Tab */}
              {activeTab === 'analytics' && (
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900 mb-6">Analytics Dashboard</h1>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                    <div className="bg-white overflow-hidden shadow rounded-lg">
                      <div className="p-5">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                            <ArrowTrendingUpIcon className="h-6 w-6 text-white" aria-hidden="true" />
                          </div>
                          <div className="ml-5 w-0 flex-1">
                            <dl>
                              <dt className="text-sm font-medium text-gray-500 truncate">Conversion Rate</dt>
                              <dd className="text-lg font-medium text-gray-900">24.57%</dd>
                            </dl>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-5 py-3">
                        <div className="text-sm">
                          <span className="text-green-600 font-medium">4%</span>
                          <span className="text-gray-500"> from last month</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                      <div className="p-5">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                            <UserGroupIcon className="h-6 w-6 text-white" aria-hidden="true" />
                          </div>
                          <div className="ml-5 w-0 flex-1">
                            <dl>
                              <dt className="text-sm font-medium text-gray-500 truncate">Total Guests</dt>
                              <dd className="text-lg font-medium text-gray-900">1,429</dd>
                            </dl>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-5 py-3">
                        <div className="text-sm">
                          <span className="text-green-600 font-medium">12%</span>
                          <span className="text-gray-500"> from last month</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                      <div className="p-5">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                            <CalendarIcon className="h-6 w-6 text-white" aria-hidden="true" />
                          </div>
                          <div className="ml-5 w-0 flex-1">
                            <dl>
                              <dt className="text-sm font-medium text-gray-500 truncate">Avg. Booking Value</dt>
                              <dd className="text-lg font-medium text-gray-900">$425</dd>
                            </dl>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-5 py-3">
                        <div className="text-sm">
                          <span className="text-red-600 font-medium">3%</span>
                          <span className="text-gray-500"> from last month</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow rounded-lg">
                      <div className="p-5">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                            <ChartBarIcon className="h-6 w-6 text-white" aria-hidden="true" />
                          </div>
                          <div className="ml-5 w-0 flex-1">
                            <dl>
                              <dt className="text-sm font-medium text-gray-500 truncate">Page Views</dt>
                              <dd className="text-lg font-medium text-gray-900">8,282</dd>
                            </dl>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-5 py-3">
                        <div className="text-sm">
                          <span className="text-green-600 font-medium">18%</span>
                          <span className="text-gray-500"> from last month</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white shadow rounded-lg p-6">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Revenue Overview</h3>
                      <div className="h-64">
                        <Bar 
                          data={{
                            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                            datasets: [
                              {
                                label: 'Revenue ($)',
                                data: [12000, 19000, 15000, 25000, 22000, 30000],
                                backgroundColor: 'rgba(99, 102, 241, 0.8)',
                                borderColor: 'rgba(99, 102, 241, 1)',
                                borderWidth: 1,
                              },
                            ],
                          }}
                          options={{
                            responsive: true,
                            plugins: {
                              legend: {
                                position: 'top',
                              },
                            },
                            scales: {
                              y: {
                                beginAtZero: true,
                              },
                            },
                          }}
                        />
                      </div>
                    </div>

                    <div className="bg-white shadow rounded-lg p-6">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Booking Status Distribution</h3>
                      <div className="h-64">
                        <Doughnut data={bookingStatusData} options={chartOptions} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
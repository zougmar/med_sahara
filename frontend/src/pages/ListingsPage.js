import React, { useState, useEffect } from 'react';
import { listingsAPI } from '../services/api';
import NewExperienceCard from '../components/NewExperienceCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { 
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon,
  FunnelIcon
} from '@heroicons/react/24/outline';

const ListingsPage = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    type: '',
    priceMin: '',
    priceMax: '',
    guests: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 20,
    total: 0
  });

  const experienceTypes = [
    'Luxury', 'Adventure', 'Cultural', 'Desert Tour', 'Family', 'Photography'
  ];

  useEffect(() => {
    fetchExperiences();
  }, [pagination.current, filters]);

  const fetchExperiences = async () => {
    setLoading(true);
    setError('');

    try {
      const params = {
        page: pagination.current,
        limit: pagination.pageSize,
        ...Object.fromEntries(
          Object.entries(filters).filter(([_, value]) => value !== '')
        )
      };

      const response = await listingsAPI.getAll(params);
      setExperiences(response.data.experiences || response.data);
      setPagination(prev => ({
        ...prev,
        total: response.data.pagination?.total || response.data.length
      }));
    } catch (err) {
      setError('Failed to load experiences');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
    setPagination(prev => ({
      ...prev,
      current: 1
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPagination(prev => ({
      ...prev,
      current: 1
    }));
    fetchExperiences();
  };

  const handlePageChange = (page) => {
    setPagination(prev => ({
      ...prev,
      current: page
    }));
  };

  const clearFilters = () => {
    setFilters({
      location: '',
      type: '',
      priceMin: '',
      priceMax: '',
      guests: ''
    });
    setPagination(prev => ({
      ...prev,
      current: 1
    }));
  };

  return (
    <div className="min-h-screen bg-sand-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-sand-900 mb-8">Sahara Desert Experiences</h1>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSearch} className="mb-4">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    name="location"
                    value={filters.location}
                    onChange={handleFilterChange}
                    placeholder="Search by location..."
                    className="w-full pl-10 pr-4 py-2 border border-sand-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                  <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-sand-400" />
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-center px-4 py-2 bg-sand-100 hover:bg-sand-200 text-sand-700 rounded-md transition-colors"
              >
                <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2" />
                Filters
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          {/* Filters Panel */}
          {showFilters && (
            <div className="border-t border-sand-200 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-sand-700 mb-1">
                    Experience Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={filters.type}
                    onChange={handleFilterChange}
                    className="w-full px-3 py-2 border border-sand-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">All Types</option>
                    {experienceTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="priceMin" className="block text-sm font-medium text-sand-700 mb-1">
                    Min Price ($)
                  </label>
                  <input
                    type="number"
                    id="priceMin"
                    name="priceMin"
                    value={filters.priceMin}
                    onChange={handleFilterChange}
                    min="0"
                    className="w-full px-3 py-2 border border-sand-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label htmlFor="priceMax" className="block text-sm font-medium text-sand-700 mb-1">
                    Max Price ($)
                  </label>
                  <input
                    type="number"
                    id="priceMax"
                    name="priceMax"
                    value={filters.priceMax}
                    min="0"
                    className="w-full px-3 py-2 border border-sand-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label htmlFor="guests" className="block text-sm font-medium text-sand-700 mb-1">
                    Number of Guests
                  </label>
                  <input
                    type="number"
                    id="guests"
                    name="guests"
                    value={filters.guests}
                    onChange={handleFilterChange}
                    min="1"
                    className="w-full px-3 py-2 border border-sand-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-sand-100 hover:bg-sand-200 text-sand-700 rounded-md transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-sand-700">
            {loading ? 'Loading experiences...' : `Showing ${experiences.length} experiences`}
          </p>
          <div className="flex items-center text-sand-600">
            <FunnelIcon className="h-5 w-5 mr-1" />
            <span>Sort by: Relevance</span>
          </div>
        </div>

        {/* Experiences Grid */}
        {loading ? (
          <LoadingSpinner size="lg" />
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        ) : experiences.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-sand-600 mb-4">No experiences found matching your criteria.</p>
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {experiences.map(experience => (
                <NewExperienceCard key={experience._id} experience={experience} />
              ))}
            </div>

            {/* Pagination */}
            {pagination.total > 1 && (
              <div className="flex justify-center">
                <nav className="flex items-center space-x-1">
                  <button
                    onClick={() => handlePageChange(pagination.current - 1)}
                    disabled={pagination.current === 1}
                    className="px-3 py-1 rounded-md bg-white border border-sand-300 text-sand-700 hover:bg-sand-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>

                  {[...Array(pagination.total)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handlePageChange(i + 1)}
                      className={`px-3 py-1 rounded-md ${
                        i + 1 === pagination.current
                          ? 'bg-primary-600 text-white'
                          : 'bg-white border border-sand-300 text-sand-700 hover:bg-sand-100'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => handlePageChange(pagination.current + 1)}
                    disabled={pagination.current === pagination.total}
                    className="px-3 py-1 rounded-md bg-white border border-sand-300 text-sand-700 hover:bg-sand-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ListingsPage;

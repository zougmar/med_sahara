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
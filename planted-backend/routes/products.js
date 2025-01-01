// routes/products.js
router.get('/nearby', async (req, res) => {

    // In routes/products.js
const convertZipToCoordinates = async (zipCode) => {
    // For testing, you can use hardcoded coordinates
    // Later we can integrate a real geocoding service like Google Maps or MapQuest
    const mockCoordinates = {
        '07030': [-74.0324, 40.7453], // Example coordinates for Hoboken
        // Add more test zip codes as needed
    };
    
    return mockCoordinates[zipCode] || [-74.0324, 40.7453]; // Default to Hoboken
};
    const { zipCode, radius } = req.query;
    
    // Convert zip to coordinates using a geocoding service
    const coordinates = await convertZipToCoordinates(zipCode);
    
    const products = await Product.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: coordinates
          },
          $maxDistance: radius * 1609.34 // Convert miles to meters
        }
      }
    }).populate('grower', 'name businessName');
    
    res.json(products);
  });
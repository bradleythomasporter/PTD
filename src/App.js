import React, { useState } from 'react';
import './App.css';


const Header = ({ onShowSignup, isLoggedIn, onLogout, isGrower }) => (
  <header className="header">
    <div className="header-content">
      <a href="/" className="logo">Planted 🌱</a>
      <nav className="nav">
        <a href="/shop" className="nav-link">Shop</a>
        <a href="/about" className="nav-link">About</a>
        {isLoggedIn ? (
          <>
            {isGrower && <a href="/grower-dashboard" className="nav-link">Grower Dashboard</a>}
            <a href="/profile" className="nav-link">Profile</a>
            <button onClick={onLogout} className="button">Logout</button>
          </>
        ) : (
          <>
            <button onClick={() => onShowSignup('login')} className="nav-link">Login</button>
            <button onClick={() => onShowSignup('register')} className="signup-button">Join as Grower</button>
          </>
        )}
      </nav>
    </div>
  </header>
);

const GrowerDashboard = () => {
  return (
      <div className="grower-dashboard">
          <h1>Grower Dashboard</h1>
          <p>Welcome to the Grower Dashboard. Manage your plants and track your sales here.</p>
          {/* Add more components and functionality as needed */}
      </div>
  );
};
const Hero = () => (
  <div className="hero">
    <h1 className="hero-title">Discover Local Plants</h1>
    <p>Buy local plants from local growers!</p>
  </div>
);

const PlantCard = ({ plant, onViewDetails }) => (
  <div className="plant-card">
    <img src={plant.image || "/api/placeholder/250/200"} alt={plant.name} className="plant-image" />
    <h3>{plant.name}</h3>
    <p>${plant.price}</p>
    <button onClick={() => onViewDetails(plant)} className="button">View Details</button>
  </div>
);

const FeaturedPlants = ({ onViewDetails }) => {
  const [plants, setPlants] = useState([]);
  const [zipCode, setZipCode] = useState('');
  const [radius, setRadius] = useState(20);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPlants = async (zip, rad) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `http://localhost:5001/api/products/nearby?zipCode=${zip}&radius=${rad}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch plants');
      }
      const data = await response.json();
      setPlants(data);
    } catch (error) {
      console.error('Error fetching plants:', error);
      setError('Error loading plants. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (zipCode.trim()) {
      fetchPlants(zipCode, radius);
    }
  };

  return (
    <section className="featured-section">
      <h2 className="section-title">Find Local Plants</h2>
      
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
          placeholder="Enter Zip Code"
          className="input"
        />
        <select 
          value={radius}
          onChange={(e) => setRadius(e.target.value)}
          className="input"
        >
          <option value="5">5 miles</option>
          <option value="10">10 miles</option>
          <option value="20">20 miles</option>
          <option value="50">50 miles</option>
        </select>
        <button type="submit" className="button">Search</button>
      </form>

      {error && <div className="error-message">{error}</div>}
      
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="plant-grid">
          {plants.length > 0 ? (
            plants.map(plant => (
              <PlantCard key={plant._id} plant={plant} onViewDetails={onViewDetails} />
            ))
          ) : (
            <p>No plants found in this area. Try a different location or expand your search radius.</p>
          )}
        </div>
      )}
    </section>
  );
};

const Footer = () => (
  <footer className="footer">
    <p>&copy; 2024 Planted. Connecting plant lovers with local growers.</p>
  </footer>
);

const ProductPage = ({ plant, onGoBack }) => {
  const [showGardenerModal, setShowGardenerModal] = useState(false);

  return (
    <div className="product-page">
      <img src={plant.image || "/api/placeholder/250/200"} alt={plant.name} className="product-image" />
      <h1 className="product-title">{plant.name}</h1>
      <p className="product-price">${plant.price}</p>
      <p className="product-description">{plant.description}</p>
      <div className="gardener-info">
        <h3>Need help planting?</h3>
        <p>Our Planted-approved gardeners can help you get your new plant settled in its new home.</p>
        <button onClick={() => setShowGardenerModal(true)} className="gardener-button">Plant for Me</button>
      </div>
      <button onClick={onGoBack} className="back-button">Back to Plants</button>
      <button className="button">Add to Cart</button>
    </div>
  );
};

const LoginForm = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        onSuccess();
        onClose();
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (error) {
      setError('An error occurred during login');
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Login to Planted</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
            placeholder="Email"
            required
            className="input"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
            placeholder="Password"
            required
            className="input"
          />
          <div>
            <button type="button" onClick={onClose} className="close-button">Cancel</button>
            <button type="submit" className="button">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const RegisterForm = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    businessName: '',
    zipCode: '',
    isGrower: true
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Form Data:', formData);

    try {
      const response = await fetch('http://localhost:5001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        onSuccess();
        onClose();
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('An error occurred during registration');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Join Planted as a Grower</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="input"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="input"
          />
          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            placeholder="Business Name"
            required
            className="input"
          />
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            placeholder="Zip Code"
            required
            className="input"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password (minimum 6 characters)"
            required
            className="input"
          />
          <div>
            <button type="button" onClick={onClose} className="close-button">Cancel</button>
            <button type="submit" className="button">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [authModal, setAuthModal] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleViewDetails = (plant) => {
    setSelectedPlant(plant);
    setCurrentPage('product');
  };

  const handleGoBack = () => {
    setCurrentPage('home');
    setSelectedPlant(null);
  };

  return (
    <div className="page">
      <Header 
        onShowSignup={setAuthModal}
        isLoggedIn={isLoggedIn}
        onLogout={() => {
          localStorage.removeItem('token');
          setIsLoggedIn(false);
        }}
      />
      {currentPage === 'home' ? (
        <>
          <Hero />
          <FeaturedPlants onViewDetails={handleViewDetails} />
        </>
      ) : (
        <ProductPage plant={selectedPlant} onGoBack={handleGoBack} />
      )}
      <Footer />

      {authModal === 'login' && (
        <LoginForm 
          onClose={() => setAuthModal(null)}
          onSuccess={() => setIsLoggedIn(true)}
        />
      )}
      {authModal === 'register' && (
        <RegisterForm 
          onClose={() => setAuthModal(null)}
          onSuccess={() => setIsLoggedIn(true)}
        />
      )}
    </div>
  );
}
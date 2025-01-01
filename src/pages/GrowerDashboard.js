const GrowerDashboard = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
      name: '',
      price: '',
      description: '',
      image: '',
      category: '',
      quantity: ''
    });
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5001/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(newProduct)
        });
        if (response.ok) {
          fetchProducts();
          setNewProduct({
            name: '',
            price: '',
            description: '',
            image: '',
            category: '',
            quantity: ''
          });
        }
      } catch (error) {
        console.error('Error adding product:', error);
      }
    };
  
    return (
      <div className="grower-dashboard">
        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
            required
          />
          {/* Add other input fields */}
        </form>
        
        <h2>Your Products</h2>
        {/* Display products list */}
      </div>
    );
  };
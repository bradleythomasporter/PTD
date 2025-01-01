
const GrowerDashboard = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
      name: '',
      price: '',
      description: '',
      image: '',
      quantity: ''
    });
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      fetchGrowerProducts();
    }, []);
  
    const fetchGrowerProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5001/api/products/grower', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
  
    const handleAddProduct = async (e) => {
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
          fetchGrowerProducts();
          setNewProduct({
            name: '',
            price: '',
            description: '',
            image: '',
            quantity: ''
          });
        }
      } catch (error) {
        console.error('Error adding product:', error);
      }
    };
  
    return (
      <div className="grower-dashboard">
        <h1>Grower Dashboard</h1>
        
        <section className="add-product">
          <h2>Add New Plant</h2>
          <form onSubmit={handleAddProduct}>
            <input
              type="text"
              placeholder="Plant Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
              required
              className="input"
            />
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
              required
              className="input"
            />
            <textarea
              placeholder="Description"
              value={newProduct.description}
              onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
              required
              className="input"
            />
            <input
              type="number"
              placeholder="Quantity Available"
              value={newProduct.quantity}
              onChange={(e) => setNewProduct({...newProduct, quantity: e.target.value})}
              required
              className="input"
            />
            <button type="submit" className="button">Add Plant</button>
          </form>
        </section>
  
        <section className="product-list">
          <h2>Your Plants</h2>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="products-grid">
              {products.map(product => (
                <div key={product._id} className="product-card">
                  <img src={product.image || "/api/placeholder/250/200"} alt={product.name} />
                  <h3>{product.name}</h3>
                  <p>${product.price}</p>
                  <p>Quantity: {product.quantity}</p>
                  <div className="card-actions">
                    <button className="button">Edit</button>
                    <button className="button delete">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    );
  };

  export default GrowerDashboard;
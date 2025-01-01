
// models/Product.js
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: String,
    image: String,
    category: String,
    quantity: Number,
    grower: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    location: {
      type: { type: String, default: 'Point' },
      coordinates: [Number] // [longitude, latitude]
    }
  });
  
  productSchema.index({ location: '2dsphere' });
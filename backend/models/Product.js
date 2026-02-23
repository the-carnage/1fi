const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
    variantName: { type: String, required: true },
    storage: { type: String, required: true },
    color: { type: String, required: true },
    colorHex: { type: String, required: true },
    mrp: { type: Number, required: true },
    price: { type: Number, required: true },
    images: [{ type: String }]
});

const emiPlanSchema = new mongoose.Schema({
    tenure: { type: Number, required: true },
    monthlyAmount: { type: Number, required: true },
    interestRate: { type: Number, required: true },
    cashback: { type: Boolean, default: false },
    cashbackAmount: { type: Number, default: 0 }
});

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    variants: [variantSchema],
    emiPlans: [emiPlanSchema]
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);

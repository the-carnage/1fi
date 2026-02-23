import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  CircularProgress,
  Chip,
  Divider,
} from '@mui/material';
import VariantSelector from '../components/VariantSelector';
import StorageSelector from '../components/StorageSelector';
import EmiPlanCard from '../components/EmiPlanCard';
import { getProductBySlug } from '../api';

const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductBySlug(slug);
        setProduct(data);
        setSelectedVariant(data.variants[0]);
        setSelectedPlan(data.emiPlans[0]);
      } catch (err) {
        setError('Product not found');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
    setCurrentImage(0);
  };

  const handleProceed = () => {
    alert(`Proceeding with ${selectedVariant.variantName} - ${selectedPlan.tenure} months EMI plan`);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography color="error" align="center">{error}</Typography>
      </Container>
    );
  }

  const discount = Math.round(((selectedVariant.mrp - selectedVariant.price) / selectedVariant.mrp) * 100);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Left Side - Product Images */}
        <Grid item xs={12} md={6}>
          <Box sx={{ position: { md: 'sticky' }, top: 80 }}>
            <Box
              sx={{
                bgcolor: '#f5f5f5',
                borderRadius: 2,
                p: { xs: 2, md: 4 },
                mb: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: { xs: 300, md: 400 },
              }}
            >
              <img
                src={selectedVariant.images[currentImage]}
                alt={product.name}
                style={{ maxWidth: '100%', maxHeight: '500px', objectFit: 'contain' }}
              />
            </Box>
            
            {selectedVariant.images.length > 1 && (
              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
                {selectedVariant.images.map((img, idx) => (
                  <Box
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    sx={{
                      width: { xs: 60, md: 80 },
                      height: { xs: 60, md: 80 },
                      border: currentImage === idx ? '2px solid #1976d2' : '1px solid #e0e0e0',
                      borderRadius: 1,
                      p: 1,
                      cursor: 'pointer',
                      bgcolor: '#f5f5f5',
                      '&:hover': { borderColor: '#1976d2' },
                    }}
                  >
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Grid>

        {/* Right Side - Product Details */}
        <Grid item xs={12} md={6}>
          <Typography variant="caption" sx={{ color: '#666', textTransform: 'uppercase', fontWeight: 600 }}>
            {product.brand}
          </Typography>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
            {product.name}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            {product.description}
          </Typography>

          <VariantSelector
            variants={product.variants}
            selectedVariant={selectedVariant}
            onSelect={handleVariantChange}
          />

          <StorageSelector
            variants={product.variants}
            selectedVariant={selectedVariant}
            onSelect={handleVariantChange}
          />

          <Divider sx={{ my: 3 }} />

          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#1976d2' }}>
                ₹{selectedVariant.price.toLocaleString('en-IN')}
              </Typography>
              {discount > 0 && (
                <Chip label={`${discount}% OFF`} color="success" sx={{ fontWeight: 600 }} />
              )}
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
              MRP: ₹{selectedVariant.mrp.toLocaleString('en-IN')}
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            Choose EMI Plan
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
            {product.emiPlans.map((plan, idx) => (
              <EmiPlanCard
                key={idx}
                plan={plan}
                selected={selectedPlan === plan}
                onSelect={() => setSelectedPlan(plan)}
              />
            ))}
          </Box>

          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={handleProceed}
            sx={{
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 600,
              textTransform: 'none',
            }}
          >
            Proceed with {selectedPlan.tenure} Month EMI
          </Button>

          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2, textAlign: 'center' }}>
            EMI plans backed by mutual funds. No hidden charges.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetail;

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
  Stack,
  alpha,
  Paper,
} from '@mui/material';
import VariantSelector from '../components/VariantSelector';
import StorageSelector from '../components/StorageSelector';
import EmiPlanCard from '../components/EmiPlanCard';
import Breadcrumbs from '../components/Breadcrumbs';
import { getProductBySlug } from '../api';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import CachedIcon from '@mui/icons-material/Cached';

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
        <CircularProgress size={48} thickness={4} />
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
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="xl">
        <Breadcrumbs items={[{ label: product.name }]} />

        <Grid container spacing={4}>
          {/* Left Side - Product Images */}
          <Grid item xs={12} md={6}>
            <Box sx={{ position: { md: 'sticky' }, top: 100 }}>
              <Paper
                elevation={0}
                sx={{
                  bgcolor: alpha('#6366f1', 0.03),
                  borderRadius: 4,
                  p: { xs: 3, md: 5 },
                  mb: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: { xs: 350, md: 500 },
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={selectedVariant.images[currentImage]}
                  alt={product.name}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '500px',
                    objectFit: 'contain',
                    transition: 'transform 0.3s ease',
                  }}
                />
              </Paper>

              {selectedVariant.images.length > 1 && (
                <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
                  {selectedVariant.images.map((img, idx) => (
                    <Paper
                      key={idx}
                      onClick={() => setCurrentImage(idx)}
                      elevation={0}
                      sx={{
                        width: { xs: 70, md: 90 },
                        height: { xs: 70, md: 90 },
                        border: '2px solid',
                        borderColor: currentImage === idx ? 'primary.main' : 'divider',
                        borderRadius: 2,
                        p: 1,
                        cursor: 'pointer',
                        bgcolor: alpha('#6366f1', 0.03),
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          borderColor: 'primary.main',
                          transform: 'scale(1.05)',
                        },
                      }}
                    >
                      <img
                        src={img}
                        alt=""
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                      />
                    </Paper>
                  ))}
                </Stack>
              )}
            </Box>
          </Grid>

          {/* Right Side - Product Details */}
          <Grid item xs={12} md={6}>
            <Box>
              <Chip
                label={product.brand}
                sx={{
                  mb: 2,
                  bgcolor: alpha('#6366f1', 0.1),
                  color: 'primary.main',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                }}
              />

              <Typography
                variant="h3"
                component="h1"
                sx={{
                  fontWeight: 800,
                  mb: 2,
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  lineHeight: 1.2,
                }}
              >
                {product.name}
              </Typography>

              <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.7 }}>
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

              <Divider sx={{ my: 4 }} />

              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  mb: 4,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <Stack direction="row" spacing={2} alignItems="baseline" sx={{ mb: 1 }}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontWeight: 800,
                      color: 'white',
                      fontSize: { xs: '2rem', md: '2.5rem' },
                    }}
                  >
                    ₹{selectedVariant.price.toLocaleString('en-IN')}
                  </Typography>
                  {discount > 0 && (
                    <Chip
                      label={`${discount}% OFF`}
                      sx={{
                        bgcolor: 'rgba(255, 255, 255, 0.2)',
                        color: 'white',
                        fontWeight: 700,
                        backdropFilter: 'blur(10px)',
                      }}
                    />
                  )}
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography
                    variant="body1"
                    sx={{
                      textDecoration: 'line-through',
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontWeight: 500,
                    }}
                  >
                    MRP: ₹{selectedVariant.mrp.toLocaleString('en-IN')}
                  </Typography>
                  {discount > 0 && (
                    <Typography variant="body1" sx={{ color: '#fbbf24', fontWeight: 700 }}>
                      You save ₹{(selectedVariant.mrp - selectedVariant.price).toLocaleString('en-IN')}
                    </Typography>
                  )}
                </Stack>
              </Paper>

              <Stack direction="row" spacing={2} sx={{ mb: 4, flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocalShippingIcon sx={{ color: 'primary.main' }} />
                  <Typography variant="body2" fontWeight={600}>
                    Free Delivery
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <VerifiedUserIcon sx={{ color: 'primary.main' }} />
                  <Typography variant="body2" fontWeight={600}>
                    1 Year Warranty
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CachedIcon sx={{ color: 'primary.main' }} />
                  <Typography variant="body2" fontWeight={600}>
                    7 Days Return
                  </Typography>
                </Box>
              </Stack>

              <Divider sx={{ my: 4 }} />

              <Typography
                variant="h5"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                Choose Your EMI Plan
                <Chip
                  label="Backed by Mutual Funds"
                  size="small"
                  sx={{
                    bgcolor: alpha('#10b981', 0.1),
                    color: 'success.main',
                    fontWeight: 600,
                  }}
                />
              </Typography>

              <Stack spacing={3} sx={{ mb: 4 }}>
                {product.emiPlans.map((plan, idx) => (
                  <EmiPlanCard
                    key={idx}
                    plan={plan}
                    selected={selectedPlan === plan}
                    onSelect={() => setSelectedPlan(plan)}
                  />
                ))}
              </Stack>

              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={handleProceed}
                startIcon={<CheckCircleIcon />}
                sx={{
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  boxShadow: '0 8px 24px rgba(99, 102, 241, 0.4)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                    boxShadow: '0 12px 32px rgba(99, 102, 241, 0.5)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Proceed with {selectedPlan.tenure} Month EMI
              </Button>

              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  display: 'block',
                  mt: 2,
                  textAlign: 'center',
                  fontSize: '0.85rem',
                }}
              >
                🔒 100% Secure Payment • No Hidden Charges • Easy Returns
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProductDetail;

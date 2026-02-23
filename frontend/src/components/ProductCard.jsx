import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Box, Chip } from '@mui/material';

const ProductCard = ({ product }) => {
  const firstVariant = product.variants[0];
  const discount = Math.round(((firstVariant.mrp - firstVariant.price) / firstVariant.mrp) * 100);

  return (
    <Link to={`/products/${product.slug}`} style={{ textDecoration: 'none' }}>
      <Card 
        sx={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 6,
          }
        }}
      >
        <CardMedia
          component="img"
          height="280"
          image={firstVariant.images[0]}
          alt={product.name}
          sx={{ objectFit: 'contain', p: 2, bgcolor: '#f5f5f5' }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', fontWeight: 600 }}>
            {product.brand}
          </Typography>
          <Typography variant="h6" component="h2" sx={{ mb: 1, fontWeight: 600 }}>
            {product.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#1976d2' }}>
              ₹{firstVariant.price.toLocaleString('en-IN')}
            </Typography>
            {discount > 0 && (
              <Chip 
                label={`${discount}% OFF`} 
                size="small" 
                color="success" 
                sx={{ fontWeight: 600 }}
              />
            )}
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
            MRP: ₹{firstVariant.mrp.toLocaleString('en-IN')}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, color: '#666' }}>
            {product.variants.length} variant{product.variants.length > 1 ? 's' : ''} available
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;

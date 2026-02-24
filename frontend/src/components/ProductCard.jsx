import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, Typography, Box, Chip, Stack, alpha } from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

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
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          border: '1px solid',
          borderColor: 'divider',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)',
            borderColor: 'primary.main',
            '& .product-image': {
              transform: 'scale(1.05)',
            },
            '& .view-details': {
              opacity: 1,
              transform: 'translateX(0)',
            },
          },
        }}
      >
        {discount > 0 && (
          <Chip
            icon={<LocalOfferIcon sx={{ fontSize: 16 }} />}
            label={`${discount}% OFF`}
            size="small"
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              zIndex: 1,
              bgcolor: 'success.main',
              color: 'white',
              fontWeight: 700,
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.4)',
            }}
          />
        )}

        <Box
          sx={{
            position: 'relative',
            bgcolor: alpha('#6366f1', 0.03),
            overflow: 'hidden',
          }}
        >
          <CardMedia
            component="img"
            height="320"
            image={firstVariant.images[0]}
            alt={product.name}
            className="product-image"
            sx={{
              objectFit: 'contain',
              p: 3,
              transition: 'transform 0.4s ease',
            }}
          />
        </Box>

        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          <Chip
            label={product.brand}
            size="small"
            sx={{
              mb: 1.5,
              bgcolor: alpha('#6366f1', 0.1),
              color: 'primary.main',
              fontWeight: 600,
              fontSize: '0.75rem',
            }}
          />

          <Typography
            variant="h6"
            component="h2"
            sx={{
              mb: 2,
              fontWeight: 700,
              fontSize: '1.1rem',
              lineHeight: 1.4,
              color: 'text.primary',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {product.name}
          </Typography>

          <Stack direction="row" spacing={1} alignItems="baseline" sx={{ mb: 1.5 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              ₹{firstVariant.price.toLocaleString('en-IN')}
            </Typography>
            {discount > 0 && (
              <Typography
                variant="body2"
                sx={{
                  textDecoration: 'line-through',
                  color: 'text.secondary',
                  fontWeight: 500,
                }}
              >
                ₹{firstVariant.mrp.toLocaleString('en-IN')}
              </Typography>
            )}
          </Stack>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              color: 'text.secondary',
              fontSize: '0.875rem',
            }}
          >
            <Typography variant="body2" color="text.secondary">
              {product.variants.length} variant{product.variants.length > 1 ? 's' : ''} available
            </Typography>
          </Box>

          <Box
            className="view-details"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.5,
              mt: 2,
              color: 'primary.main',
              fontWeight: 600,
              fontSize: '0.9rem',
              opacity: 0,
              transform: 'translateX(-10px)',
              transition: 'all 0.3s ease',
            }}
          >
            View Details
            <ArrowForwardIcon sx={{ fontSize: 18 }} />
          </Box>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;

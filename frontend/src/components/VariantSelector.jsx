import { Box, Typography, Tooltip } from '@mui/material';

const VariantSelector = ({ variants, selectedVariant, onSelect }) => {
  const uniqueColors = [...new Map(variants.map(v => [v.color, v])).values()];

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
        Color: {selectedVariant.color}
      </Typography>
      <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
        {uniqueColors.map((variant) => (
          <Tooltip title={variant.color} key={variant.color}>
            <Box
              onClick={() => onSelect(variant)}
              sx={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                bgcolor: variant.colorHex,
                border: selectedVariant.color === variant.color ? '3px solid #1976d2' : '2px solid #e0e0e0',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: selectedVariant.color === variant.color ? 3 : 1,
                '&:hover': {
                  transform: 'scale(1.1)',
                  boxShadow: 3,
                },
              }}
            />
          </Tooltip>
        ))}
      </Box>
    </Box>
  );
};

export default VariantSelector;
